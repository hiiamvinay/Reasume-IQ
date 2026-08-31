# ResumeIQ — Product Requirements

**Document:** Product Requirements Document
**Version:** 1.0
**Status:** Draft
**Last Updated:** 2026-08-31

---

# 1. Introduction

## 1.1 Purpose

This document defines the functional and non-functional requirements for ResumeIQ.

ResumeIQ is a full-stack AI-powered application that analyzes a user's resume against a specific job description and provides:

* Resume-to-job matching score
* Semantic similarity analysis
* Required skill analysis
* Matched skills
* Missing skills
* AI-generated resume improvement suggestions
* Historical scan results

This document serves as the reference for product development, testing, and acceptance.

---

# 2. Product Scope

## 2.1 In Scope

The initial version of ResumeIQ includes:

* User authentication
* Google OAuth
* Resume PDF upload
* Resume text extraction
* Job description input
* AI-based requirement and skill extraction
* Semantic similarity analysis
* Match scoring
* Missing skill identification
* AI-generated suggestions
* Scan history
* PostgreSQL persistence
* Redis caching
* AWS S3 file storage
* REST APIs
* React frontend

## 2.2 Out of Scope

The initial version will not include:

* Automatic job applications
* Job scraping
* Guaranteed ATS scores
* Automated resume fabrication
* Automatic creation of fake experience
* Proprietary LLM training
* Recruitment management functionality
* Employer-facing dashboards

---

# 3. Actors

The system contains the following primary actors.

## 3.1 User

An authenticated job seeker who:

* Uploads resumes
* Provides job descriptions
* Runs analyses
* Reviews results
* Views scan history

## 3.2 OAuth Provider

An external identity provider used to authenticate users.

Initial provider:

* Google

Future providers may include:

* GitHub
* LinkedIn

## 3.3 AI Services

External or local AI components used for:

* Requirement extraction
* Skill extraction
* Semantic similarity
* Resume suggestions

---

# 4. Functional Requirements

Functional requirements describe what the system must do.

---

## FR-001 — User Authentication

The system shall allow users to authenticate using Google OAuth.

### Requirements

* The user can initiate Google authentication.
* The backend handles the OAuth authorization flow.
* The backend validates the OAuth response.
* The backend identifies the authenticated user.
* A new user account is created when necessary.
* Existing users are recognized.
* Authentication state is maintained securely.
* Users can log out.

### Acceptance Criteria

```text
Given an unauthenticated user
When the user selects "Continue with Google"
Then the user is redirected to Google authentication.

Given successful Google authentication
When Google returns the authorization response
Then the backend authenticates the user
And the frontend receives an authenticated state.
```

---

# 5. Resume Management

## FR-002 — Resume Upload

The system shall allow authenticated users to upload a resume in PDF format.

### Requirements

* Only supported file types are accepted.
* File size limits must be enforced.
* Invalid files must be rejected.
* The resume must be associated with the authenticated user.
* The original file must be stored in AWS S3.
* Resume metadata must be stored in PostgreSQL.

### Acceptance Criteria

```text
Given an authenticated user
When a valid PDF is uploaded
Then the file is stored successfully
And the resume metadata is persisted.
```

---

## FR-003 — Resume Text Extraction

The system shall extract readable text from uploaded PDF resumes.

### Requirements

* PDF content must be parsed.
* Extraction failures must be handled gracefully.
* Extracted text must be associated with the resume.
* The system must not assume every PDF contains extractable text.

### Failure Example

```text
PDF uploaded
     ↓
Text extraction
     ↓
No readable text
     ↓
Return user-friendly error
```

---

# 6. Job Description

## FR-004 — Job Description Input

The system shall allow an authenticated user to provide a job description.

The initial implementation shall support pasted text.

### Requirements

* Job description must be non-empty.
* Input length must be validated.
* Excessively large input must be rejected or handled appropriately.
* The JD must be associated with the scan.

---

# 7. AI Requirement Extraction

## FR-005 — Job Requirement Extraction

The system shall identify relevant requirements from the job description.

The extraction system should identify information such as:

* Technical skills
* Tools
* Frameworks
* Programming languages
* Databases
* Cloud technologies
* Relevant experience
* Other important professional requirements

Example:

```text
Job Description
       ↓
AI Extraction
       ↓
Structured Requirements

Python
FastAPI
PostgreSQL
AWS
Docker
3+ years experience
```

The AI response must use a structured schema rather than unrestricted text wherever possible.

---

# 8. Resume Skill Extraction

## FR-006 — Resume Skill Extraction

The system shall identify relevant skills and experience from the resume.

The extraction process should produce structured data that can be compared against the requirements extracted from the JD.

Example:

```json
{
  "skills": [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Docker"
  ]
}
```

The extraction system must not add unsupported skills.

---

# 9. Semantic Matching

## FR-007 — Semantic Similarity

The system shall calculate semantic similarity between relevant resume and job description content.

The system shall use sentence-transformer embeddings for semantic representation.

Conceptually:

```text
Resume
  ↓
Embedding A

Job Description
  ↓
Embedding B

Embedding A + Embedding B
          ↓
Cosine Similarity
          ↓
Semantic Score
```

The semantic score shall be normalized to a defined range.

Initial range:

```text
0–100
```

---

# 10. Skill Matching

## FR-008 — Required Skill Matching

The system shall compare skills extracted from the resume against skills extracted from the job description.

The result shall classify skills into categories such as:

```text
Matched
Missing
Partially matched
```

Example:

```text
JD Requirement       Resume        Result

Python               Python        MATCH
FastAPI              FastAPI       MATCH
PostgreSQL           PostgreSQL    MATCH
AWS                  —             MISSING
Kubernetes           —             MISSING
```

---

# 11. Experience Relevance

## FR-009 — Experience Analysis

The system should evaluate how relevant the candidate's described experience is to the job requirements.

The analysis may consider:

* Project descriptions
* Work experience
* Responsibilities
* Technologies used
* Domain relevance
* Experience duration where available

The system must not invent experience.

---

# 12. Matching Score

## FR-010 — Overall Match Score

The system shall calculate an overall resume-to-JD matching score.

The initial scoring model shall combine multiple signals.

Example:

```text
Semantic Similarity     50%
Required Skills         30%
Experience Relevance    20%
```

Formula:

```text
Final Score =
    Semantic Score × 0.50
  + Skill Score × 0.30
  + Experience Score × 0.20
```

Example:

```text
Semantic Score       = 82
Skill Score          = 75
Experience Score     = 90

Final Score
= 82 × 0.50
+ 75 × 0.30
+ 90 × 0.20

= 81.5
```

The final score shall be normalized to:

```text
0–100
```

The scoring weights must be configurable rather than hard-coded throughout the application.

---

# 13. AI Suggestions

## FR-011 — Resume Improvement Suggestions

The system shall generate actionable suggestions based on the resume and job description.

Suggestions may include:

* Improving resume bullets
* Highlighting relevant existing experience
* Improving technical descriptions
* Adding measurable outcomes
* Reordering information for relevance
* Clarifying existing skills

### Important Business Rule

The system must not recommend that a user claim skills or experience they do not possess.

For example, the system should not produce:

```text
"Add Kubernetes to your resume."
```

if the user has no evidence of Kubernetes experience.

Instead:

```text
"Kubernetes is mentioned as a requirement but is not
represented in your resume. If you have relevant
experience, consider adding it with a specific example."
```

---

# 14. Scan

## FR-012 — Create Scan

A scan represents one analysis between a resume and a job description.

A scan shall contain:

* User ID
* Resume ID
* Job description
* Match score
* Skill analysis
* Semantic score
* Experience score
* Suggestions
* Processing status
* Timestamps

Example lifecycle:

```text
CREATED
   ↓
PROCESSING
   ↓
COMPLETED
```

Failure state:

```text
PROCESSING
   ↓
FAILED
```

---

# 15. Scan History

## FR-013 — Scan History

Authenticated users shall be able to retrieve their previous scans.

Users shall only be able to access scans belonging to their account.

### Requirements

* List previous scans.
* View individual scan results.
* Sort scans by date.
* Paginate large result sets.

Example:

```text
My Scans

Software Engineer — 82%
Backend Engineer  — 76%
Python Developer  — 89%
```

---

# 16. Caching

## FR-014 — Redis Caching

The system may cache expensive or repeatable operations using Redis.

Potential cacheable operations include:

* Repeated JD analysis
* Embeddings
* LLM responses
* Temporary OAuth state
* Rate limiting data

Cached data must have appropriate expiration policies.

---

# 17. File Storage

## FR-015 — S3 Storage

Resume files shall be stored in AWS S3.

The database shall store the metadata required to locate the object.

The system must not expose unrestricted public access to uploaded resumes.

---

# 18. API Requirements

## FR-016 — REST API

The backend shall expose a REST API.

All application APIs shall use the versioned prefix:

```text
/api/v1/
```

Example endpoints:

```text
GET    /api/v1/health

GET    /api/v1/auth/oauth/google
GET    /api/v1/auth/oauth/google/callback
POST   /api/v1/auth/logout

POST   /api/v1/resumes
GET    /api/v1/resumes

POST   /api/v1/scans
GET    /api/v1/scans
GET    /api/v1/scans/{scan_id}
```

API behavior shall be documented separately in:

```text
docs/02-architecture/api-design.md
```

---

# 19. Frontend Requirements

## FR-017 — React Application

The frontend shall provide:

### Authentication

* Login page
* OAuth login
* Logout

### Resume

* Resume upload
* Upload status
* Resume validation errors

### Job Description

* JD input
* Input validation

### Analysis

* Loading state
* Match score
* Skill analysis
* Suggestions
* Error state

### History

* Previous scans
* Scan details

---

# 20. Error Handling

## FR-018 — Error Handling

The system shall return meaningful errors for:

* Invalid authentication
* Expired authentication
* Invalid file
* Oversized file
* PDF extraction failure
* Invalid JD
* AI service failure
* Database failure
* Storage failure
* Rate-limit violations

