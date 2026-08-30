
## Status

🚧 **Under Active Development**

ResumeIQ is currently in development. Features, APIs,
and architecture may change before the first stable release.

The first stable release will be published as `v1.0.0`.

_____________________________

# ResumeIQ

> AI-powered resume-to-job-description matching and optimization platform.

ResumeIQ analyzes a candidate's resume against a specific job description to identify skill alignment, semantic relevance, missing requirements, and actionable resume improvements.

The platform combines **LLM-based structured extraction**, **semantic embeddings**, and a **deterministic scoring engine** to produce an explainable match analysis rather than relying on an LLM to generate an arbitrary score.

---

## Table of Contents

* [Overview](#overview)
* [Problem](#problem)
* [Goals](#goals)
* [Core Features](#core-features)
* [System Architecture](#system-architecture)
* [AI Architecture](#ai-architecture)
* [Technology Stack](#technology-stack)
* [Repository Structure](#repository-structure)
* [Authentication](#authentication)
* [Data Flow](#data-flow)
* [API Versioning](#api-versioning)
* [Local Development](#local-development)
* [Environment Variables](#environment-variables)
* [Database](#database)
* [Caching](#caching)
* [File Storage](#file-storage)
* [Testing](#testing)
* [Code Quality](#code-quality)
* [Security](#security)
* [Observability](#observability)
* [Deployment](#deployment)
* [CI/CD](#cicd)
* [Versioning and Releases](#versioning-and-releases)
* [Documentation](#documentation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

---

# Overview

ResumeIQ is a full-stack application designed to help job seekers understand how well their resume aligns with a particular job description.

A user can:

1. Authenticate using an OAuth provider.
2. Upload a resume in PDF format.
3. Paste a job description.
4. Run a resume-to-JD analysis.
5. View an explainable match score.
6. Review matched and missing skills.
7. Receive AI-generated resume improvement suggestions.
8. Review previous analyses.

The system is designed around a separation of concerns between:

* deterministic application logic,
* semantic similarity,
* LLM reasoning,
* persistent storage,
* caching,
* authentication,
* and infrastructure.

---

# Problem

Traditional resume screening systems often rely heavily on exact keyword matching.

This creates several problems:

* Equivalent skills may be expressed differently.
* Relevant experience may not use the exact terminology found in a JD.
* Candidates may not understand why their resume is considered a weak match.
* An LLM-generated score alone is difficult to reproduce or explain.

ResumeIQ addresses these problems by combining multiple signals.

---

# Goals

## Primary Goals

* Provide an explainable resume-to-JD match score.
* Identify skills explicitly required by a job description.
* Identify skills demonstrated by the resume.
* Highlight missing or insufficiently supported requirements.
* Measure semantic similarity between resume and JD content.
* Generate actionable resume improvement suggestions.
* Preserve scan history for authenticated users.
* Provide a production-ready API and frontend architecture.

## Non-Goals

ResumeIQ does not:

* Guarantee job interviews.
* Guarantee ATS acceptance.
* Automatically fabricate candidate experience.
* Automatically apply for jobs.
* Invent skills that are not supported by the user's resume.
* Replace professional career advice.

---

# Core Features

## Authentication

* OAuth-based authentication.
* Google authentication.
* Extensible provider architecture for future providers.
* Secure authenticated sessions.
* User-specific resource authorization.
* Logout and session invalidation.

## Resume Management

* PDF resume upload.
* Resume text extraction.
* Persistent resume metadata.
* Object storage for uploaded files.
* User-specific resume access.

## Job Description Analysis

* Job description submission.
* Structured requirement extraction.
* Skill identification.
* Requirement categorization.
* Resume/JD semantic comparison.

## Matching

* Semantic similarity score.
* Required skill coverage score.
* Explainable weighted scoring.
* Matched skill identification.
* Missing skill identification.

## AI Suggestions

* Resume bullet improvement suggestions.
* Context-aware recommendations.
* Evidence-based rewriting.
* Structured LLM responses.
* Protection against unsupported experience claims.

## Scan History

* Persistent scan records.
* Historical match scores.
* Previous analysis retrieval.
* User-scoped access control.

---

# System Architecture

```mermaid
flowchart TD
    User[User Browser]

    Frontend[React Frontend]

    API[FastAPI API]

    DB[(PostgreSQL)]
    Redis[(Redis)]
    S3[(AWS S3)]

    AI[AI Layer]
    LLM[Groq / LLaMA]
    Embeddings[Sentence Transformers]

    User --> Frontend
    Frontend -->|HTTPS / REST| API

    API --> DB
    API --> Redis
    API --> S3

    API --> AI

    AI --> LLM
    AI --> Embeddings
```

For detailed architecture documentation, see:

`docs/02-architecture/system-architecture.md`

---

# AI Architecture

ResumeIQ does not delegate the complete scoring process to an LLM.

Instead, the AI system is divided into independent components.

```mermaid
flowchart TD
    Resume[Resume Text]
    JD[Job Description]

    Resume --> Extraction[Structured Extraction]
    JD --> Extraction

    Extraction --> ResumeSkills[Resume Skills]
    Extraction --> JDSkills[JD Skills]

    Resume --> Embeddings[Sentence Transformer]
    JD --> Embeddings

    Embeddings --> Similarity[Cosine Similarity]

    ResumeSkills --> SkillScore[Skill Coverage Score]
    JDSkills --> SkillScore

    Similarity --> SemanticScore[Semantic Score]

    SkillScore --> Scoring[Match Scoring Engine]
    SemanticScore --> Scoring

    Scoring --> Result[Final Match Score]

    Resume --> LLM[Groq / LLaMA]
    JD --> LLM

    LLM --> Suggestions[Improvement Suggestions]
```

## LLM Responsibilities

The LLM is primarily used for tasks that require language understanding, such as:

* structured skill extraction,
* requirement interpretation,
* resume improvement suggestions,
* explanation generation.

The LLM is not trusted as the sole authority for the final match score.

## Semantic Matching

`sentence-transformers` converts text into vector representations.

The system calculates cosine similarity between relevant resume and JD representations.

Conceptually:

```text
Resume
  ↓
Embedding
  ↓
Vector A

Job Description
  ↓
Embedding
  ↓
Vector B

Vector A + Vector B
        ↓
Cosine Similarity
        ↓
Semantic Score
```

## Match Scoring

The scoring engine combines independent signals.

An initial scoring model may use:

```text
Semantic Similarity     50%
Required Skills         30%
Experience Relevance    20%
```

For example:

```text
Semantic Similarity = 82
Skill Coverage      = 75
Experience Relevance = 90

Final Score =
    82 × 0.50
  + 75 × 0.30
  + 90 × 0.20

Final Score = 81.5
```

The scoring model is intentionally deterministic so that the same inputs and configuration produce reproducible results.

The weighting strategy can evolve as the system gains evaluation data.

---

# Technology Stack

## Frontend

* React
* JavaScript
* Vite
* REST API integration

## Backend

* Python
* FastAPI
* Pydantic
* SQLAlchemy
* Alembic

## Database

* PostgreSQL

## Caching

* Redis

## AI

* Groq API
* LLaMA
* sentence-transformers
* cosine similarity

## Storage

* AWS S3

## Infrastructure

* Docker
* Docker Compose for local development
* AWS for production deployment

## Testing

* Pytest
* API integration tests
* Frontend tests
* End-to-end tests

## CI/CD

* GitHub Actions

---

# Repository Structure

```text
resumeiq/
│
├── .github/
│   └── workflows/
│       ├── test.yml
│       └── deploy.yml
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth/
│   │   │       ├── resumes/
│   │   │       ├── scans/
│   │   │       └── health/
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── dependencies.py
│   │   │
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── repositories/
│   │   ├── services/
│   │   │
│   │   ├── ai/
│   │   │   ├── extraction/
│   │   │   ├── embeddings/
│   │   │   ├── scoring/
│   │   │   └── llm/
│   │   │
│   │   ├── storage/
│   │   ├── cache/
│   │   └── main.py
│   │
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── auth/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── infrastructure/
│   ├── docker/
│   └── aws/
│
├── tests/
│   └── e2e/
│
├── docs/
│   ├── 01-product/
│   │   ├── vision.md
│   │   ├── requirements.md
│   │   ├── user-stories.md
│   │   └── roadmap.md
│   │
│   ├── 02-architecture/
│   │   ├── system-architecture.md
│   │   ├── database-design.md
│   │   ├── api-design.md
│   │   ├── authentication.md
│   │   └── ai-pipeline.md
│   │
│   ├── 03-development/
│   │   ├── development-guide.md
│   │   ├── coding-standards.md
│   │   └── git-workflow.md
│   │
│   ├── 04-testing/
│   │   └── test-strategy.md
│   │
│   ├── 05-operations/
│   │   ├── deployment.md
│   │   └── monitoring.md
│   │
│   └── decisions/
│       ├── ADR-001-fastapi.md
│       ├── ADR-002-google-oauth.md
│       └── ADR-003-postgresql.md
│
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── docker-compose.yml
├── LICENSE
└── README.md
```

---

# Authentication

ResumeIQ uses OAuth-based authentication.

The high-level authentication flow is:

```mermaid
sequenceDiagram
    participant User
    participant React
    participant API as FastAPI
    participant Google

    User->>React: Click "Continue with Google"
    React->>API: Start OAuth
    API->>Google: Authorization request
    Google->>User: Login / Consent
    Google->>API: Authorization callback
    API->>Google: Exchange authorization code
    Google->>API: User identity
    API->>API: Find/Create user
    API->>React: Redirect with authenticated session
    React->>API: Authenticated API request
```

The OAuth implementation is documented in:

`docs/02-architecture/authentication.md`

Provider credentials are never committed to the repository.

---

# Data Flow

A typical resume analysis follows this flow:

```text
1. User authenticates
        ↓
2. User uploads resume
        ↓
3. Backend validates file
        ↓
4. PDF text is extracted
        ↓
5. Resume is stored in S3
        ↓
6. User submits job description
        ↓
7. AI extraction processes resume + JD
        ↓
8. Semantic embeddings are generated
        ↓
9. Similarity is calculated
        ↓
10. Required skills are compared
        ↓
11. Scoring engine calculates final score
        ↓
12. LLM generates explanations/suggestions
        ↓
13. Result is persisted
        ↓
14. React displays analysis
```

---

# API Versioning

The API is versioned under:

```text
/api/v1/
```

Examples:

```text
GET    /api/v1/health
GET    /api/v1/auth/oauth/google
GET    /api/v1/auth/oauth/google/callback

POST   /api/v1/resumes
GET    /api/v1/resumes

POST   /api/v1/scans
GET    /api/v1/scans
GET    /api/v1/scans/{scan_id}
```

API contracts are documented in:

`docs/02-architecture/api-design.md`

FastAPI also exposes interactive OpenAPI documentation during development.

---

# Local Development

## Prerequisites

Install:

* Git
* Python 3.12+
* Node.js 20+
* Docker
* Docker Compose

Verify:

```bash
python --version
node --version
docker --version
```

---

## Clone Repository

```bash
git clone <repository-url>
cd resumeiq
```

---

## Start Infrastructure

```bash
docker compose up -d postgres redis
```

Check running services:

```bash
docker compose ps
```

---

# Backend Setup

Create a virtual environment:

```bash
cd backend

python -m venv .venv
```

Activate it on Linux/macOS:

```bash
source .venv/bin/activate
```

Windows:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
alembic upgrade head
```

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Environment Variables

Create a local `.env` file.

Example:

```env
# Application
ENVIRONMENT=development
SECRET_KEY=replace_me

# Database
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/resumeiq

# Redis
REDIS_URL=redis://localhost:6379/0

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:8000/api/v1/auth/oauth/google/callback

# Groq
GROQ_API_KEY=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=
```

Never commit `.env`.

Use:

```text
.env.example
```

to document required configuration without exposing secrets.

---

# Database

PostgreSQL stores persistent application data.

The database is responsible for:

* Users
* OAuth accounts
* Resume metadata
* Scan records
* Match results
* AI analysis metadata

The actual uploaded resume files are not stored directly in PostgreSQL.

They are stored in object storage.

Database schema documentation:

`docs/02-architecture/database-design.md`

Migrations are managed using Alembic.

Create a migration:

```bash
alembic revision --autogenerate -m "add scan table"
```

Apply migrations:

```bash
alembic upgrade head
```

---

# Caching

Redis is used for short-lived and frequently accessed data.

Potential use cases include:

* repeated JD analysis,
* rate limiting,
* temporary OAuth state,
* expensive AI response caching,
* request-level coordination.

Cache keys should be deterministic where appropriate.

For example:

```text
jd:{jd_hash}:model:{model_version}
```

Caching strategy is documented in:

`docs/02-architecture/system-architecture.md`

---

# File Storage

Resume PDFs are stored in AWS S3.

The application stores metadata in PostgreSQL while the binary document remains in object storage.

Conceptually:

```text
PostgreSQL

resume_id
user_id
s3_key
filename
created_at
```

while S3 contains:

```text
resumes/
└── {user_id}/
    └── {resume_id}.pdf
```

Users must only be able to access files belonging to their own account.

---

# Testing

Testing is divided into multiple levels.

## Unit Tests

Test isolated business logic.

```bash
pytest tests/unit
```

## Integration Tests

Test API, database, cache, and service boundaries.

```bash
pytest tests/integration
```

## End-to-End Tests

Test complete user workflows.

```bash
pytest tests/e2e
```

## Full Test Suite

```bash
pytest
```

AI functionality should also be evaluated against a controlled dataset to detect regressions in:

* skill extraction,
* semantic similarity,
* scoring,
* LLM output structure,
* recommendation quality.

Detailed testing strategy:

`docs/04-testing/test-strategy.md`

---

# Code Quality

The project uses automated code-quality checks.

Backend checks should include:

```text
Linting
Formatting
Type checking
Unit tests
Integration tests
```

Frontend checks should include:

```text
Linting
Formatting
Build verification
Tests
```

These checks should run automatically in CI before a pull request can be merged.

---

# Security

Security is treated as a core system requirement.

## Authentication

OAuth credentials are stored as environment/secret configuration.

## Authorization

Every authenticated resource must be scoped to the current user.

For example:

```text
GET /api/v1/scans/{scan_id}
```

must verify that the requested scan belongs to the authenticated user.

## File Upload Security

Uploaded files should be validated for:

* file type,
* file size,
* content type,
* parsing failures.

## Secrets

Never commit:

```text
.env
API keys
OAuth client secrets
AWS credentials
database passwords
private keys
```

## AI Safety

The system must not instruct the LLM to fabricate candidate experience.

Generated suggestions should be based on information already present in the user's resume.

---

# Observability

Production services should provide:

* structured application logs,
* request IDs,
* error tracking,
* health checks,
* latency metrics,
* API error rates,
* AI request latency,
* AI failure rates,
* cache hit/miss metrics.

Health endpoint:

```text
GET /api/v1/health
```

A health check should distinguish between:

```text
Application is running
```

and:

```text
Dependencies are healthy
```

where appropriate.

---

# Deployment

Production deployment is containerized.

Conceptually:

```text
GitHub
   │
   ▼
GitHub Actions
   │
   ▼
Docker Build
   │
   ▼
Container Registry
   │
   ▼
AWS
   │
   ├── FastAPI
   ├── PostgreSQL
   ├── Redis
   └── S3
```

The production deployment strategy is documented in:

`docs/05-operations/deployment.md`

Infrastructure configuration belongs under:

```text
infrastructure/
```

Production secrets must be stored using an appropriate secret-management mechanism rather than committed to Git.

---

# CI/CD

GitHub Actions is used for automated CI/CD.

## Pull Request

A pull request should trigger:

```text
Checkout
   ↓
Install dependencies
   ↓
Lint
   ↓
Type checks
   ↓
Unit tests
   ↓
Integration tests
   ↓
Build
```

A failing check should prevent merging.

## Release

A production release follows:

```text
Feature
   ↓
Pull Request
   ↓
CI
   ↓
Merge
   ↓
Staging
   ↓
Validation
   ↓
Version Tag
   ↓
GitHub Release
   ↓
Production Deployment
```

---

# Versioning and Releases

ResumeIQ follows Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

Examples:

```text
v0.1.0
v0.2.0
v0.2.1
v1.0.0
```

## PATCH

Backward-compatible bug fix.

```text
v1.0.0 → v1.0.1
```

## MINOR

Backward-compatible feature.

```text
v1.0.1 → v1.1.0
```

## MAJOR

Breaking change.

```text
v1.1.0 → v2.0.0
```

Example release workflow:

```bash
git checkout main
git pull

git tag -a v0.1.0 -m "Release v0.1.0"

git push origin v0.1.0
```

A GitHub Release is then created against the tag.

Release history is maintained in:

`CHANGELOG.md`

---

# Documentation

Project documentation is organized by responsibility.

## Product

```text
docs/01-product/
```

Contains:

* Product vision
* Requirements
* User stories
* Roadmap

## Architecture

```text
docs/02-architecture/
```

Contains:

* System architecture
* Database design
* API design
* Authentication architecture
* AI pipeline

## Development

```text
docs/03-development/
```

Contains:

* Development guide
* Coding standards
* Git workflow

## Testing

```text
docs/04-testing/
```

Contains:

* Test strategy
* Test plans

## Operations

```text
docs/05-operations/
```

Contains:

* Deployment
* Monitoring
* Incident response

## Architecture Decisions

```text
docs/decisions/
```

Architecture Decision Records document important technical decisions and their rationale.

---

# Roadmap

## Phase 1 — Foundation

* [x] Repository setup
* [x] React frontend
* [x] FastAPI backend
* [ ] PostgreSQL integration
* [ ] Docker development environment
* [ ] CI pipeline

## Phase 2 — Authentication

* [ ] Google OAuth
* [ ] Session management
* [ ] User persistence
* [ ] Authorization
* [ ] Logout

## Phase 3 — Resume Processing

* [ ] PDF upload
* [ ] PDF text extraction
* [ ] S3 storage
* [ ] Resume metadata
* [ ] Resume validation

## Phase 4 — Matching

* [ ] JD submission
* [ ] Structured skill extraction
* [ ] Resume skill extraction
* [ ] Sentence-transformer embeddings
* [ ] Cosine similarity
* [ ] Match scoring engine

## Phase 5 — AI Suggestions

* [ ] Groq integration
* [ ] Structured LLM responses
* [ ] Resume bullet suggestions
* [ ] Missing skill explanations
* [ ] Prompt evaluation

## Phase 6 — Production

* [ ] Redis caching
* [ ] Rate limiting
* [ ] Monitoring
* [ ] Error tracking
* [ ] Production infrastructure
* [ ] Automated deployment
* [ ] Security review
* [ ] AI evaluation dataset
* [ ] Production release

---

# Engineering Principles

ResumeIQ follows several principles.

### Explainability over arbitrary AI output

The final score should be derived from measurable signals rather than a number invented by an LLM.

### Deterministic where possible

Use traditional application logic when the problem does not require generative AI.

### AI where it adds value

Use LLMs for language understanding, extraction, explanation, and generation.

### User data isolation

A user must never be able to access another user's resources.

### Fail safely

External services such as LLM providers, object storage, and OAuth providers can fail. The application should handle these failures explicitly.

### Observable production systems

Errors, latency, external service failures, and important business metrics should be measurable.

---

# Contributing

Development follows the project's Git workflow.

Recommended branch naming:

```text
feature/<name>
fix/<name>
refactor/<name>
docs/<name>
test/<name>
```

Examples:

```text
feature/google-oauth
feature/resume-upload
fix/oauth-state-validation
docs/update-authentication
```

Commit messages should follow Conventional Commits:

```text
feat: add Google OAuth
fix: handle expired OAuth state
test: add resume upload tests
docs: update authentication architecture
refactor: separate scoring service
chore: update dependencies
```

Before opening a pull request:

```text
- Tests pass
- Lint passes
- Documentation is updated where necessary
- No secrets are committed
- API changes are documented
```

See:

`CONTRIBUTING.md`

---

# License

This project is licensed under the MIT License.

See `LICENSE` for details.

---

## Project Documentation

| Area         | Documentation           |
| ------------ | ----------------------- |
| Product      | `docs/01-product/`      |
| Architecture | `docs/02-architecture/` |
| Development  | `docs/03-development/`  |
| Testing      | `docs/04-testing/`      |
| Operations   | `docs/05-operations/`   |
| Decisions    | `docs/decisions/`       |
| Releases     | `CHANGELOG.md`          |

---

## Status

ResumeIQ is currently under active development.

The architecture and APIs may change before the first stable `v1.0.0` release.
