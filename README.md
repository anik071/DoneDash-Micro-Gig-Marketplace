# DoneDash

## Campus Micro-Gig Marketplace

#### Software Requirements Specification (SRS)

**Submitted By,** Abdul Kader Anik | ID : 232071071
Shraban Chakma | ID : 231071035
**Document Version** 1.
**Status** Draft
**Date** March 2026
**Tech Stack** Flutter, Firebase, Imgbb
**Platform** Mobile (iOS & Android)
**Prepared For** Mobile Application Development Project


## 1. Introduction

### 1.1 Purpose

DoneDash is a mobile platform designed to connect university students who need quick, localized
help with other students willing to earn money performing short tasks. The platform targets the
friction-free gig economy within a campus environment, enabling micro-transactions for physical
labor, academic assistance, and delivery tasks.

### 1. 2 Scope

DoneDash will be delivered as a cross-platform mobile application (iOS and Android) built with
Flutter, backend by Firebase for real-time data and authentication, and Imgbb for profile image
hosting. The scope includes:
● Two distinct user roles: Poster and Helper
● Full job lifecycle management from posting to completion
● Real-time notifications and status updates
● Ratings and reviews system for Helpers
● Filtering and discovery of available gigs

### 1.3 Objectives

Main objectives of DoneDash :
● To connect individuals who need quick help with students who want to earn money
● To provide safe, trusted, campus based gig marketplace
● To enable flexible allowance for students without a formal job
● To manage job lifecycle from posting to completion efficiently

### 1.4 Targeted Users

Targeted Users are categorized under two terms :
● Posters : Individuals who needs a job done
● Helpers : Students who wants to earn some extra cash by completing some tasks
DoneDash Campus Micro-Gig MarketplacePage


### 1. 5 Definitions & Acronyms and Abbreviations

**Term Definition**
Poster A student who creates and posts a job on the platform
Helper A student who browses and accepts jobs to earn money
Gig / Job A short-term task posted by a Poster requiring one or more
Helpers
SRS Software Requirements Specification
Firebase Google's Backend-as-a-Service platform used for auth,
database, and storage
Imgbb Third-party image hosting API used for profile pictures
Flutter Google's cross-platform mobile UI SDK used to build DoneDash
Firestore Firebase's NoSQL real-time database
FCM Firebase Cloud Messaging — used for push notifications
DoneDash Campus Micro-Gig MarketplacePage


## 2. Overall Description

### 2.1 Product Perspective

DoneDash operates as a standalone mobile application within a campus ecosystem. It does not
integrate with any existing university IT infrastructure in its initial version. The system leverages
cloud-based services (Firebase) for scalability and real-time capabilities, and uses Imgbb for
cost-effective image hosting.

### 2.2 Product Functions

```
Function Area Description
User Authentication Email/password and optional Google sign-in via Firebase Auth
Role Selection Users choose to act as Poster, Helper, or both
Job Posting Posters create gigs with title, description, category, pay, and
deadline
Job Discovery Helpers browse, filter, and search available gigs
Job Lifecycle Track jobs through Posted → Accepted → In Progress →
Completed states
Ratings & Reviews Posters rate Helpers after job completion; displayed on Helper
profiles
Push Notifications FCM-powered alerts for job acceptance, status changes, and
reviews
Profile Management Users manage bio, profile photo (Imgbb), and public rating
```
### 2.3 User Classes

#### 2.3.1 Poster

An individual who has tasks they need completed. Posters create job listings, review applicants,
accept Helpers, and mark jobs as complete. They are responsible for specifying requirements and
paying the agreed amount upon completion.

#### 2.3.2 Helper

A student looking to earn supplemental income. Helpers browse available gigs, apply or accept jobs
directly (based on job settings), complete the work, and receive payment and ratings afterward.
DoneDash Campus Micro-Gig MarketplacePage


### 2.4 Operating Environment

