# ResumeIQ — User Stories

**Document:** User Stories
**Version:** 1.0
**Status:** Draft
**Last Updated:** 2026-08-31

---

# 1. Introduction

This document describes ResumeIQ from the perspective of its users.

User stories define what users want to accomplish and why.

The format used throughout this document is:

> **As a [user], I want [action], so that [benefit].**

Each story includes acceptance criteria that can be used by developers and testers to determine when the story is complete.

---

# 2. Personas

## 2.1 Job Seeker

The primary ResumeIQ user.

The job seeker wants to:

* Understand whether their resume matches a job.
* Identify missing skills.
* Improve their resume.
* Compare their resume against multiple opportunities.
* Track previous analyses.

---

# 3. Epic Overview

ResumeIQ is divided into the following major user journeys:

```text
Authentication
      │
      ▼
Resume Management
      │
      ▼
Job Description
      │
      ▼
Resume Analysis
      │
      ├── Matching Score
      ├── Skill Analysis
      └── AI Suggestions
      │
      ▼
Scan History
```

---

# 4. Epic: Authentication

## US-001 — Sign in with Google

**As a** job seeker,

**I want** to sign in using my Google account,

**so that** I can start using ResumeIQ without creating another password.

### Acceptance Criteria

* User can select "Continue with Google".
* User is redirected to Google's authentication page.
* User can authorize ResumeIQ.
* Successful authentication returns the user to ResumeIQ.
* The user is authenticated after returning.
* A new account is created if the user does not already exist.
* An existing account is recognized if the user has previously signed in.

---

## US-002 — Remain Authenticated

**As a** user,

**I want** my authentication state to persist,

**so that** I don't have to sign in every time I use the application.

### Acceptance Criteria

* Authenticated users can access protected pages.
* Refreshing the application does not unnecessarily log the user out.
* Expired authentication is handled gracefully.
* Unauthenticated users cannot access protected resources.

---

## US-003 — Sign Out

**As a** user,

**I want** to sign out,

**so that** other people cannot access my account from my device.

### Acceptance Criteria

* User can select "Sign out".
* Authentication state is invalidated.
* Protected pages are no longer accessible.
* User is returned to an appropriate public page.

---

# 5. Epic: Resume Management

## US-004 — Upload Resume

**As a** job seeker,

**I want** to upload my resume,

**so that** ResumeIQ can analyze it against a job description.

### Acceptance Criteria

* User can select a PDF file.
* The application displays the selected file.
* The application validates the file.
* Invalid files are rejected.
* A valid resume is uploaded successfully.
* User receives feedback while the upload is processing.

---

## US-005 — Replace Resume

**As a** job seeker,

**I want** to replace my existing resume,

**so that** I can analyze a newer version.

### Acceptance Criteria

* User can upload a new resume.
* The new resume is associated with the account.
* Previous scans remain associated with the resume version they used.
* The current resume is clearly identified.

---

## US-006 — Resume Upload Failure

**As a** user,

**I want** to understand why my resume upload failed,

**so that** I can correct the problem.

### Acceptance Criteria

The application should provide a meaningful message when:

* The file is not a PDF.
* The file is too large.
* The file cannot be processed.
* The upload service is temporarily unavailable.

The application should not expose internal errors or sensitive infrastructure information.

---

# 6. Epic: Job Description

## US-007 — Enter Job Description

**As a** job seeker,

**I want** to paste a job description into ResumeIQ,

**so that** I can compare my resume against a specific role.

### Acceptance Criteria

* User can paste job description text.
* Empty descriptions are rejected.
* Input length is validated.
* User can edit the JD before analysis.

---

## US-008 — Review Job Description

**As a** job seeker,

**I want** to review the job description before starting the analysis,

**so that** I can make sure I am analyzing the correct role.

### Acceptance Criteria

* The entered JD remains visible before analysis.
* User can edit the content.
* User can start the analysis after reviewing it.

---

# 7. Epic: Resume Analysis

## US-009 — Analyze Resume Against Job

**As a** job seeker,

**I want** ResumeIQ to analyze my resume against a job description,

**so that** I can understand how well I match the role.

### Acceptance Criteria

Given a valid resume and job description:

* User can start an analysis.
* The application shows a processing state.
* Resume content is analyzed.
* Job requirements are analyzed.
* Semantic similarity is calculated.
* Skills are compared.
* A final matching score is generated.
* The analysis result is displayed to the user.

---

# 8. Epic: Matching Score

## US-010 — View Matching Score

**As a** job seeker,

**I want** to see an overall matching score,

**so that** I can quickly understand how closely my resume aligns with the job.

### Acceptance Criteria

The result displays:

```text
Overall Match Score
```

as a value between:

```text
0–100
```

The score should be accompanied by supporting information rather than being presented as an unexplained number.

---

## US-011 — Understand the Score

**As a** job seeker,

**I want** to understand what contributed to my score,

**so that** I know what I should improve.

### Acceptance Criteria

The application should display relevant scoring components, such as:

```text
Semantic Similarity
Required Skills
Experience Relevance
```

Example:

```text
Overall Score             82%

Semantic Similarity       86%
Skill Coverage            78%
Experience Relevance      80%
```

---

# 9. Epic: Skill Analysis

## US-012 — View Matched Skills

**As a** job seeker,

**I want** to see which required skills are already represented in my resume,

**so that** I know which parts of my experience align with the role.

### Acceptance Criteria

Matched skills should be clearly displayed.

Example:

```text
Matched Skills

✓ Python
✓ FastAPI
✓ PostgreSQL
✓ Docker
```

---

## US-013 — View Missing Skills

**As a** job seeker,

**I want** to see important skills required by the job that are not represented in my resume,

**so that** I can identify potential gaps.

### Acceptance Criteria

Missing skills should be clearly displayed.

Example:

```text
Missing Skills

✗ AWS
✗ Kubernetes
```

The system should distinguish between a genuinely missing skill and a skill that may be represented using different terminology.

---

## US-014 — Understand Skill Relevance

**As a** job seeker,

**I want** the system to understand semantically related skills,

**so that** my score does not depend entirely on exact keyword matches.

### Acceptance Criteria

The system should be capable of recognizing that relevant experience may be expressed differently from the wording used in the JD.

The analysis should use semantic matching where appropriate.

---

# 10. Epic: AI Suggestions

## US-015 — Receive Resume Suggestions

**As a** job seeker,

**I want** personalized suggestions based on my resume and the job description,

**so that** I can improve my resume for that specific role.

### Acceptance Criteria

Suggestions should:

* Reference relevant parts of the resume.
* Consider the job requirements.
* Be specific rather than generic.
* Be actionable.
* Avoid inventing experience.

---

## US-016 — Improve Resume Bullet

**As a** job seeker,

**I want** suggestions for improving individual resume bullets,

**so that** I can describe my existing experience more effectively.

### Example

Current:

```text
Built a REST API using FastAPI.
```

Suggestion:

```text
If supported by your actual experience, consider
adding measurable impact such as request volume,
latency improvements, or development time saved.
```

The system should not invent metrics.

---

## US-017 — Understand Missing Skills

**As a** job seeker,

**I want** explanations for important missing skills,

**so that** I can understand why they affect my match.

### Acceptance Criteria

The system should identify:

* The missing requirement.
* Its relevance to the JD.
* Whether relevant evidence exists in the resume.

---

# 11. Epic: Scan History

## US-018 — Save Analysis

**As a** job seeker,

**I want** my completed analyses to be saved,

**so that** I can review them later.

### Acceptance Criteria

A completed scan should store:

* Resume used
* Job description
* Match score
* Skill analysis
* Suggestions
* Creation date

---

## US-019 — View Scan History

**As a** job seeker,

**I want** to view my previous analyses,

**so that** I can compare how my resume performs across different jobs.

### Example

```text
My Scan History

Backend Engineer       82%
Python Developer       89%
Software Engineer      76%
ML Engineer             64%
```

---

## US-020 — View Previous Scan

**As a** job seeker,

**I want** to open a previous scan,

**so that** I can review its complete analysis.

### Acceptance Criteria

The user can view:

* Original job description
* Resume used
* Match score
* Skill analysis
* Suggestions

The user must only be able to access their own scans.

---

# 12. Epic: Error Handling

## US-021 — AI Service Failure

**As a** user,

**I want** the application to handle AI service failures gracefully,

**so that** I understand what happened instead of seeing a broken application.

