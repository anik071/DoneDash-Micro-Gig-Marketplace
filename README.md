<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>DoneDash – Software Requirements Specification</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
  <style>
    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --surface2: #1c2230;
      --border: #30363d;
      --accent: #3b82f6;
      --accent2: #60a5fa;
      --accent3: #93c5fd;
      --text: #e6edf3;
      --muted: #8b949e;
      --high: #f0883e;
      --medium: #d29922;
      --low: #3fb950;
      --tag-bg: #1f3a5f;
      --mono: 'Space Mono', monospace;
      --sans: 'DM Sans', sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--sans);
      font-size: 15px;
      line-height: 1.7;
      max-width: 960px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    }

    /* ── Header ── */
    .header {
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--surface);
      padding: 40px 40px 32px;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 220px; height: 220px;
      background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
      pointer-events: none;
    }
    .header-top {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      flex-wrap: wrap;
    }
    .logo-badge {
      background: var(--accent);
      color: #fff;
      font-family: var(--mono);
      font-size: 28px;
      font-weight: 700;
      padding: 10px 22px;
      border-radius: 8px;
      letter-spacing: -1px;
      flex-shrink: 0;
    }
    .logo-badge span { color: #bfdbfe; }
    .header-meta { flex: 1; }
    .header-meta h1 {
      font-family: var(--mono);
      font-size: 13px;
      color: var(--accent3);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .header-meta p {
      color: var(--muted);
      font-size: 14px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--border);
    }
    .meta-item { display: flex; flex-direction: column; gap: 2px; }
    .meta-label {
      font-family: var(--mono);
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--muted);
    }
    .meta-value {
      font-size: 13px;
      color: var(--accent3);
      font-weight: 500;
    }

    /* ── ToC ── */
    .toc {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      border-radius: 8px;
      padding: 24px 28px;
      margin-bottom: 40px;
    }
    .toc h2 {
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--accent2);
      margin-bottom: 14px;
    }
    .toc ol { padding-left: 18px; }
    .toc li { margin: 4px 0; }
    .toc a { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .2s; }
    .toc a:hover { color: var(--accent2); }
    .toc ol ol { margin-top: 4px; }
    .toc ol ol li a { font-size: 13px; }

    /* ── Sections ── */
    .section {
      margin-bottom: 48px;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .section-num {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--accent);
      background: rgba(59,130,246,0.1);
      border: 1px solid rgba(59,130,246,0.3);
      padding: 3px 10px;
      border-radius: 4px;
      letter-spacing: 1px;
      white-space: nowrap;
    }
    h2.section-title {
      font-family: var(--mono);
      font-size: 18px;
      font-weight: 700;
      color: var(--text);
    }
    h3 {
      font-family: var(--mono);
      font-size: 13px;
      color: var(--accent2);
      margin: 24px 0 10px;
      letter-spacing: 0.5px;
    }
    p { color: #c9d1d9; margin-bottom: 12px; }

    /* ── Cards / Subsections ── */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px 22px;
      margin-bottom: 16px;
    }
    .card-title {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--accent2);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .card p { margin: 0; color: var(--muted); font-size: 14px; }

    /* ── Definition Table / Glossary ── */
    .def-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 14px;
    }
    .def-table thead tr {
      background: var(--surface2);
      border-bottom: 1px solid var(--accent);
    }
    .def-table th {
      padding: 10px 14px;
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--accent3);
      text-align: left;
    }
    .def-table td {
      padding: 9px 14px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
      color: #c9d1d9;
    }
    .def-table tr:last-child td { border-bottom: none; }
    .def-table tr:hover td { background: rgba(59,130,246,0.04); }
    .def-table td:first-child {
      font-family: var(--mono);
      font-size: 13px;
      color: var(--accent2);
      white-space: nowrap;
    }

    /* ── Functional Requirements ── */
    .req-row {
      display: grid;
      grid-template-columns: 130px 1fr 80px;
      gap: 0;
      border: 1px solid var(--border);
      border-radius: 6px;
      margin-bottom: 8px;
      overflow: hidden;
      font-size: 14px;
    }
    .req-id {
      background: var(--surface2);
      padding: 10px 12px;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--accent2);
      border-right: 1px solid var(--border);
      display: flex;
      align-items: center;
    }
    .req-desc {
      padding: 10px 14px;
      color: #c9d1d9;
    }
    .req-priority {
      padding: 10px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid var(--border);
    }
    .badge {
      font-family: var(--mono);
      font-size: 10px;
      letter-spacing: 1px;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 700;
    }
    .badge-high { background: rgba(240,136,62,0.15); color: var(--high); border: 1px solid rgba(240,136,62,0.4); }
    .badge-medium { background: rgba(210,153,34,0.15); color: var(--medium); border: 1px solid rgba(210,153,34,0.4); }
    .badge-low { background: rgba(63,185,80,0.15); color: var(--low); border: 1px solid rgba(63,185,80,0.4); }
    .badge-perf { background: rgba(96,165,250,0.12); color: var(--accent2); border: 1px solid rgba(96,165,250,0.3); }
    .badge-sec { background: rgba(240,136,62,0.12); color: var(--high); border: 1px solid rgba(240,136,62,0.3); }
    .badge-use { background: rgba(63,185,80,0.12); color: var(--low); border: 1px solid rgba(63,185,80,0.3); }
    .badge-scale { background: rgba(167,139,250,0.12); color: #a78bfa; border: 1px solid rgba(167,139,250,0.3); }

    /* ── NFR rows ── */
    .nfr-row {
      grid-template-columns: 60px 1fr 100px;
    }

    /* ── Timeline ── */
    .timeline { position: relative; padding-left: 32px; }
    .timeline::before {
      content: '';
      position: absolute;
      left: 10px; top: 0; bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, var(--accent), transparent);
    }
    .phase {
      position: relative;
      margin-bottom: 28px;
    }
    .phase::before {
      content: '';
      position: absolute;
      left: -26px; top: 14px;
      width: 10px; height: 10px;
      border-radius: 50%;
      background: var(--accent);
      border: 2px solid var(--bg);
      box-shadow: 0 0 0 2px var(--accent);
    }
    .phase-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .phase-name {
      font-family: var(--mono);
      font-size: 13px;
      color: var(--text);
      font-weight: 700;
    }
    .phase-duration {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--muted);
      background: var(--surface2);
      padding: 2px 8px;
      border-radius: 4px;
    }
    .task-list { display: flex; flex-direction: column; gap: 4px; }
    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 5px;
      padding: 7px 12px;
      font-size: 13px;
    }
    .task-item span:first-child { color: #c9d1d9; }
    .task-dur {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--accent3);
      white-space: nowrap;
      margin-left: 16px;
    }

    /* ── Interface blocks ── */
    .interface-block {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      border-radius: 6px;
      padding: 16px 20px;
      margin-bottom: 14px;
    }
    .interface-block h4 {
      font-family: var(--mono);
      font-size: 13px;
      color: var(--accent2);
      margin-bottom: 10px;
    }
    .interface-block ul { padding-left: 18px; }
    .interface-block li { color: var(--muted); font-size: 13px; margin: 4px 0; }
    .interface-block li strong { color: #c9d1d9; }
    code {
      font-family: var(--mono);
      font-size: 12px;
      background: rgba(59,130,246,0.1);
      color: var(--accent3);
      padding: 1px 6px;
      border-radius: 3px;
    }

    /* ── Tools grid ── */
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 10px;
      margin-bottom: 20px;
    }
    .tool-chip {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 13px;
      color: #c9d1d9;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tool-chip::before {
      content: '▸';
      color: var(--accent);
      font-size: 11px;
      flex-shrink: 0;
    }

    /* ── Refs table ── */
    .refs-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      margin-bottom: 20px;
    }
    .refs-table th {
      background: var(--surface2);
      padding: 9px 12px;
      font-family: var(--mono);
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--accent3);
      text-align: left;
      border-bottom: 1px solid var(--accent);
    }
    .refs-table td {
      padding: 8px 12px;
      border-bottom: 1px solid var(--border);
      color: var(--muted);
      vertical-align: top;
    }
    .refs-table tr:hover td { background: rgba(59,130,246,0.04); }
    .refs-table td:first-child { font-weight: 600; color: #c9d1d9; }
    .refs-table a { color: var(--accent2); text-decoration: none; }
    .refs-table a:hover { text-decoration: underline; }

    /* ── Diagrams placeholder ── */
    .diagram-note {
      background: var(--surface2);
      border: 1px dashed var(--border);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      color: var(--muted);
      font-size: 13px;
      font-family: var(--mono);
      margin: 16px 0;
    }

    /* ── Objectives list ── */
    .obj-list { list-style: none; padding: 0; }
    .obj-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid var(--border);
      color: #c9d1d9;
      font-size: 14px;
    }
    .obj-list li:last-child { border-bottom: none; }
    .obj-list li::before {
      content: '◆';
      color: var(--accent);
      font-size: 10px;
      flex-shrink: 0;
      margin-top: 5px;
    }

    /* ── Lifecycle flow ── */
    .lifecycle {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      margin: 16px 0;
    }
    .lc-step {
      background: var(--surface2);
      border: 1px solid var(--border);
      padding: 6px 14px;
      border-radius: 20px;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--accent2);
    }
    .lc-arrow { color: var(--muted); font-size: 14px; }

    /* ── Function area table ── */
    .fn-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .fn-table th {
      background: var(--surface2);
      padding: 10px 14px;
      font-family: var(--mono);
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--accent3);
      text-align: left;
      border-bottom: 1px solid var(--accent);
    }
    .fn-table td {
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      color: #c9d1d9;
      vertical-align: top;
    }
    .fn-table tr:hover td { background: rgba(59,130,246,0.04); }
    .fn-table td:first-child {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--accent2);
      white-space: nowrap;
    }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  </style>
