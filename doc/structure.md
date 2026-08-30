backend/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── auth.py
│   │   ├── resumes.py
│   │   ├── jobs.py
│   │   ├── scans.py
│   │   └── users.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── resume.py
│   │   ├── job.py
│   │   └── scan.py
│   │
│   ├── schemas/
│   │   ├── auth.py
│   │   ├── resume.py
│   │   ├── job.py
│   │   └── scan.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── resume_service.py
│   │   ├── parser_service.py
│   │   ├── matching_service.py
│   │   ├── embedding_service.py
│   │   ├── llm_service.py
│   │   └── storage_service.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   │
│   └── utils/
│       └── helpers.py
│
├── tests/
│
├── requirements.txt
├── .env
└── Dockerfile


