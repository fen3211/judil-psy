import json

# Verified Quotes Catalog
quotes_data = [
  {
    "id": "quote-pause",
    "exact_text": "Задача в том, чтобы вернуть себе право быть живым человеком: разрешать себе паузы задолго до того, как организм отключится от бессилия, и разделять свою человеческую ценность и количество вычеркнутых дел в блокноте.",
    "author_note": "О чувстве вины за отдых и выгорании",
    "post_id": 354,
    "post_url": "https://t.me/terapia_s_trepetom/354",
    "date": "2026-10-12",
    "theme": "Отдых и самоценность",
    "target_section": "quotes_animation"
  },
  {
    "id": "quote-energy",
    "exact_text": "В тот момент, когда ты откажешься от мысли, что с тобой что-то не так, высвободится огромное количество энергии. Той самой, которую ты тратила на борьбу с собой.",
    "author_note": "О страхе быть неидеальной и синдроме хорошей девочки",
    "post_id": 261,
    "post_url": "https://t.me/terapia_s_trepetom/261",
    "date": "2026-05-26",
    "theme": "Принятие неидеальности",
    "target_section": "hero"
  },
  {
    "id": "quote-boundaries",
    "exact_text": "Чужая обида на твои личные границы — это не твоя ответственность. Сепарация почти всегда сопровождается виной, но выбирать между чужим комфортом и собственной жизнью — это не эгоизм, а психологическое взросление.",
    "author_note": "Напоминание о границах и удобности",
    "post_id": 322,
    "post_url": "https://t.me/terapia_s_trepetom/322",
    "date": "2026-08-26",
    "theme": "Личные границы",
    "target_section": "quotes_animation"
  },
  {
    "id": "quote-support",
    "exact_text": "Страх перемен — это часто не страх «нового», а страх неопределенности. Терапия помогает не стать «бесстрашным», а обрести уверенность, что при любом раскладе — вы у себя есть.",
    "author_note": "Из разбора клиентского кейса",
    "post_id": 214,
    "post_url": "https://t.me/terapia_s_trepetom/214",
    "date": "2026-02-03",
    "theme": "Внутренняя опора",
    "target_section": "about"
  },
  {
    "id": "quote-respect",
    "exact_text": "Когда наше «да» становится автоматическим, а готовность жертвовать собой — безграничной, окружающие перестают считывать нас как отдельную личность. Уважение рождается там, где есть границы и ясное понимание того, как с вами нельзя.",
    "author_note": "О психологии отношений",
    "post_id": 222,
    "post_url": "https://t.me/terapia_s_trepetom/222",
    "date": "2026-02-18",
    "theme": "Отношения и границы",
    "target_section": "quotes_animation"
  },
  {
    "id": "quote-allowed",
    "exact_text": "Вместо привычного «не высовывайся» внутри постепенно рождается: «мне можно». Можно говорить вслух. Можно быть творческим. Можно быть эмоциональным. Можно быть собой без постоянного стыда и самоцензуры.",
    "author_note": "О поддержке внутреннего ребёнка",
    "post_id": 254,
    "post_url": "https://t.me/terapia_s_trepetom/254",
    "date": "2026-05-04",
    "theme": "Право на самовыражение",
    "target_section": "interactive_notes"
  },
  {
    "id": "quote-new-self",
    "exact_text": "Пытаться «вернуть прежнюю себя» — ловушка: именно те привычки привели к истощению. Задача в другом: не поворачивать время вспять, а бережно забрать себя настоящую из этой точки усталости и выстроить новые опоры.",
    "author_note": "О выходе из эмоционального кризиса",
    "post_id": 342,
    "post_url": "https://t.me/terapia_s_trepetom/342",
    "date": "2026-09-28",
    "theme": "Бережность к себе",
    "target_section": "quotes_animation"
  },
  {
    "id": "quote-compass",
    "exact_text": "Ценности — это компас, который задает направление жизни, а не конечная точка. Это глубинные желания сердца: какими мы хотим быть и как строим отношения с миром.",
    "author_note": "О различии целей и ценностей",
    "post_id": 172,
    "post_url": "https://t.me/terapia_s_trepetom/172",
    "date": "2025-12-17",
    "theme": "Жизненные ценности",
    "target_section": "interactive_notes"
  }
]

with open('d:/Projects/judil-psy/data/verified_quotes.json', 'w', encoding='utf-8') as f:
    json.dump(quotes_data, f, ensure_ascii=False, indent=2)