</head>
<body>

<!-- ─────────────── HEADER ─────────────── -->
<div class="header">
  <div class="header-top">
    <div class="logo-badge">Done<span>Dash</span></div>
    <div class="header-meta">
      <h1>Software Requirements Specification</h1>
      <p>Campus Micro-Gig Marketplace &nbsp;·&nbsp; Shanto-Mariam University of Creative Technology</p>
    </div>
  </div>
  <div class="meta-grid">
    <div class="meta-item"><span class="meta-label">Authors</span><span class="meta-value">Abdul Kader Anik · Shraban Chakma</span></div>
    <div class="meta-item"><span class="meta-label">Version</span><span class="meta-value">1.0 — Draft</span></div>
    <div class="meta-item"><span class="meta-label">Date</span><span class="meta-value">March 2026</span></div>
    <div class="meta-item"><span class="meta-label">Tech Stack</span><span class="meta-value">Flutter · Firebase · Imgbb</span></div>
    <div class="meta-item"><span class="meta-label">Platform</span><span class="meta-value">iOS &amp; Android</span></div>
    <div class="meta-item"><span class="meta-label">Student IDs</span><span class="meta-value">232071071 · 231071035</span></div>
  </div>
</div>

<!-- ─────────────── TABLE OF CONTENTS ─────────────── -->
<div class="toc">
  <h2>Table of Contents</h2>
  <ol>
    <li><a href="#s1">Introduction</a>
      <ol>
        <li><a href="#s1-1">Purpose</a></li>
        <li><a href="#s1-2">Scope</a></li>
        <li><a href="#s1-3">Objectives</a></li>
        <li><a href="#s1-4">Targeted Users</a></li>
        <li><a href="#s1-5">Definitions &amp; Acronyms</a></li>
      </ol>
    </li>
    <li><a href="#s2">Overall Description</a>
      <ol>
        <li><a href="#s2-1">Product Perspective</a></li>
        <li><a href="#s2-2">Product Functions</a></li>
        <li><a href="#s2-3">User Classes</a></li>
        <li><a href="#s2-4">Operating Environment</a></li>
        <li><a href="#s2-5">Design &amp; Implementation Constraints</a></li>
        <li><a href="#s2-6">Assumptions &amp; Dependencies</a></li>
      </ol>
    </li>
    <li><a href="#s3">Specific Requirements</a>
      <ol>
        <li><a href="#s3-1">Functional Requirements</a></li>
        <li><a href="#s3-2">Non-Functional Requirements</a></li>
        <li><a href="#s3-3">External Interface Requirements</a></li>
      </ol>
    </li>
    <li><a href="#s4">System Models</a></li>
    <li><a href="#s5">Project Management</a>
      <ol>
        <li><a href="#s5-1">Development Tools</a></li>
        <li><a href="#s5-2">Timeline</a></li>
      </ol>
    </li>
    <li><a href="#s6">Appendix</a></li>
  </ol>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- SECTION 1 -->