```
● Mobile OS: iOS 13+ and Android 8.0 (API Level 26)+
● Framework: Flutter 3.x with Dart
● Backend: Firebase (Authentication, Cloud Firestore, Cloud Storage, FCM)
● Image Hosting: Imgbb API v
● Internet: Requires active internet connection
```
### 2.5 Design & Implementation Constraints

```
● Must run on Android 8 or above
● Must use Flutter framework
● All business logic must be implemented client-side in Flutter or via Firebase Security Rules
and Cloud Functions
● Profile images must be uploaded to Imgbb and referenced by URL in Firestore
● Firebase Free Tier (Spark Plan) limitations must be considered during development
● Payment processing is out of scope for v1.0 — payment is handled off-platform between
users
● No web application is required in v1.0; mobile-only
```
### 2.6 Assumptions & Dependencies

● All users are enrolled with a valid email
● The user must have an internet connection to sync data.
● Users have access to a smartphone with the app installed
● Firebase services remain available and stable
● Imgbb API quota is sufficient for the expected volume of profile uploads
● Users are responsible for off-platform payment arrangements in v1.
DoneDash Campus Micro-Gig MarketplacePage


## 3. Specific Requirements

### 3.1 Functional Requirements

```
ID Requirement Description Priority
FR-AUTH-01 The system shall allow new users to register using an email address
and password. The system shall verify email addresses via firebase
confirmation mail
```
##### HIGH

```
FR-AUTH-02 Registered users shall be able to log in using email and password. HIGH
FR-AUTH-03 The system shall provide a ‘Forget Password’ flow via firebase email
reset
```
##### HIGH

```
FR-AUTH-04 The system shall support persistent sessions so users remain logged
in across app restarts
```
##### MEDIUM

```
FR-AUTH-05 A user may register as a poster,a helper or both MEDIUM
FR-PROFILE-01 Users shall be able to set and update their display name, bio, and
profile picture
```
##### HIGH

```
FR-PROFILE-02 Profile pictures shall be uploaded to Imgbb via API; the returned URL
shall be stored in Firestore
```
##### HIGH

```
FR-PROFILE-03 Helper profiles shall display star rating (1-5),number of completed
jobs and reviews
```
##### HIGH

```
FR-PROFILE-04 A Helper's public profile shall be viewable by any authenticated user HIGH
FR-JOB-01 Posters shall be able to create a new job by following some required
fields
```
##### HIGH

```
FR-JOB-02 Posters shall be able to edit or delete job details while the job is not
accepted by anyone
```
##### MEDIUM

```
FR-FILTER-01 User shall be able to filter jobs MEDIUM
FR-SHOW-01 job card in the feed shall show: Title, Category Badge, Pay Amount,
Poster name, and Time remaining
```
##### HIGH

```
FR-SEARCH-01 A search bar shall allow keyword search across job titles and
descriptions
```
##### MEDIUM

DoneDash Campus Micro-Gig MarketplacePage


```
FR-STATUS-01 Each status change shall trigger a push notification MEDIUM
FR-STATUS-02 All status changes shall be timestamped and stored in Firestore for
audit
```
##### MEDIUM

### 3.2 Non-Functional Requirements

**ID Requirement Description Type**
NFR1 The job feed shall load within 2 seconds on a standard 4G
connection
Performance
NFR2 Push notifications shall be delivered within 5 seconds of the
triggering event
Performance
NFR3 Profile image uploads via Imgbb shall complete within 10 seconds
for images under 2MB
Performance
NFR4 Firestore queries shall complete within 1 second for standard read
operations
Performance
NFR5 The system shall support up to 5,000 concurrent users per campus Scalability
NFR6 All data in transit shall be encrypted using HTTPS/TLS Security
NFR7 Job write access requires authentication and matching user ID Security
NFR8 Error messages shall be user-friendly and actionable Usability
NFR9 The app shall support both light and dark mode Usability
DoneDash Campus Micro-Gig MarketplacePage


### 3. 3 External interface requirements

#### 3.3.1 Firebase Authentication API

- Used for: Email/password sign-in, user session management, email verification, password
    reset
- SDK: firebase_auth Flutter plugin
- Error handling: All Firebase Auth exceptions shall be caught and presented as user-friendly
    messages