### Acceptance Criteria

If an AI service fails:

* The user receives a meaningful error.
* The application does not expose API keys or internal errors.
* The scan is marked appropriately.
* The user can retry when appropriate.

---

## US-022 — Analysis Processing State

**As a** user,

**I want** to know when my analysis is being processed,

**so that** I don't repeatedly submit the same request.

### Acceptance Criteria

The interface displays states such as:

```text
Preparing...
Analyzing resume...
Analyzing job description...
Calculating match...
Generating suggestions...
Complete
```

---

# 13. Epic: Privacy and Security

## US-023 — Private Resume

**As a** user,

**I want** my resume to remain private,

**so that** other users cannot access my personal information.

### Acceptance Criteria

* Only the authenticated user can access their resume.
* Uploaded documents are not publicly accessible.
* Other users cannot retrieve the user's scan results.

---

## US-024 — Secure AI Processing

**As a** user,

**I want** my information to be handled securely during AI analysis,

**so that** my personal information is not unnecessarily exposed.

### Acceptance Criteria

* Only required information is sent to external AI services.
* API credentials are never exposed to the frontend.
* Sensitive content is not written into application logs unnecessarily.

---

# 14. Epic: User Experience

## US-025 — Simple Analysis Workflow

**As a** job seeker,

**I want** the analysis workflow to be simple,

**so that** I can evaluate a job quickly.

### Target workflow

```text
Login
  ↓
Upload Resume
  ↓
Paste JD
  ↓
Analyze
  ↓
View Results
```

The user should not need to understand AI, embeddings, NLP, or scoring algorithms to use the application.

---

# 15. Primary User Journey

The complete primary journey is:

```text
                    User
                      │
                      ▼
                 Login
                      │
                      ▼
              Upload Resume
                      │
                      ▼
            Paste Job Description
                      │
                      ▼
                  Analyze
                      │
                      ▼
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
        Match Score       Skill Analysis
             │                 │
             └────────┬────────┘
                      ▼
               AI Suggestions
                      │
                      ▼
                View Results
                      │
                      ▼
                Save Scan
                      │
                      ▼
               Scan History
```

---

# 16. Definition of Done

A user story is considered complete when:

* The functionality is implemented.
* The expected user workflow works.
* Acceptance criteria are satisfied.
* Appropriate automated tests exist.
* Error states are handled.
* Security requirements are satisfied where applicable.
* Documentation is updated where necessary.
* The implementation has passed CI.

---

# 17. MVP User Stories

The minimum viable product should prioritize:

| ID     | User Story                 | Priority |
| ------ | -------------------------- | -------- |
| US-001 | Sign in with Google        | P0       |
| US-004 | Upload Resume              | P0       |
| US-007 | Enter Job Description      | P0       |
| US-009 | Analyze Resume Against Job | P0       |
| US-010 | View Matching Score        | P0       |
| US-012 | View Matched Skills        | P0       |
| US-013 | View Missing Skills        | P0       |
| US-015 | Receive Resume Suggestions | P0       |
| US-018 | Save Analysis              | P1       |
| US-019 | View Scan History          | P1       |

---

# 18. Future User Stories

The following are intentionally outside the initial MVP:

* As a user, I want to maintain multiple resume versions.
* As a user, I want to compare two versions of my resume.
* As a user, I want to track applications.
* As a user, I want interview questions generated from the JD.
* As a user, I want personalized learning recommendations for missing skills.
* As a user, I want to analyze multiple job descriptions at once.
* As a user, I want additional OAuth providers.
* As a user, I want analytics showing how my resume performs across jobs.

These stories should not be implemented until they are prioritized in the product roadmap.

---

# 19. Traceability

User stories map to product requirements.

Example:

```text
US-009
  ↓
FR-005
FR-006
FR-007
FR-008
FR-009
FR-010
```

This relationship allows the team to trace:

```text
User Need
    ↓
User Story
    ↓
Requirement
    ↓
Implementation
    ↓
Test
```

This keeps product development aligned with actual user needs.

---

# 20. Summary

The core ResumeIQ user experience is:

> **"Give me my resume and a job description, tell me how well they match, explain why, and tell me how I can improve my resume without making anything up."**

Everything in the initial product should support that workflow.