<!-- ═══════════════════════════════════════ -->
<div class="section" id="s1">
  <div class="section-header">
    <span class="section-num">01</span>
    <h2 class="section-title">Introduction</h2>
  </div>

  <h3 id="s1-1">1.1 Purpose</h3>
  <p>DoneDash is a mobile platform designed to connect university students who need quick, localized help with other students willing to earn money performing short tasks. The platform targets the friction-free gig economy within a campus environment, enabling micro-transactions for physical labor, academic assistance, and delivery tasks.</p>

  <h3 id="s1-2">1.2 Scope</h3>
  <p>DoneDash will be delivered as a cross-platform mobile application (iOS and Android) built with Flutter, backend by Firebase for real-time data and authentication, and Imgbb for profile image hosting.</p>
  <div class="tools-grid">
    <div class="tool-chip">Two distinct user roles</div>
    <div class="tool-chip">Full job lifecycle management</div>
    <div class="tool-chip">Real-time notifications</div>
    <div class="tool-chip">Ratings &amp; reviews system</div>
    <div class="tool-chip">Filtering &amp; discovery</div>
    <div class="tool-chip">Status updates</div>
  </div>

  <h3 id="s1-3">1.3 Objectives</h3>
  <ul class="obj-list">
    <li>Connect individuals who need quick help with students who want to earn money</li>
    <li>Provide a safe, trusted, campus-based gig marketplace</li>
    <li>Enable flexible allowance for students without a formal job</li>
    <li>Manage job lifecycle from posting to completion efficiently</li>
  </ul>

  <h3 id="s1-4">1.4 Targeted Users</h3>
  <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
    <div class="card">
      <div class="card-title">📋 Posters</div>
      <p>Individuals who need a job done. They create listings, review applicants, accept helpers, and mark jobs complete.</p>
    </div>
    <div class="card">
      <div class="card-title">🤝 Helpers</div>
      <p>Students who want to earn extra cash. They browse gigs, accept jobs, complete work, and receive payment and ratings.</p>
    </div>
  </div>

  <h3 id="s1-5">1.5 Definitions &amp; Acronyms</h3>
  <table class="def-table">
    <thead><tr><th>Term</th><th>Definition</th></tr></thead>
    <tbody>
      <tr><td>Poster</td><td>A student who creates and posts a job on the platform</td></tr>
      <tr><td>Helper</td><td>A student who browses and accepts jobs to earn money</td></tr>
      <tr><td>Gig / Job</td><td>A short-term task posted by a Poster requiring one or more Helpers</td></tr>
      <tr><td>SRS</td><td>Software Requirements Specification</td></tr>
      <tr><td>Firebase</td><td>Google's Backend-as-a-Service platform used for auth, database, and storage</td></tr>
      <tr><td>Imgbb</td><td>Third-party image hosting API used for profile pictures</td></tr>
      <tr><td>Flutter</td><td>Google's cross-platform mobile UI SDK used to build DoneDash</td></tr>
      <tr><td>Firestore</td><td>Firebase's NoSQL real-time database</td></tr>
      <tr><td>FCM</td><td>Firebase Cloud Messaging — used for push notifications</td></tr>
    </tbody>
  </table>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- SECTION 2 -->