#### 3.3.2 Cloud Firestore API

- Used for: All structured data storage (users, jobs, reviews)
- SDK: cloud_firestore Flutter plugin
- Real-time listeners shall be used for job status updates and feed refresh
- Pagination using Firestore cursors shall be implemented for the job feed (page size: 20)

#### 3.3.3 Imgbb Image Upload API

- Endpoint: POST https://api.imgbb.com/1/upload
- Authentication: API Key stored in Flutter app environment variables (not hardcoded)
- Request: multipart/form-data with image binary and expiration setting
- Response: JSON with 'data.url' field used as the profile photo URL stored in Firestore
- Image size limit: 32MB (Imgbb limit); app shall enforce a 5MB client-side limit

#### 3.3.4 Firebase Cloud Messaging (FCM)

- Used for: All push notifications triggered by job lifecycle events
- Implementation: Cloud Functions trigger on Firestore document writes and dispatch FCM
    messages to target device tokens
- Device tokens shall be stored in the users collection and refreshed on every app launch
DoneDash Campus Micro-Gig MarketplacePage


## 4. System Models

### 4.1 Use Case Diagram

DoneDash Campus Micro-Gig MarketplacePage


### 4.2 Sequence Diagram

#### SD-01: Authentication Flow (Register & Login)

DoneDash Campus Micro-Gig MarketplacePage


#### SD-02: Job Posting & Discovery Flow

DoneDash Campus Micro-Gig MarketplacePage


#### SD-03: Job Lifecycle Flow (Accept → Start → Complete)

DoneDash Campus Micro-Gig MarketplacePage


#### SD-04: Review & Cancel Flow

DoneDash Campus Micro-Gig MarketplacePage


## 5. Project Management

### 5.1 Development Tools

#### 5.1.1 Frontend Development

```
● Flutter 3.x — cross-platform mobile UI framework
● Dart 3.x — primary programming language
● Android Studio — main IDE for coding, emulation, and debugging
● VS Code — lightweight alternative code editor
● Flutter DevTools — performance profiling and UI inspection
```
#### 5.1.2 Backend & Cloud Services

```
● Firebase Authentication — user login and session management
● Cloud Firestore — real-time NoSQL database
● Firebase Cloud Functions — server-side logic and event triggers
● Firebase Cloud Messaging (FCM) — push notifications
● Firebase Emulator Suite — local backend testing without live Firebase
```
#### 5.1.3 Image Handling

```
● Imgbb API v1 — profile picture upload and CDN hosting
● image_picker — device camera and gallery access
```
#### 5.1.4 State Management

```
● Riverpod — app-wide state and reactive UI updates
```
#### 5.1.5 Version Control & Collaboration

```
● Git — source code versioning
● GitHub — remote repository and team collaboration
```
#### 5.1.6 Design & Prototyping

```
● Figma — UI/UX wireframing and screen prototyping
● Material Design 3 — component and design guidelines
```
#### 5.1.7 Testing

● Flutter Test — unit and widget testing
● Mockito — dependency mocking
● Postman — manual API endpoint testing
DoneDash Campus Micro-Gig MarketplacePage


#### 5.1.8 Build & Deployment

```
● Google Play Console — Android app release
● Apple App Store Connect — iOS app release
● Firebase App Distribution — internal beta testing
```
### 5.2 Timeline

```
Phase Description Duration
Phase 1 Planning & Design Weeks 1–
Phase 2 Environment Setup Weeks 4–
Phase 3 Authentication & Profiles Weeks 6–
Phase 4 Job Posting & Discovery Weeks 9–
Phase 5 Job Lifecycle & Notifications Weeks 12–
Phase 6 Ratings, Reviews & Profiles Weeks 15–
Phase 7 Testing & QA Weeks 17–
Phase 8 Deployment & Launch Weeks 19–
Total 20 Weeks
```
#### 5.2.1 Extended Timeline

