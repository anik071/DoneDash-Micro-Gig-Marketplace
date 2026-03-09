# DoneDash — Campus Micro-Gig Marketplace
### Software Requirements Specification (SRS) · v1.0

| Field | Details |
|---|---|
| **Authors** | Abdul Kader Anik (232071071)  ·  Shraban Chakma (231071035) |
| **Version** | 1.0 — Draft |
| **Date** | March 2026 |
| **Tech Stack** | Flutter · Firebase · Imgbb |
| **Platform** | iOS & Android |
| **Prepared For** | Mobile Application Development Project |
| **University** | Shanto-Mariam University of Creative Technology |

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Objectives](#13-objectives)
   - 1.4 [Targeted Users](#14-targeted-users)
   - 1.5 [Definitions & Acronyms](#15-definitions--acronyms)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Classes](#23-user-classes)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design & Implementation Constraints](#25-design--implementation-constraints)
   - 2.6 [Assumptions & Dependencies](#26-assumptions--dependencies)
3. [Specific Requirements](#3-specific-requirements)
   - 3.1 [Functional Requirements](#31-functional-requirements)
   - 3.2 [Non-Functional Requirements](#32-non-functional-requirements)
   - 3.3 [External Interface Requirements](#33-external-interface-requirements)
4. [System Models](#4-system-models)
5. [Project Management](#5-project-management)
   - 5.1 [Development Tools](#51-development-tools)
   - 5.2 [Timeline](#52-timeline)
6. [Appendix](#6-appendix)

---

## 1. Introduction

### 1.1 Purpose

DoneDash is a mobile platform designed to connect university students who need quick, localized help with other students willing to earn money performing short tasks. The platform targets the friction-free gig economy within a campus environment, enabling micro-transactions for physical labor, academic assistance, and delivery tasks.

### 1.2 Scope

DoneDash will be delivered as a cross-platform mobile application (iOS and Android) built with Flutter, backend by Firebase for real-time data and authentication, and Imgbb for profile image hosting. The scope includes:

- Two distinct user roles: Poster and Helper
- Full job lifecycle management from posting to completion
- Real-time notifications and status updates
- Ratings and reviews system for Helpers
- Filtering and discovery of available gigs

### 1.3 Objectives

- Connect individuals who need quick help with students who want to earn money
- Provide a safe, trusted, campus-based gig marketplace
- Enable flexible allowance for students without a formal job
- Manage job lifecycle from posting to completion efficiently

### 1.4 Targeted Users

| Role | Description |
|---|---|
| **Poster** | Individuals who need a job done. They create listings, review applicants, accept helpers, and mark jobs complete. |
| **Helper** | Students who want to earn extra cash. They browse gigs, accept jobs, complete work, and receive payment and ratings. |

### 1.5 Definitions & Acronyms

| Term | Definition |
|---|---|
| **Poster** | A student who creates and posts a job on the platform |
| **Helper** | A student who browses and accepts jobs to earn money |
| **Gig / Job** | A short-term task posted by a Poster requiring one or more Helpers |
| **SRS** | Software Requirements Specification |
| **Firebase** | Google's Backend-as-a-Service platform used for auth, database, and storage |
| **Imgbb** | Third-party image hosting API used for profile pictures |
| **Flutter** | Google's cross-platform mobile UI SDK used to build DoneDash |
| **Firestore** | Firebase's NoSQL real-time database |
| **FCM** | Firebase Cloud Messaging — used for push notifications |

---

## 2. Overall Description

### 2.1 Product Perspective

DoneDash operates as a standalone mobile application within a campus ecosystem. It does not integrate with any existing university IT infrastructure in its initial version. The system leverages cloud-based services (Firebase) for scalability and real-time capabilities, and uses Imgbb for cost-effective image hosting.

### 2.2 Product Functions

| Function Area | Description |
|---|---|
| **User Authentication** | Email/password and optional Google sign-in via Firebase Auth |
| **Role Selection** | Users choose to act as Poster, Helper, or both |
| **Job Posting** | Posters create gigs with title, description, category, pay, and deadline |
| **Job Discovery** | Helpers browse, filter, and search available gigs |
| **Job Lifecycle** | Track jobs through Posted → Accepted → In Progress → Completed states |
| **Ratings & Reviews** | Posters rate Helpers after job completion; displayed on Helper profiles |
| **Push Notifications** | FCM-powered alerts for job acceptance, status changes, and reviews |
| **Profile Management** | Users manage bio, profile photo (Imgbb), and public rating |

**Job lifecycle:** `Posted` → `Accepted` → `In Progress` → `Completed`

### 2.3 User Classes

**Poster**
An individual who has tasks they need completed. Posters create job listings, review applicants, accept Helpers, and mark jobs as complete. They are responsible for specifying requirements and paying the agreed amount upon completion.

**Helper**
A student looking to earn supplemental income. Helpers browse available gigs, apply or accept jobs directly (based on job settings), complete the work, and receive payment and ratings afterward.

### 2.4 Operating Environment

| Component | Specification |
|---|---|
| **Mobile OS** | iOS 13+ and Android 8.0 (API Level 26)+ |
| **Framework** | Flutter 3.x with Dart |
| **Backend** | Firebase (Authentication, Cloud Firestore, Cloud Storage, FCM) |
| **Image Hosting** | Imgbb API v1 |
| **Internet** | Requires active internet connection |

### 2.5 Design & Implementation Constraints

- Must run on Android 8 or above
- Must use Flutter framework
- All business logic must be implemented client-side in Flutter or via Firebase Security Rules and Cloud Functions
- Profile images must be uploaded to Imgbb and referenced by URL in Firestore
- Firebase Free Tier (Spark Plan) limitations must be considered during development
- Payment processing is out of scope for v1.0 — payment is handled off-platform between users
- No web application is required in v1.0; mobile-only

### 2.6 Assumptions & Dependencies

- All users are enrolled with a valid email
- The user must have an internet connection to sync data
- Users have access to a smartphone with the app installed
- Firebase services remain available and stable
- Imgbb API quota is sufficient for the expected volume of profile uploads
- Users are responsible for off-platform payment arrangements in v1.0

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### Authentication

| ID | Requirement | Priority |
|---|---|---|
| FR-AUTH-01 | The system shall allow new users to register using an email address and password. The system shall verify email addresses via Firebase confirmation mail. | 🔴 HIGH |
| FR-AUTH-02 | Registered users shall be able to log in using email and password. | 🔴 HIGH |
| FR-AUTH-03 | The system shall provide a 'Forget Password' flow via Firebase email reset. | 🔴 HIGH |
| FR-AUTH-04 | The system shall support persistent sessions so users remain logged in across app restarts. | 🟡 MED |
| FR-AUTH-05 | A user may register as a poster, a helper, or both. | 🟡 MED |

#### Profile

| ID | Requirement | Priority |
|---|---|---|
| FR-PROFILE-01 | Users shall be able to set and update their display name, bio, and profile picture. | 🔴 HIGH |
| FR-PROFILE-02 | Profile pictures shall be uploaded to Imgbb via API; the returned URL shall be stored in Firestore. | 🔴 HIGH |
| FR-PROFILE-03 | Helper profiles shall display star rating (1–5), number of completed jobs, and reviews. | 🔴 HIGH |
| FR-PROFILE-04 | A Helper's public profile shall be viewable by any authenticated user. | 🔴 HIGH |

#### Jobs & Discovery

| ID | Requirement | Priority |
|---|---|---|
| FR-JOB-01 | Posters shall be able to create a new job by filling required fields. | 🔴 HIGH |
| FR-JOB-02 | Posters shall be able to edit or delete job details while the job is not yet accepted by anyone. | 🟡 MED |
| FR-FILTER-01 | User shall be able to filter jobs by category and pay amount. | 🟡 MED |
| FR-SHOW-01 | Job card in the feed shall show: Title, Category Badge, Pay Amount, Poster name, and Time remaining. | 🔴 HIGH |
| FR-SEARCH-01 | A search bar shall allow keyword search across job titles and descriptions. | 🟡 MED |

#### Status & Notifications

| ID | Requirement | Priority |
|---|---|---|
| FR-STATUS-01 | Each status change shall trigger a push notification. | 🟡 MED |
| FR-STATUS-02 | All status changes shall be timestamped and stored in Firestore for audit. | 🟡 MED |

---

### 3.2 Non-Functional Requirements

| ID | Requirement | Type |
|---|---|---|
| NFR-1 | The job feed shall load within 2 seconds on a standard 4G connection. | ⚡ Performance |
| NFR-2 | Push notifications shall be delivered within 5 seconds of the triggering event. | ⚡ Performance |
| NFR-3 | Profile image uploads via Imgbb shall complete within 10 seconds for images under 2MB. | ⚡ Performance |
| NFR-4 | Firestore queries shall complete within 1 second for standard read operations. | ⚡ Performance |
| NFR-5 | The system shall support up to 5,000 concurrent users per campus. | 📈 Scalability |
| NFR-6 | All data in transit shall be encrypted using HTTPS/TLS. | 🔒 Security |
| NFR-7 | Job write access requires authentication and matching user ID. | 🔒 Security |
| NFR-8 | Error messages shall be user-friendly and actionable. | 🎨 Usability |
| NFR-9 | The app shall support both light and dark mode. | 🎨 Usability |

---

### 3.3 External Interface Requirements

#### 3.3.1 Firebase Authentication API

- **Used for:** Email/password sign-in, user session management, email verification, password reset
- **SDK:** `firebase_auth` Flutter plugin
- **Error handling:** All Firebase Auth exceptions shall be caught and presented as user-friendly messages

#### 3.3.2 Cloud Firestore API

- **Used for:** All structured data storage (users, jobs, reviews)
- **SDK:** `cloud_firestore` Flutter plugin
- **Real-time listeners** shall be used for job status updates and feed refresh
- **Pagination** using Firestore cursors shall be implemented for the job feed (page size: 20)

#### 3.3.3 Imgbb Image Upload API

- **Endpoint:** `POST https://api.imgbb.com/1/upload`
- **Authentication:** API Key stored in Flutter app environment variables (not hardcoded)
- **Request:** `multipart/form-data` with image binary and expiration setting
- **Response:** JSON with `data.url` field used as the profile photo URL stored in Firestore
- **Image size limit:** 32MB (Imgbb limit); app shall enforce a 5MB client-side limit

#### 3.3.4 Firebase Cloud Messaging (FCM)

- **Used for:** All push notifications triggered by job lifecycle events
- **Implementation:** Cloud Functions trigger on Firestore document writes and dispatch FCM messages to target device tokens
- **Device tokens** shall be stored in the users collection and refreshed on every app launch

---

## 4. System Models

### 4.1 Use Case Diagram

> See original PDF / Figma design files for full diagram.

**Actors:** Poster · Helper · Firebase FCM

| Actor | Use Cases |
|---|---|
| **Poster** | Register/Login · Post a Job · Track Job Status · Edit/Cancel Job · Mark Complete · Leave Review |
| **Helper** | Register/Login · Browse Job Feed · Filter/Search · Accept a Job · Start/Complete a Job · View Profile |
| **Firebase FCM** | Send Notification (triggered by all lifecycle events) |

### 4.2 Sequence Diagrams

> See original PDF / Figma design files for full diagrams.

**SD-01 — Authentication Flow (Register & Login)**
```
User App → Firebase Auth (Register)
         ← UID Returned
User App → Imgbb (Upload Photo)
         ← Photo URL
User App → Firestore (Save User Doc)
         ← Doc Saved
User App → Firebase Auth (Login)
         ← Auth Token
User App → Firestore (Fetch User Doc)
         ← User Data
User App → Load Home Screen
```

**SD-02 — Job Posting & Discovery Flow**
```
Poster App → Firestore (Fill & Submit Job Form)
           ← Job ID Returned
Helper App ← Firestore (Real-time Job appears in Feed)
Helper App → Firestore (Apply Filter: category / pay)
           ← Filtered Results
Helper App → Firestore (Search Keyword)
           ← Matched Jobs
```

**SD-03 — Job Lifecycle Flow (Accept → Start → Complete)**
```
Helper App  → Firestore (Accept Job)
            → Cloud Functions (status: "Accepted")
Poster App  ← Cloud Functions (Notify)
Helper App  → Firestore (Start Job)
            → Cloud Functions (status: "In Progress")
Poster App  ← Cloud Functions (Notify)
Poster App  → Cloud Functions (Mark Complete)
            → Firestore (status: "Completed")
Helper App  ← Cloud Functions (Notify)
```

**SD-04 — Review & Cancel Flow**
```
Poster App  → Firestore (Submit Rating & Comment)
            → Cloud Functions (Create Review Doc)
            → Cloud Functions (Recalculate Avg Rating)
Helper App  ← Cloud Functions (Notify "New Review")

Poster App  → Firestore (Cancel + Reason)
            → Cloud Functions (status: "Cancelled")
Helper App  ← Cloud Functions (Notify)
```

---

## 5. Project Management

### 5.1 Development Tools

#### Frontend Development
| Tool | Purpose |
|---|---|
| Flutter 3.x | Cross-platform mobile UI framework |
| Dart 3.x | Primary programming language |
| Android Studio | Main IDE for coding, emulation, and debugging |
| VS Code | Lightweight alternative code editor |
| Flutter DevTools | Performance profiling and UI inspection |

#### Backend & Cloud Services
| Tool | Purpose |
|---|---|
| Firebase Authentication | User login and session management |
| Cloud Firestore | Real-time NoSQL database |
| Firebase Cloud Functions | Server-side logic and event triggers |
| Firebase Cloud Messaging (FCM) | Push notifications |
| Firebase Emulator Suite | Local backend testing without live Firebase |

#### Image Handling & State Management
| Tool | Purpose |
|---|---|
| Imgbb API v1 | Profile picture upload and CDN hosting |
| image_picker | Device camera and gallery access |
| Riverpod | App-wide state and reactive UI updates |

#### Version Control, Design & Testing
| Tool | Purpose |
|---|---|
| Git | Source code versioning |
| GitHub | Remote repository and team collaboration |
| Figma | UI/UX wireframing and screen prototyping |
| Material Design 3 | Component and design guidelines |
| Flutter Test | Unit and widget testing |
| Mockito | Dependency mocking |
| Postman | Manual API endpoint testing |

#### Build & Deployment
| Tool | Purpose |
|---|---|
| Google Play Console | Android app release |
| Apple App Store Connect | iOS app release |
| Firebase App Distribution | Internal beta testing |

---

### 5.2 Timeline

**Total Duration: 20 Weeks**

| Phase | Description | Duration |
|---|---|---|
| Phase 1 | Planning & Design | Weeks 1–3 |
| Phase 2 | Environment Setup | Weeks 4–5 |
| Phase 3 | Authentication & Profiles | Weeks 6–8 |
| Phase 4 | Job Posting & Discovery | Weeks 9–11 |
| Phase 5 | Job Lifecycle & Notifications | Weeks 12–14 |
| Phase 6 | Ratings, Reviews & Profiles | Weeks 15–16 |
| Phase 7 | Testing & QA | Weeks 17–18 |
| Phase 8 | Deployment & Launch | Weeks 19–20 |

---

#### Phase 1 — Planning & Design *(Weeks 1–3)*

| Task | Duration |
|---|---|
| Requirements gathering and SRS finalization | 1 Week |
| UI/UX wireframing and prototyping in Figma | 1 Week |
| Database schema design and Firebase setup | 1 Week |

#### Phase 2 — Environment Setup *(Weeks 4–5)*

| Task | Duration |
|---|---|
| Flutter project setup and folder structure | 3 Days |
| Firebase project creation and configuration | 2 Days |
| Imgbb API integration and testing | 2 Days |
| Git repository setup and branching strategy | 1 Day |
| Firebase Security Rules initial configuration | 2 Days |

#### Phase 3 — Authentication & Profiles *(Weeks 6–8)*

| Task | Duration |
|---|---|
| User registration and login screens | 4 Days |
| Firebase Authentication integration | 3 Days |
| Role selection (Poster / Helper / Both) | 2 Days |
| Profile creation and editing screen | 3 Days |
| Imgbb profile picture upload integration | 2 Days |
| User data storage in Firestore | 2 Days |

#### Phase 4 — Job Posting & Discovery *(Weeks 9–11)*

| Task | Duration |
|---|---|
| Post a Job screen with form validation | 3 Days |
| Firestore job document creation | 2 Days |
| Job feed screen for Helpers | 3 Days |
| Real-time Firestore listener for feed updates | 2 Days |
| Filtering by category and pay amount | 3 Days |
| Search functionality | 2 Days |

#### Phase 5 — Job Lifecycle & Notifications *(Weeks 12–14)*

| Task | Duration |
|---|---|
| Job detail screen | 2 Days |
| Accept Job functionality | 2 Days |
| Job status workflow (Posted → Accepted → In Progress → Completed) | 4 Days |
| Cancel job functionality | 2 Days |
| Firebase Cloud Functions for status triggers | 3 Days |
| FCM push notification integration | 2 Days |

#### Phase 6 — Ratings, Reviews & Profiles *(Weeks 15–16)*

| Task | Duration |
|---|---|
| Post-completion review prompt | 2 Days |
| Star rating and comment submission | 2 Days |
| Review storage in Firestore | 1 Day |
| Helper average rating calculation | 2 Days |
| Display reviews on Helper public profile | 3 Days |

#### Phase 7 — Testing & QA *(Weeks 17–18)*

| Task | Duration |
|---|---|
| Unit testing for business logic | 3 Days |
| Widget testing for UI components | 3 Days |
| Integration testing with Firebase Emulator | 2 Days |
| Bug fixing and performance optimization | 2 Days |

#### Phase 8 — Deployment & Launch *(Weeks 19–20)*

| Task | Duration |
|---|---|
| Beta testing via Firebase App Distribution | 3 Days |
| User feedback collection and fixes | 2 Days |
| Google Play Store submission and review | 3 Days |
| Apple App Store submission and review | 3 Days |
| Production launch and monitoring | 1 Day |

---

## 6. Appendix

### 6.1.1 Official Documentation

| Resource | Link | Purpose |
|---|---|---|
| Flutter Documentation | [flutter.dev/docs](https://flutter.dev/docs) | Core framework reference and widget catalog |
| Dart Language Guide | [dart.dev/guides](https://dart.dev/guides) | Dart syntax, async, and OOP concepts |
| Firebase Documentation | [firebase.google.com/docs](https://firebase.google.com/docs) | All Firebase services reference |
| Imgbb API Docs | [api.imgbb.com](https://api.imgbb.com) | Image upload API reference |
| Material Design 3 | [m3.material.io](https://m3.material.io) | UI/UX design guidelines and components |

### 6.1.2 APIs Used

| API | Version | Purpose |
|---|---|---|
| Firebase Authentication API | Latest | User registration, login, and session management |
| Cloud Firestore API | Latest | Real-time NoSQL database for all app data |
| Firebase Cloud Messaging API | Latest | Push notifications to user devices |
| Firebase Cloud Functions API | Latest | Server-side triggers on data changes |
| Imgbb Upload API | v1 | Profile picture upload and CDN hosting |

---

*DoneDash · Campus Micro-Gig Marketplace · SRS v1.0 · Shanto-Mariam University of Creative Technology · March 2026*