<!-- ═══════════════════════════════════════ -->
<div class="section" id="s2">
  <div class="section-header">
    <span class="section-num">02</span>
    <h2 class="section-title">Overall Description</h2>
  </div>

  <h3 id="s2-1">2.1 Product Perspective</h3>
  <p>DoneDash operates as a standalone mobile application within a campus ecosystem. It does not integrate with any existing university IT infrastructure in its initial version. The system leverages cloud-based services (Firebase) for scalability and real-time capabilities, and uses Imgbb for cost-effective image hosting.</p>

  <h3 id="s2-2">2.2 Product Functions</h3>
  <table class="fn-table">
    <thead><tr><th>Function Area</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td>User Authentication</td><td>Email/password and optional Google sign-in via Firebase Auth</td></tr>
      <tr><td>Role Selection</td><td>Users choose to act as Poster, Helper, or both</td></tr>
      <tr><td>Job Posting</td><td>Posters create gigs with title, description, category, pay, and deadline</td></tr>
      <tr><td>Job Discovery</td><td>Helpers browse, filter, and search available gigs</td></tr>
      <tr><td>Job Lifecycle</td><td>Track jobs through Posted → Accepted → In Progress → Completed states</td></tr>
      <tr><td>Ratings &amp; Reviews</td><td>Posters rate Helpers after job completion; displayed on Helper profiles</td></tr>
      <tr><td>Push Notifications</td><td>FCM-powered alerts for job acceptance, status changes, and reviews</td></tr>
      <tr><td>Profile Management</td><td>Users manage bio, profile photo (Imgbb), and public rating</td></tr>
    </tbody>
  </table>

  <p>Job lifecycle states:</p>
  <div class="lifecycle">
    <span class="lc-step">Posted</span>
    <span class="lc-arrow">→</span>
    <span class="lc-step">Accepted</span>
    <span class="lc-arrow">→</span>
    <span class="lc-step">In Progress</span>
    <span class="lc-arrow">→</span>
    <span class="lc-step">Completed</span>
  </div>

  <h3 id="s2-3">2.3 User Classes</h3>
  <div class="card">
    <div class="card-title">Poster</div>
    <p>An individual who has tasks they need completed. Posters create job listings, review applicants, accept Helpers, and mark jobs as complete. They are responsible for specifying requirements and paying the agreed amount upon completion.</p>
  </div>
  <div class="card">
    <div class="card-title">Helper</div>
    <p>A student looking to earn supplemental income. Helpers browse available gigs, apply or accept jobs directly (based on job settings), complete the work, and receive payment and ratings afterward.</p>
  </div>

  <h3 id="s2-4">2.4 Operating Environment</h3>
  <table class="def-table">
    <thead><tr><th>Component</th><th>Specification</th></tr></thead>
    <tbody>
      <tr><td>Mobile OS</td><td>iOS 13+ and Android 8.0 (API Level 26)+</td></tr>
      <tr><td>Framework</td><td>Flutter 3.x with Dart</td></tr>
      <tr><td>Backend</td><td>Firebase (Authentication, Cloud Firestore, Cloud Storage, FCM)</td></tr>
      <tr><td>Image Hosting</td><td>Imgbb API v1</td></tr>
      <tr><td>Internet</td><td>Requires active internet connection</td></tr>
    </tbody>
  </table>

  <h3 id="s2-5">2.5 Design &amp; Implementation Constraints</h3>
  <ul class="obj-list">
    <li>Must run on Android 8 or above</li>
    <li>Must use Flutter framework</li>
    <li>All business logic must be implemented client-side in Flutter or via Firebase Security Rules and Cloud Functions</li>
    <li>Profile images must be uploaded to Imgbb and referenced by URL in Firestore</li>
    <li>Firebase Free Tier (Spark Plan) limitations must be considered during development</li>
    <li>Payment processing is out of scope for v1.0 — payment is handled off-platform between users</li>
    <li>No web application is required in v1.0; mobile-only</li>
  </ul>

  <h3 id="s2-6">2.6 Assumptions &amp; Dependencies</h3>
  <ul class="obj-list">
    <li>All users are enrolled with a valid email</li>
    <li>The user must have an internet connection to sync data</li>
    <li>Users have access to a smartphone with the app installed</li>
    <li>Firebase services remain available and stable</li>
    <li>Imgbb API quota is sufficient for the expected volume of profile uploads</li>
    <li>Users are responsible for off-platform payment arrangements in v1.0</li>
  </ul>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- SECTION 3 -->