**_Phase 1: Planning & Design_** _Duration:_ **_Weeks 1–3 (3 Weeks)_**
**Task Duration**
Requirements gathering and SRS finalization 1 Week
UI/UX wireframing and prototyping in Figma 1 Week
Database schema design and Firebase setup 1 Week
DoneDash Campus Micro-Gig MarketplacePage


**_Phase 2: Environment Setup_** _Duration:_ **_Weeks 4–5 (2 Weeks)_**
**Task Duration**
Flutter project setup and folder structure 3 Days
Firebase project creation and configuration 2 Days
Imgbb API integration and testing 2 Days
Git repository setup and branching strategy 1 Day
Firebase Security Rules initial configuration 2 Days
**_Phase 3: Core Development — Authentication & Profiles_** _Duration:_ **_Weeks 6–8 (3 Weeks)_**
**Task Duration**
User registration and login screens 4 Days
Firebase Authentication integration 3 Days
Role selection (Poster / Helper / Both) 2 Days
Profile creation and editing screen 3 Days
Imgbb profile picture upload integration 2 Days
User data storage in Firestore 2 Days
**_Phase 4: Core Development — Job Posting & Discovery_** _Duration:_ **_Weeks 9–11 (3 Weeks)_**
**Task Duration**
Post a Job screen with form validation 3 Days
Firestore job document creation 2 Days
Job feed screen for Helpers 3 Days
Real-time Firestore listener for feed updates 2 Days
Filtering by category and pay amount 3 Days
Search functionality 2 Days
**_Phase 5: Core Development — Job Lifecycle & Notifications_** _Duration:_ **_Weeks 12–14 (3 Weeks)_**
DoneDash Campus Micro-Gig MarketplacePage


**Task Duration**
Job detail screen 2 Days
Accept Job functionality 2 Days
Job status workflow (Posted → Accepted → In Progress
→ Completed)
4 Days
Cancel job functionality 2 Days
Firebase Cloud Functions for status triggers 3 Days
FCM push notification integration 2 Days
**_Phase 6: Ratings, Reviews & Profiles_** _Duration:_ **_Weeks 15–16 (2 Weeks)_**
**Task Duration**
Post-completion review prompt 2 Days
Star rating and comment submission 2 Days
Review storage in Firestore 1 Day
Helper average rating calculation 2 Days
Display reviews on Helper public profile 3 Days
**_Phase 7: Testing & Quality Assurance_** _Duration:_ **_Weeks 17–18 (2 Weeks)_**
**Task Duration**
Unit testing for business logic 3 Days
Widget testing for UI components 3 Days
Integration testing with Firebase Emulator 2 Days
Bug fixing and performance optimization 2 Days
DoneDash Campus Micro-Gig MarketplacePage


**_Phase 8: Deployment & Launch_** _Duration:_ **_Weeks 19–20 (2 Weeks)_**
**Task Duration**
Beta testing via Firebase App Distribution 3 Days
User feedback collection and fixes 2 Days
Google Play Store submission and review 3 Days
Apple App Store submission and review 3 Days
Production launch and monitoring 1 Day
DoneDash Campus Micro-Gig MarketplacePage


## 6. Appendix

### 6 .1 References

#### 6.1.1 Official Documentation

```
Resource Link Purpose
Flutter Documentation flutter.dev/docs Core framework reference and widget
catalog
Dart Language Guide dart.dev/guides Dart syntax, async, and OOP concepts
Firebase
Documentation
firebase.google.com/docs All Firebase services reference
Imgbb API Docs api.imgbb.com Image upload API reference
Material Design 3 m3.material.io UI/UX design guidelines and
components
```
#### 6.1.2 APIs Used

**API Version Purpose**
Firebase Authentication API Latest User^ registration,^ login,^ and^ session^ management^
Cloud Firestore API Latest Real-time NoSQL database for all app data
Firebase Cloud Messaging
API
Latest Push notifications to user devices
Firebase Cloud Functions API Latest Server-side triggers on data changes
Imgbb Upload API v1 Profile picture upload and CDN hosting
DoneDash Campus Micro-Gig MarketplacePage


