import urllib.request
import ssl
import re
import os
import json
from bs4 import BeautifulSoup
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
        return resp.read().decode('utf-8', errors='ignore')

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
        return True
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            data = resp.read()
            with open(target_path, 'wb') as f:
                f.write(data)
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

CHANNEL = "terapia_s_trepetom"
BASE_URL = f"https://t.me/s/{CHANNEL}"

photos_dir = "d:/Projects/judil-psy/data/photos"
os.makedirs(photos_dir, exist_ok=True)

all_posts = {}
current_url = BASE_URL
pages = 0
max_pages = 10

while current_url and pages < max_pages:
    pages += 1
    print(f"Fetching page {pages}: {current_url}")
    try:
        html = fetch_url(current_url)
    except Exception as e:
        print(f"Failed to fetch {current_url}: {e}")
        break

    soup = BeautifulSoup(html, 'html.parser')
    messages = soup.find_all('div', class_='tgme_widget_message')
    if not messages:
        print("No messages found on page.")
        break

    print(f"Found {len(messages)} messages on page {pages}")
    min_post_id = None

    for msg in messages:
        data_post = msg.get('data-post')
        if not data_post:
            continue
        try:
            post_id = int(data_post.split('/')[-1])
        except ValueError:
            continue

        if min_post_id is None or post_id < min_post_id:
            min_post_id = post_id

        # Text
        text_el = msg.find('div', class_='tgme_widget_message_text')
        text = text_el.get_text(separator="\n", strip=True) if text_el else ""

        # Date
        time_el = msg.find('time')
        date_str = time_el.get('datetime', '') if time_el else ""

        # Photos
        photo_urls = []
        # Background images on a.tgme_widget_message_photo_wrap
        for photo_el in msg.find_all('a', class_='tgme_widget_message_photo_wrap'):
            style = photo_el.get('style', '')
            m = re.search(r"background-image:url\('([^']+)'\)", style)
            if m:
                photo_urls.append(m.group(1))

        # Check for video thumbs or other photos
        for thumb in msg.find_all('i', class_='tgme_widget_message_video_thumb'):
            style = thumb.get('style', '')
            m = re.search(r"background-image:url\('([^']+)'\)", style)
            if m:
                photo_urls.append(m.group(1))

        # Channel avatar if available
        user_photo = msg.find('div', class_='tgme_widget_message_user_photo')
        if user_photo:
            img = user_photo.find('img')
            if img and img.get('src'):
                photo_urls.append(img.get('src'))

        saved_photos = []
        for p_idx, p_url in enumerate(photo_urls):
            ext = ".jpg"
            if ".png" in p_url: ext = ".png"
            elif ".webp" in p_url: ext = ".webp"
            fname = f"post_{post_id}_{p_idx+1}{ext}"
            fpath = os.path.join(photos_dir, fname)
            if download_file(p_url, fpath):
                saved_photos.append({
                    "filename": fname,
                    "original_url": p_url,
                    "local_path": fpath
                })

        all_posts[post_id] = {
            "post_id": post_id,
            "url": f"https://t.me/{CHANNEL}/{post_id}",
            "date": date_str,
            "text": text,
            "photos": saved_photos
        }

    # Find "load older" link: ?before=...
    older_link = soup.find('a', class_='tme_messages_more')
    if older_link and older_link.get('href'):
        href = older_link.get('href')
        if href.startswith('/'):
            current_url = "https://t.me" + href
        elif href.startswith('http'):
            current_url = href
        else:
            current_url = f"https://t.me/s/{CHANNEL}" + href
    elif min_post_id and min_post_id > 1:
        current_url = f"https://t.me/s/{CHANNEL}?before={min_post_id}"
    else:
        print("No older messages link found.")
        break

    time.sleep(1)

# Also fetch channel profile info and avatar from main page
try:
    chan_html = fetch_url(f"https://t.me/{CHANNEL}")
    c_soup = BeautifulSoup(chan_html, 'html.parser')
    title_el = c_soup.find('div', class_='tgme_page_title')
    title = title_el.get_text(strip=True) if title_el else ""
    desc_el = c_soup.find('div', class_='tgme_page_description')
    desc = desc_el.get_text(separator="\n", strip=True) if desc_el else ""
    extra_el = c_soup.find('div', class_='tgme_page_extra')
    extra = extra_el.get_text(strip=True) if extra_el else ""
    
    avatar_el = c_soup.find('img', class_='tgme_page_photo_image')
    avatar_url = avatar_el.get('src') if avatar_el else None
    avatar_file = None
    if avatar_url:
        avatar_path = os.path.join(photos_dir, "channel_avatar.jpg")
        if download_file(avatar_url, avatar_path):
            avatar_file = "channel_avatar.jpg"
            print("Downloaded channel avatar:", avatar_path)
            
    channel_info = {
        "title": title,
        "description": desc,
        "subscribers": extra,
        "avatar": avatar_file,
        "avatar_url": avatar_url
    }
except Exception as e:
    channel_info = {"error": str(e)}

# Save complete archive
sorted_posts = [all_posts[k] for k in sorted(all_posts.keys())]
result = {
    "channel_info": channel_info,
    "total_posts": len(sorted_posts),
    "posts": sorted_posts
}

out_path = "d:/Projects/judil-psy/data/telegram_archive.json"
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"Archive saved to {out_path} with {len(sorted_posts)} posts.")