<!-- ═══════════════════════════════════════ -->
<div class="section" id="s3">
  <div class="section-header">
    <span class="section-num">03</span>
    <h2 class="section-title">Specific Requirements</h2>
  </div>

  <h3 id="s3-1">3.1 Functional Requirements</h3>

  <!-- AUTH -->
  <h3 style="color:var(--muted);font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Authentication</h3>
  <div class="req-row"><div class="req-id">FR-AUTH-01</div><div class="req-desc">The system shall allow new users to register using an email address and password. The system shall verify email addresses via Firebase confirmation mail.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>
  <div class="req-row"><div class="req-id">FR-AUTH-02</div><div class="req-desc">Registered users shall be able to log in using email and password.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>
  <div class="req-row"><div class="req-id">FR-AUTH-03</div><div class="req-desc">The system shall provide a 'Forget Password' flow via Firebase email reset.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>
  <div class="req-row"><div class="req-id">FR-AUTH-04</div><div class="req-desc">The system shall support persistent sessions so users remain logged in across app restarts.</div><div class="req-priority"><span class="badge badge-medium">MED</span></div></div>
  <div class="req-row"><div class="req-id">FR-AUTH-05</div><div class="req-desc">A user may register as a poster, a helper, or both.</div><div class="req-priority"><span class="badge badge-medium">MED</span></div></div>

  <!-- PROFILE -->
  <h3 style="color:var(--muted);font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:20px 0 8px;">Profile</h3>
  <div class="req-row"><div class="req-id">FR-PROFILE-01</div><div class="req-desc">Users shall be able to set and update their display name, bio, and profile picture.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>
  <div class="req-row"><div class="req-id">FR-PROFILE-02</div><div class="req-desc">Profile pictures shall be uploaded to Imgbb via API; the returned URL shall be stored in Firestore.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>
  <div class="req-row"><div class="req-id">FR-PROFILE-03</div><div class="req-desc">Helper profiles shall display star rating (1–5), number of completed jobs, and reviews.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>
  <div class="req-row"><div class="req-id">FR-PROFILE-04</div><div class="req-desc">A Helper's public profile shall be viewable by any authenticated user.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>

  <!-- JOBS -->
  <h3 style="color:var(--muted);font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:20px 0 8px;">Jobs &amp; Discovery</h3>
  <div class="req-row"><div class="req-id">FR-JOB-01</div><div class="req-desc">Posters shall be able to create a new job by filling required fields.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>
  <div class="req-row"><div class="req-id">FR-JOB-02</div><div class="req-desc">Posters shall be able to edit or delete job details while the job is not yet accepted by anyone.</div><div class="req-priority"><span class="badge badge-medium">MED</span></div></div>
  <div class="req-row"><div class="req-id">FR-FILTER-01</div><div class="req-desc">User shall be able to filter jobs by category and pay amount.</div><div class="req-priority"><span class="badge badge-medium">MED</span></div></div>
  <div class="req-row"><div class="req-id">FR-SHOW-01</div><div class="req-desc">Job card in the feed shall show: Title, Category Badge, Pay Amount, Poster name, and Time remaining.</div><div class="req-priority"><span class="badge badge-high">HIGH</span></div></div>
  <div class="req-row"><div class="req-id">FR-SEARCH-01</div><div class="req-desc">A search bar shall allow keyword search across job titles and descriptions.</div><div class="req-priority"><span class="badge badge-medium">MED</span></div></div>

  <!-- STATUS -->
  <h3 style="color:var(--muted);font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:20px 0 8px;">Status &amp; Notifications</h3>
  <div class="req-row"><div class="req-id">FR-STATUS-01</div><div class="req-desc">Each status change shall trigger a push notification.</div><div class="req-priority"><span class="badge badge-medium">MED</span></div></div>
  <div class="req-row"><div class="req-id">FR-STATUS-02</div><div class="req-desc">All status changes shall be timestamped and stored in Firestore for audit.</div><div class="req-priority"><span class="badge badge-medium">MED</span></div></div>

  <!-- NFR -->
  <h3 id="s3-2" style="margin-top:32px;">3.2 Non-Functional Requirements</h3>
  <div class="req-row nfr-row"><div class="req-id">NFR-1</div><div class="req-desc">The job feed shall load within 2 seconds on a standard 4G connection.</div><div class="req-priority"><span class="badge badge-perf">PERF</span></div></div>
  <div class="req-row nfr-row"><div class="req-id">NFR-2</div><div class="req-desc">Push notifications shall be delivered within 5 seconds of the triggering event.</div><div class="req-priority"><span class="badge badge-perf">PERF</span></div></div>
  <div class="req-row nfr-row"><div class="req-id">NFR-3</div><div class="req-desc">Profile image uploads via Imgbb shall complete within 10 seconds for images under 2MB.</div><div class="req-priority"><span class="badge badge-perf">PERF</span></div></div>
  <div class="req-row nfr-row"><div class="req-id">NFR-4</div><div class="req-desc">Firestore queries shall complete within 1 second for standard read operations.</div><div class="req-priority"><span class="badge badge-perf">PERF</span></div></div>
  <div class="req-row nfr-row"><div class="req-id">NFR-5</div><div class="req-desc">The system shall support up to 5,000 concurrent users per campus.</div><div class="req-priority"><span class="badge badge-scale">SCALE</span></div></div>
  <div class="req-row nfr-row"><div class="req-id">NFR-6</div><div class="req-desc">All data in transit shall be encrypted using HTTPS/TLS.</div><div class="req-priority"><span class="badge badge-sec">SEC</span></div></div>
  <div class="req-row nfr-row"><div class="req-id">NFR-7</div><div class="req-desc">Job write access requires authentication and matching user ID.</div><div class="req-priority"><span class="badge badge-sec">SEC</span></div></div>
  <div class="req-row nfr-row"><div class="req-id">NFR-8</div><div class="req-desc">Error messages shall be user-friendly and actionable.</div><div class="req-priority"><span class="badge badge-use">UX</span></div></div>
  <div class="req-row nfr-row"><div class="req-id">NFR-9</div><div class="req-desc">The app shall support both light and dark mode.</div><div class="req-priority"><span class="badge badge-use">UX</span></div></div>

  <!-- External Interfaces -->
  <h3 id="s3-3" style="margin-top:32px;">3.3 External Interface Requirements</h3>

  <div class="interface-block">
    <h4>3.3.1 Firebase Authentication API</h4>
    <ul>
      <li><strong>Used for:</strong> Email/password sign-in, user session management, email verification, password reset</li>
      <li><strong>SDK:</strong> <code>firebase_auth</code> Flutter plugin</li>
      <li><strong>Error handling:</strong> All Firebase Auth exceptions shall be caught and presented as user-friendly messages</li>
    </ul>
  </div>

  <div class="interface-block">
    <h4>3.3.2 Cloud Firestore API</h4>
    <ul>
      <li><strong>Used for:</strong> All structured data storage (users, jobs, reviews)</li>
      <li><strong>SDK:</strong> <code>cloud_firestore</code> Flutter plugin</li>
      <li><strong>Real-time listeners</strong> shall be used for job status updates and feed refresh</li>
      <li><strong>Pagination</strong> using Firestore cursors shall be implemented for the job feed (page size: 20)</li>
    </ul>
  </div>

  <div class="interface-block">
    <h4>3.3.3 Imgbb Image Upload API</h4>
    <ul>
      <li><strong>Endpoint:</strong> <code>POST https://api.imgbb.com/1/upload</code></li>
      <li><strong>Authentication:</strong> API Key stored in Flutter app environment variables (not hardcoded)</li>
      <li><strong>Request:</strong> multipart/form-data with image binary and expiration setting</li>
      <li><strong>Response:</strong> JSON with <code>data.url</code> field used as the profile photo URL stored in Firestore</li>
      <li><strong>Image size limit:</strong> 32MB (Imgbb limit); app shall enforce a 5MB client-side limit</li>
    </ul>
  </div>

  <div class="interface-block">
    <h4>3.3.4 Firebase Cloud Messaging (FCM)</h4>
    <ul>
      <li><strong>Used for:</strong> All push notifications triggered by job lifecycle events</li>
      <li><strong>Implementation:</strong> Cloud Functions trigger on Firestore document writes and dispatch FCM messages to target device tokens</li>
      <li><strong>Device tokens</strong> shall be stored in the users collection and refreshed on every app launch</li>
    </ul>
  </div>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- SECTION 4 -->