# Curated Photos Catalog
photos_data = [
  {
    "filename": "post_261_1.jpg",
    "relative_path": "photos/post_261_1.jpg",
    "post_id": 261,
    "post_url": "https://t.me/terapia_s_trepetom/261",
    "role": "hero_portrait",
    "caption": "Главный портрет психолога на обложке сайта",
    "orientation": "portrait",
    "dimensions": [600, 800]
  },
  {
    "filename": "post_377_1.jpg",
    "relative_path": "photos/post_377_1.jpg",
    "post_id": 377,
    "post_url": "https://t.me/terapia_s_trepetom/377",
    "role": "about_portrait",
    "caption": "Портрет в блоке «Обо мне и подходе»",
    "orientation": "portrait",
    "dimensions": [600, 800]
  },
  {
    "filename": "post_174_1.jpg",
    "relative_path": "photos/post_174_1.jpg",
    "post_id": 174,
    "post_url": "https://t.me/terapia_s_trepetom/174",
    "role": "notes_diaries",
    "caption": "Заметка о дневниках самоподдержки",
    "orientation": "portrait",
    "dimensions": [800, 695]
  },
  {
    "filename": "post_360_1.jpg",
    "relative_path": "photos/post_360_1.jpg",
    "post_id": 360,
    "post_url": "https://t.me/terapia_s_trepetom/360",
    "role": "notes_rest",
    "caption": "Заметка о чувстве вины за отдых",
    "orientation": "portrait",
    "dimensions": [600, 800]
  },
  {
    "filename": "post_368_1.jpg",
    "relative_path": "photos/post_368_1.jpg",
    "post_id": 368,
    "post_url": "https://t.me/terapia_s_trepetom/368",
    "role": "notes_creativity",
    "caption": "Заметка о «бесполезных» хобби",
    "orientation": "portrait",
    "dimensions": [600, 800]
  },
  {
    "filename": "post_274_3.jpg",
    "relative_path": "photos/post_274_3.jpg",
    "post_id": 274,
    "post_url": "https://t.me/terapia_s_trepetom/274",
    "role": "notes_boundaries",
    "caption": "Заметка о сепарации и контакте с близкими",
    "orientation": "portrait",
    "dimensions": [599, 800]
  },
  {
    "filename": "post_164_1.jpg",
    "relative_path": "photos/post_164_1.jpg",
    "post_id": 164,
    "post_url": "https://t.me/terapia_s_trepetom/164",
    "role": "notes_voice",
    "caption": "Заметка о телесных блоках и праве на голос",
    "orientation": "portrait",
    "dimensions": [600, 800]
  },
  {
    "filename": "channel_avatar.jpg",
    "relative_path": "photos/channel_avatar.jpg",
    "post_id": 0,
    "post_url": "https://t.me/terapia_s_trepetom",
    "role": "channel_avatar",
    "caption": "Оригинальный аватар канала «Терапия с трепетом»",
    "orientation": "square",
    "dimensions": [320, 320]
  }
]

with open('d:/Projects/judil-psy/data/curated_photos.json', 'w', encoding='utf-8') as f:
    json.dump(photos_data, f, ensure_ascii=False, indent=2)

# Psychologist Profile
profile_data = {
  "name": "Юлия",
  "displayName": "Юлия | Judil.psy",
  "title": "Психолог-консультант в когнитивно-поведенческом (КПТ) и ACT-подходах",
  "tagline": "Помогаю разобраться в себе, снизить тревогу и выстроить жизнь, в которой есть опора на себя",
  "channelName": "Терапия с трепетом",
  "channelHandle": "@terapia_s_trepetom",
  "channelUrl": "https://t.me/terapia_s_trepetom",
  "bookingTelegram": "https://t.me/Judildan",
  "instagramHandle": "@judil.psy",
  "price": 2500,
  "currency": "₽",
  "durationMinutes": 55,
  "platform": "Яндекс Телемост (защищённый видеоканал)",
  "education": [
    {
      "year": "2025",
      "institution": "АНО ДПО «НАДПО»",
      "specialty": "Психолог-консультант с дополнительной специализацией в области когнитивно-поведенческой терапии",
      "hours": "1540 часов"
    },
    {
      "year": "2026",
      "institution": "АНО ДПО «НАДПО»",
      "specialty": "ACT-терапия — Терапия принятия и ответственности (Acceptance and Commitment Therapy)",
      "hours": "повышение квалификации"
    }
  ],
  "associations": [
    "Член Ассоциации когнитивно-поведенческой психотерапии (АКПП) с 30 сентября 2025 года"
  ],
  "rules": {
    "reschedule": "Перенос или отмена сессии возможны не позднее, чем за 24 часа до назначенного времени. При более поздней отмене или неявке сессия считается состоявшейся и подлежит оплате в полном объёме (ст. 781 ГК РФ).",
    "confidentiality": "Вся информация, озвученная на встречах, является строго конфиденциальной. Единственное исключение — ситуации прямой угрозы жизни и здоровью клиента или третьих лиц (ст. 13 323-ФЗ).",
    "frequency": "Оптимальная регулярность определяется индивидуально на первой сессии, классический формат — 1 раз в неделю."
  }
}

with open('d:/Projects/judil-psy/data/psychologist_profile.json', 'w', encoding='utf-8') as f:
    json.dump(profile_data, f, ensure_ascii=False, indent=2)

print("Successfully generated verified_quotes.json, curated_photos.json, and psychologist_profile.json!")