Errors returned to users must not expose sensitive implementation details.

---

# 21. Non-Functional Requirements

Non-functional requirements describe how the system should behave.

---

## NFR-001 — Security

The system shall:

* Protect authentication credentials.
* Protect OAuth secrets.
* Validate authenticated users.
* Enforce user-level authorization.
* Protect uploaded resumes.
* Validate uploaded files.
* Prevent unauthorized scan access.
* Never expose API secrets to the frontend.

---

## NFR-002 — Performance

The system should provide responsive API behavior for normal operations.

AI-powered operations may take longer than standard CRUD operations.

The system should track:

* API latency
* AI latency
* PDF extraction latency
* Database latency
* Cache latency

---

## NFR-003 — Reliability

External dependencies may fail.

The system should handle failures from:

* Google OAuth
* Groq
* AWS S3
* PostgreSQL
* Redis

Failures should produce controlled application behavior rather than unhandled crashes.

---

## NFR-004 — Scalability

The backend should be stateless where practical so that multiple application instances can run simultaneously.

Persistent state should be stored in:

* PostgreSQL
* Redis
* S3

rather than local application memory.

---

## NFR-005 — Maintainability

The system should use clear separation between:

```text
API
 ↓
Service
 ↓
Repository
 ↓
Database
```

AI-specific functionality should remain separated from general application logic.

---

## NFR-006 — Testability

Core business logic should be independently testable.

The scoring engine should be deterministic and testable without calling an external LLM.

AI integrations should be mockable in automated tests.

---

## NFR-007 — Observability

Production environments should provide:

* Structured logs
* Request IDs
* Error tracking
* Health checks
* Performance metrics
* AI service metrics

---

## NFR-008 — Privacy

Resume content and extracted personal information are sensitive user data.

The system should:

* Restrict access by user.
* Avoid unnecessary data retention.
* Protect stored documents.
* Avoid exposing resume contents in logs.
* Avoid sending unnecessary personal information to external AI services.

---

# 22. Business Rules

## BR-001 — No Fabricated Experience

ResumeIQ must never encourage users to claim experience they do not have.

## BR-002 — Explainable Score

The overall score must be derived from defined scoring signals.

## BR-003 — User Data Isolation

Users can only access their own resumes and scans.

## BR-004 — AI Is Not the Sole Scoring Authority

The LLM may provide analysis and extraction, but the final score should be calculated by the application's scoring engine.

## BR-005 — External Services Can Fail

The application must handle external AI, OAuth, storage, and database failures gracefully.

---

# 23. Acceptance Criteria

The first usable version is considered complete when a user can successfully perform the following workflow:

```text
Login
  ↓
Upload Resume
  ↓
Paste Job Description
  ↓
Start Analysis
  ↓
Resume Processing
  ↓
AI Analysis
  ↓
Semantic Matching
  ↓
Score Calculation
  ↓
Skill Comparison
  ↓
Suggestions
  ↓
Display Results
  ↓
Save Scan
  ↓
View History
```

A successful result should contain at minimum:

```json
{
  "match_score": 82,
  "semantic_score": 86,
  "skill_score": 78,
  "experience_score": 80,
  "matched_skills": [
    "Python",
    "FastAPI",
    "PostgreSQL"
  ],
  "missing_skills": [
    "AWS",
    "Kubernetes"
  ],
  "suggestions": []
}
```

---

# 24. Requirements Traceability

Requirements should eventually be mapped to implementation and tests.

Example:

| Requirement | Implementation    | Test                   |
| ----------- | ----------------- | ---------------------- |
| FR-001      | OAuth service     | Auth integration tests |
| FR-002      | Resume service    | Upload tests           |
| FR-007      | Embedding service | Similarity tests       |
| FR-010      | Scoring engine    | Scoring unit tests     |
| FR-013      | Scan service      | Scan API tests         |
| NFR-001     | Security layer    | Security tests         |

This ensures that requirements do not become documentation that is disconnected from the actual product.

---

# 25. Requirement Change Process

Requirements may change during development.

A requirement change should be:

1. Identified
2. Discussed
3. Documented
4. Evaluated for architectural impact
5. Implemented
6. Tested
7. Reflected in the documentation

Major architectural changes should additionally have an Architecture Decision Record under:

```text
docs/decisions/
```

---

# 26. Related Documentation

| Document                 | Purpose                      |
| ------------------------ | ---------------------------- |
| `vision.md`              | Product vision and goals     |
| `user-stories.md`        | User workflows and use cases |
| `roadmap.md`             | Development milestones       |
| `system-architecture.md` | Technical architecture       |
| `database-design.md`     | Database structure           |
| `api-design.md`          | API contracts                |
| `authentication.md`      | Authentication architecture  |
| `ai-pipeline.md`         | AI processing pipeline       |
| `test-strategy.md`       | Testing strategy             |
| `deployment.md`          | Production deployment        |

---

# 27. Document Status

**Status:** Draft

This document will evolve as the product is implemented and requirements become better understood.

The requirements document should describe the **intended behavior of the product**, while implementation-specific details should remain in the architecture and development documentation.