<!-- ═══════════════════════════════════════ -->
<div class="section" id="s4">
  <div class="section-header">
    <span class="section-num">04</span>
    <h2 class="section-title">System Models</h2>
  </div>

  <h3>4.1 Use Case Diagram</h3>
  <div class="diagram-note">[ Use Case Diagram — see original PDF / Figma design files ]<br><br>Actors: Poster · Helper · Firebase FCM<br>Use cases include: Register/Login · Post a Job · Track Job Status · Edit/Cancel Job · Mark Complete · Leave Review · Browse Job Feed · Filter/Search · Accept a Job · Start/Complete a Job · Send Notification</div>

  <h3>4.2 Sequence Diagrams</h3>

  <div class="card" style="margin-bottom:12px;">
    <div class="card-title">SD-01 · Authentication Flow (Register &amp; Login)</div>
    <p style="font-size:13px;">User App → Firebase Auth (Register) → UID Returned → Upload Photo → Imgbb → Photo URL → Save User Doc → Firestore → Doc Saved → Login → Auth Token → Fetch User Doc → User Data → Load Home</p>
  </div>

  <div class="card" style="margin-bottom:12px;">
    <div class="card-title">SD-02 · Job Posting &amp; Discovery Flow</div>
    <p style="font-size:13px;">Poster App fills &amp; submits Job Form → Firestore → Job ID Returned → Real-time Job appears in Helper's Feed → Helper applies Filter → Filtered Results → Helper sends Search Keyword → Matched Jobs returned</p>
  </div>

  <div class="card" style="margin-bottom:12px;">
    <div class="card-title">SD-03 · Job Lifecycle Flow (Accept → Start → Complete)</div>
    <p style="font-size:13px;">Helper accepts job → Firestore (status: Accepted) → Cloud Functions → Notify Poster → Helper starts job → Firestore (status: In Progress) → Notify → Poster marks complete → Firestore (status: Completed) → Notify Helper</p>
  </div>

  <div class="card">
    <div class="card-title">SD-04 · Review &amp; Cancel Flow</div>
    <p style="font-size:13px;">Poster submits Rating &amp; Comment → Firestore creates Review Doc → Cloud Functions recalculate Avg Rating → Notify Helper "New Review" · Poster sends Cancel + Reason → Firestore (status: Cancelled) → Cloud Functions → Notify Helper</p>
  </div>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- SECTION 5 -->
