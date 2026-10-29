# ContentFlow AI — Django Template-Based Interactive Demo

> **"One Source. Multiple Platforms. Consistent Content."**  
> *Transform approved blogs, case studies, and product pages into platform-ready social content while maintaining brand consistency and keeping factual claims connected to their original sources.*

---

## 🌟 Overview

ContentFlow AI is an AI-powered social content repurposing platform designed for marketing, communications, and product teams. It demonstrates how long-form technical assets (whitepapers, engineering guides, benchmark case studies) can be transformed into platform-specific social posts (LinkedIn, Instagram carousels, Instagram Reels scripts, YouTube Shorts breakdowns, Facebook discussions) with **evidence traceability** and **brand voice compliance**.

### Architecture Highlights
* **Web Framework**: Python 3.11+ & Django 5.x.
* **Frontend**: Django Template Inheritance, CSS Variables (Light & Dark theme), Vanilla JavaScript (modular architecture).
* **Zero External AI / API Dependencies**: Fully simulated local generation engine using local heuristic extraction and platform templates.
* **Zero Database Requirements**: Uses browser `localStorage` for all application state (sources, posts, version history, audit overrides, brand profile, preferences).
* **Data Security & Safety**: Browser Blob API for exports with formula injection protection (`=`, `+`, `-`, `@` escaping).

---

## 🚀 Quick Start Guide (Windows PowerShell)

Follow these simple steps in PowerShell to set up and run the application locally:

### 1. Create and Activate Virtual Environment
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```
*(If script execution is disabled on your system, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)*

### 2. Install Requirements
```powershell
pip install -r requirements.txt
```

### 3. Verify Django System Checks
```powershell
python manage.py check
```

### 4. Start the Development Server
```powershell
python manage.py runserver
```

### 5. Open in Your Browser
Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your web browser.

---

## 🔐 Demo Login Credentials

The application uses simulated client-side authentication with session persistence in `localStorage`:

* **Demo Email**: `demo@contentflow.ai`
* **Demo Password**: `Demo@123`
* **1-Click Access**: Click the **"Try Demo Account (1-Click)"** button on `/login/` or **"Try Demo"** on the landing page for instant access.

*(Note: This is a frontend demonstration session mechanism, not a production-grade authentication backend.)*

---

## 🗺️ Application Page Routes

| Route | View Name | Description |
|---|---|---|
| `/` | `landing` | Modern SaaS marketing landing page with platform showcase & FAQ |
| `/login/` | `login` | Simulated demo login with credentials and 1-click entry |
| `/register/` | `register` | Local demo registration simulator |
| `/dashboard/` | `dashboard` | Analytics overview with Chart.js charts, quick actions, and feeds |
| `/sources/` | `sources` | Source document library with search, filter, sort, preview, .txt upload & edit |
| `/create/` | `create_content` | 4-step wizard for platform-specific simulated content generation |
| `/content/<id>/` | `workspace` | Rich post editor, version history, approval workflow, and duplicate |
| `/content/<id>/evidence/` | `evidence` | Source-to-claim fact-checking console with passage linking and review notes |
| `/brand-settings/` | `brand_settings` | Customizable brand voice, prohibited words, audience & CTA profile |
| `/history/` | `history` | Complete campaign post repository with multi-faceted filtering |
| `/exports/` | `exports` | CSV and JSON file downloads using browser Blob API |
| `/settings/` | `settings` | UI theme toggle (Light/Dark), default tone, and demo data reset |

---

## 🛡️ Key Features & Workflows

1. **8 Pre-Loaded Realistic Source Documents**:
   - Zero Trust Enterprise Security Guide
   - Jamstack & Edge Rendering Performance Benchmark
   - SaaS Organic Growth (FinTrack) Case Study
   - Main Street Omnichannel Retail Playbook
   - PulseFlow AI Studio v4.0 Audio Engine Launch
   - Global Remote Corporate Tax & Compliance Guide
   - Self-Serve User Onboarding & Churn Reduction Guide
   - Headless E-Commerce Optimization

2. **15 Omnichannel Generated Posts**:
   - Spanning LinkedIn, Instagram, Instagram Reels, YouTube Shorts, and Facebook.
   - Distinct editorial statuses: *Approved*, *Needs Review*, *Draft*, and *Rejected*.

3. **Source Traceability & Fact Checking**:
   - Inspect individual claims with *Supported*, *Uncertain*, and *Unsupported* tags.
   - View supporting excerpts and passage IDs from original sources.
   - Editorial override protection: Posts with uncertain claims prompt for mandatory justification recorded in local audit logs.

4. **Browser LocalStorage Architecture**:
   - Keys: `contentflow_demo_session`, `contentflow_sources`, `contentflow_posts`, `contentflow_brand`, `contentflow_activity`, `contentflow_audit`, `contentflow_preferences`.
   - Restore initial demo state at any time via Settings -> **"Reset All Demo Data"**.