<!-- ═══════════════════════════════════════ -->
<div class="section" id="s5">
  <div class="section-header">
    <span class="section-num">05</span>
    <h2 class="section-title">Project Management</h2>
  </div>

  <h3 id="s5-1">5.1 Development Tools</h3>

  <h3 style="margin-top:16px;">Frontend Development</h3>
  <div class="tools-grid">
    <div class="tool-chip">Flutter 3.x</div>
    <div class="tool-chip">Dart 3.x</div>
    <div class="tool-chip">Android Studio</div>
    <div class="tool-chip">VS Code</div>
    <div class="tool-chip">Flutter DevTools</div>
  </div>

  <h3>Backend &amp; Cloud Services</h3>
  <div class="tools-grid">
    <div class="tool-chip">Firebase Auth</div>
    <div class="tool-chip">Cloud Firestore</div>
    <div class="tool-chip">Cloud Functions</div>
    <div class="tool-chip">Firebase FCM</div>
    <div class="tool-chip">Firebase Emulator</div>
  </div>

  <h3>Image, State &amp; Version Control</h3>
  <div class="tools-grid">
    <div class="tool-chip">Imgbb API v1</div>
    <div class="tool-chip">image_picker</div>
    <div class="tool-chip">Riverpod</div>
    <div class="tool-chip">Git</div>
    <div class="tool-chip">GitHub</div>
  </div>

  <h3>Design, Testing &amp; Deployment</h3>
  <div class="tools-grid">
    <div class="tool-chip">Figma</div>
    <div class="tool-chip">Material Design 3</div>
    <div class="tool-chip">Flutter Test</div>
    <div class="tool-chip">Mockito</div>
    <div class="tool-chip">Postman</div>
    <div class="tool-chip">Play Console</div>
    <div class="tool-chip">App Store Connect</div>
    <div class="tool-chip">Firebase App Dist.</div>
  </div>

  <!-- Timeline -->
  <h3 id="s5-2" style="margin-top:32px;">5.2 Timeline — 20 Weeks</h3>
  <div class="timeline" style="margin-top:20px;">

    <div class="phase">
      <div class="phase-header"><span class="phase-name">Phase 1 — Planning &amp; Design</span><span class="phase-duration">Weeks 1–3</span></div>
      <div class="task-list">
        <div class="task-item"><span>Requirements gathering and SRS finalization</span><span class="task-dur">1 Week</span></div>
        <div class="task-item"><span>UI/UX wireframing and prototyping in Figma</span><span class="task-dur">1 Week</span></div>
        <div class="task-item"><span>Database schema design and Firebase setup</span><span class="task-dur">1 Week</span></div>
      </div>
    </div>

    <div class="phase">
      <div class="phase-header"><span class="phase-name">Phase 2 — Environment Setup</span><span class="phase-duration">Weeks 4–5</span></div>
      <div class="task-list">
        <div class="task-item"><span>Flutter project setup and folder structure</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Firebase project creation and configuration</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Imgbb API integration and testing</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Git repository setup and branching strategy</span><span class="task-dur">1 Day</span></div>
        <div class="task-item"><span>Firebase Security Rules initial configuration</span><span class="task-dur">2 Days</span></div>
      </div>
    </div>

    <div class="phase">
      <div class="phase-header"><span class="phase-name">Phase 3 — Authentication &amp; Profiles</span><span class="phase-duration">Weeks 6–8</span></div>
      <div class="task-list">
        <div class="task-item"><span>User registration and login screens</span><span class="task-dur">4 Days</span></div>
        <div class="task-item"><span>Firebase Authentication integration</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Role selection (Poster / Helper / Both)</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Profile creation and editing screen</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Imgbb profile picture upload integration</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>User data storage in Firestore</span><span class="task-dur">2 Days</span></div>
      </div>
    </div>

    <div class="phase">
      <div class="phase-header"><span class="phase-name">Phase 4 — Job Posting &amp; Discovery</span><span class="phase-duration">Weeks 9–11</span></div>
      <div class="task-list">
        <div class="task-item"><span>Post a Job screen with form validation</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Firestore job document creation</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Job feed screen for Helpers</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Real-time Firestore listener for feed updates</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Filtering by category and pay amount</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Search functionality</span><span class="task-dur">2 Days</span></div>
      </div>
    </div>

    <div class="phase">
      <div class="phase-header"><span class="phase-name">Phase 5 — Job Lifecycle &amp; Notifications</span><span class="phase-duration">Weeks 12–14</span></div>
      <div class="task-list">
        <div class="task-item"><span>Job detail screen</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Accept Job functionality</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Job status workflow (Posted → Accepted → In Progress → Completed)</span><span class="task-dur">4 Days</span></div>
        <div class="task-item"><span>Cancel job functionality</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Firebase Cloud Functions for status triggers</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>FCM push notification integration</span><span class="task-dur">2 Days</span></div>
      </div>
    </div>

    <div class="phase">
      <div class="phase-header"><span class="phase-name">Phase 6 — Ratings, Reviews &amp; Profiles</span><span class="phase-duration">Weeks 15–16</span></div>
      <div class="task-list">
        <div class="task-item"><span>Post-completion review prompt</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Star rating and comment submission</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Review storage in Firestore</span><span class="task-dur">1 Day</span></div>
        <div class="task-item"><span>Helper average rating calculation</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Display reviews on Helper public profile</span><span class="task-dur">3 Days</span></div>
      </div>
    </div>

    <div class="phase">
      <div class="phase-header"><span class="phase-name">Phase 7 — Testing &amp; QA</span><span class="phase-duration">Weeks 17–18</span></div>
      <div class="task-list">
        <div class="task-item"><span>Unit testing for business logic</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Widget testing for UI components</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Integration testing with Firebase Emulator</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Bug fixing and performance optimization</span><span class="task-dur">2 Days</span></div>
      </div>
    </div>

    <div class="phase">
      <div class="phase-header"><span class="phase-name">Phase 8 — Deployment &amp; Launch</span><span class="phase-duration">Weeks 19–20</span></div>
      <div class="task-list">
        <div class="task-item"><span>Beta testing via Firebase App Distribution</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>User feedback collection and fixes</span><span class="task-dur">2 Days</span></div>
        <div class="task-item"><span>Google Play Store submission and review</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Apple App Store submission and review</span><span class="task-dur">3 Days</span></div>
        <div class="task-item"><span>Production launch and monitoring</span><span class="task-dur">1 Day</span></div>
      </div>
    </div>

  </div>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- SECTION 6 -->
<!-- ═══════════════════════════════════════ -->
<div class="section" id="s6">
  <div class="section-header">
    <span class="section-num">06</span>
    <h2 class="section-title">Appendix</h2>
  </div>

  <h3>6.1.1 Official Documentation</h3>
  <table class="refs-table">
    <thead><tr><th>Resource</th><th>Link</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>Flutter Documentation</td><td><a href="https://flutter.dev/docs" target="_blank">flutter.dev/docs</a></td><td>Core framework reference and widget catalog</td></tr>
      <tr><td>Dart Language Guide</td><td><a href="https://dart.dev/guides" target="_blank">dart.dev/guides</a></td><td>Dart syntax, async, and OOP concepts</td></tr>
      <tr><td>Firebase Documentation</td><td><a href="https://firebase.google.com/docs" target="_blank">firebase.google.com/docs</a></td><td>All Firebase services reference</td></tr>
      <tr><td>Imgbb API Docs</td><td><a href="https://api.imgbb.com" target="_blank">api.imgbb.com</a></td><td>Image upload API reference</td></tr>
      <tr><td>Material Design 3</td><td><a href="https://m3.material.io" target="_blank">m3.material.io</a></td><td>UI/UX design guidelines and components</td></tr>
    </tbody>
  </table>

  <h3 style="margin-top:20px;">6.1.2 APIs Used</h3>
  <table class="refs-table">
    <thead><tr><th>API</th><th>Version</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>Firebase Authentication API</td><td>Latest</td><td>User registration, login, and session management</td></tr>
      <tr><td>Cloud Firestore API</td><td>Latest</td><td>Real-time NoSQL database for all app data</td></tr>
      <tr><td>Firebase Cloud Messaging API</td><td>Latest</td><td>Push notifications to user devices</td></tr>
      <tr><td>Firebase Cloud Functions API</td><td>Latest</td><td>Server-side triggers on data changes</td></tr>
      <tr><td>Imgbb Upload API</td><td>v1</td><td>Profile picture upload and CDN hosting</td></tr>
    </tbody>
  </table>
</div>

<!-- Footer -->
<div style="border-top:1px solid var(--border);padding-top:20px;margin-top:40px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
  <span style="font-family:var(--mono);font-size:11px;color:var(--muted);">DoneDash · Campus Micro-Gig Marketplace · SRS v1.0</span>
  <span style="font-family:var(--mono);font-size:11px;color:var(--muted);">Shanto-Mariam University of Creative Technology · March 2026</span>
</div>

</body>
</html>
