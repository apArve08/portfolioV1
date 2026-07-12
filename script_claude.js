(function () {
  const root = document.documentElement;
  const GH = 'https://github.com/aparve08';

  /* ========================================================================
     PROJECT DATA — single source of truth.
     Add a new object to PROJECTS and it appears in the rail + gets its own
     detail panel automatically. Nothing else needs to change.
     ======================================================================== */
  const PROJECTS = [
    {
      code: 'P7', slug: 'runtrack', year: 2026, type: 'personal',
      title: 'RunTrack — Running Analytics Platform',
      org: 'Personal · AI', duration: 'Personal project',
      pitch: 'Strava · Suunto · Next.js · FastAPI · Supabase · Mapbox · Gemini',
      tag: '🏃 Personal · AI',
      github: GH,
      overview: {
        blurb: 'A running analytics platform born from a simple frustration: Garmin and Strava give you plenty of data, but not always the insights you actually need to train smarter.',
        features: [
          'Interactive dashboards — daily, weekly, monthly, yearly',
          'Detailed run pages with maps powered by Mapbox + Leaflet',
          'AI-powered run analysis with actionable insights beyond generic feedback',
          'Activity management with filtering and Excel export',
          'AI-generated progress reports for custom date ranges',
          'Automatic personal record (PR) detection',
          'Training zone analysis and breakdowns',
          'Live weather integration for historical runs and 24/7 monitoring',
          'AI-generated training schedules tailored to your running history',
          'Strava and Suunto integrations',
        ],
        concepts: [
          'Multi-provider activity ingestion (Strava + Suunto APIs) into a unified schema',
          'LLM-driven analysis (Gemini Flash) over activity context to surface training insights',
          'Map-heavy SPA with Mapbox + Leaflet for run visualization',
        ],
        stack: ['Next.js', 'FastAPI', 'Supabase', 'Gemini Flash', 'Vercel', 'Mapbox', 'Leaflet', 'Strava API', 'Suunto API'],
      },
      problem: 'Strava and Suunto produce rich streams of pace, heart rate, elevation and cadence — but their built-in analytics stop at charts and segments. Runners who actually want to train smarter (not just log miles) are left stitching together their own interpretations across multiple apps. Generic feedback loops that just say "good job" or "slow down" don\'t move the needle.',
      solution: 'RunTrack normalises activity streams from Strava and Suunto into a single schema, then layers an LLM-driven analysis (Gemini Flash) over the data to produce per-run insight, weekly progress reports, PR detection and tailored training schedules. The Next.js front-end focuses on map-heavy UX and dashboards that answer questions runners actually ask.',
      architecture: [
        { label: 'Client', nodes: [
          { title: 'Next.js SPA', sub: 'Vercel · Mapbox' },
          { title: 'Mobile Browser', sub: 'Map · Charts' },
        ]},
        { label: 'Backend', nodes: [
          { title: 'FastAPI', sub: 'Ingestion · API' },
          { title: 'Analysis Worker', sub: 'Gemini Flash prompts' },
          { title: 'Supabase Auth', sub: 'JWT · RLS', soft: true },
        ]},
        { label: 'Data / External', nodes: [
          { title: 'Postgres', sub: 'activities · runs' },
          { title: 'Object Storage', sub: 'GPX / FIT files' },
          { title: 'Strava API', sub: 'OAuth · webhooks' },
          { title: 'Suunto API', sub: 'OAuth · pull' },
        ]},
      ],
      images: [
        { caption: 'Dashboard — yearly view', text: 'Dashboard' },
        { caption: 'Run detail with Mapbox route', text: 'Run+Detail' },
        { caption: 'AI-generated progress report', text: 'AI+Report' },
      ],
      readme: `# RunTrack

A running analytics platform that turns raw Strava / Suunto data into actionable training insight.

## Stack

- **Frontend**: Next.js (Vercel)
- **Backend**: FastAPI
- **Database**: Supabase (Postgres + Auth + Storage)
- **LLM**: Gemini Flash (run analysis, reports, schedules)
- **Maps**: Mapbox + Leaflet
- **Integrations**: Strava API, Suunto API

## Features

- Daily / weekly / monthly / yearly dashboards
- Run detail pages with route maps
- AI-powered run analysis (Gemini Flash)
- Activity filtering and Excel export
- AI-generated progress reports
- Automatic PR detection
- Training zone breakdowns
- Strava & Suunto sync

## Run locally

\`\`\`
# backend
uvicorn app.main:app --reload

# frontend
pnpm dev
\`\`\`
`,
    },

    {
      code: 'P5', slug: 'local-rag', year: 2026, type: 'personal',
      title: 'Local AI Evaluator & RAG Pipeline',
      org: 'Personal', duration: '4 weeks',
      pitch: 'Vector math · Open-source LLMs · Semantic search · pgvector',
      tag: '🧠 AI Systems',
      github: GH,
      overview: {
        blurb: 'A fully local retrieval-augmented generation pipeline for evaluating open-source LLMs against your own documents — no data leaves the machine.',
        features: [
          'Document ingestion & chunking pipeline (PDF/text → vectors)',
          'pgvector database storing semantic embeddings',
          'Model benchmarking harness tracking generations',
          'Next.js dashboard for live latency + token-rate metrics',
        ],
        concepts: [
          'Embedding vector mechanics and distance bounds (L2, cosine similarity)',
          'Chunking tradeoffs (recursive vs semantic spatial groupings)',
        ],
        weeks: [
          { tag: 'WK 01', title: 'Ingestion & Chunking', body: 'Install Ollama. Write a Python script to parse PDFs into text arrays using RecursiveCharacterTextSplitter patterns.' },
          { tag: 'WK 02', title: 'The Vector Layer', body: 'Launch PostgreSQL + pgvector in Docker. Map text segments into numeric coordinate structures via nomic-embed-text.' },
          { tag: 'WK 03', title: 'The Benchmark Core', body: 'Construct loops running test prompts concurrently across local targets, exporting evaluation readouts into logging files.' },
          { tag: 'WK 04', title: 'Analytics Dashboard', body: 'Build a Next.js view. Use tracking widgets to monitor latency profiles and token-generation rates live.' },
        ],
        stack: ['Python', 'pgvector', 'Ollama', 'Next.js'],
      },
      problem: 'Open-source LLMs change every month. Picking the right one for retrieval-augmented generation over a private document set is guesswork: hosted evals are slow, expensive, and force your data through third-party infrastructure. There\'s no easy way to compare models on the same retrieval task, on your own machine, with consistent chunking and embedding settings.',
      solution: 'A Python ingestion pipeline chunks documents (recursive splitter) and embeds them with Ollama-hosted nomic-embed-text. Embeddings land in pgvector for cosine/L2 retrieval, and a concurrent benchmark loop runs the same prompts against every local model in the pool, logging latency and token-rate metrics to JSONL. A Next.js dashboard surfaces those metrics live.',
      architecture: [
        { label: 'Ingestion', nodes: [
          { title: 'Source Docs', sub: 'PDF · Markdown' },
          { title: 'Chunker', sub: 'Recursive splitter' },
        ]},
        { label: 'Embedding / LLM', nodes: [
          { title: 'Embedder', sub: 'Ollama · nomic-embed' },
          { title: 'pgvector', sub: 'Cosine / L2 search' },
          { title: 'Local LLM Pool', sub: 'Llama · Mistral · Qwen' },
          { title: 'Retrieval', sub: 'Top-k context', soft: true },
        ]},
        { label: 'Query & Eval', nodes: [
          { title: 'Test Prompts', sub: 'Eval dataset' },
          { title: 'Benchmark Loop', sub: 'Concurrency · timing' },
          { title: 'Eval Logger', sub: 'JSONL · metrics' },
          { title: 'Dashboard', sub: 'Next.js UI' },
        ]},
      ],
      images: [
        { caption: 'Ingestion pipeline output', text: 'Screenshot+1' },
        { caption: 'Vector layer schema', text: 'Screenshot+2' },
        { caption: 'Benchmark dashboard', text: 'Screenshot+3' },
      ],
      readme: `# Local AI Evaluator & RAG Pipeline

A fully local retrieval-augmented generation pipeline for evaluating open-source LLMs against your own documents.

## Quick start

\`\`\`
docker compose up -d            # postgres + pgvector
pip install -r requirements.txt
python ingest.py ./docs/        # chunk + embed
python benchmark.py --model nomic-embed-text
\`\`\`

## Layout

\`\`\`
rag/
  ingest.py        chunking & embedding
  retrieve.py      similarity search
  benchmark/       eval harness
  dashboard/       Next.js UI
\`\`\`
`,
    },

    {
      code: 'P6', slug: 'cache-aside', year: 2026, type: 'personal',
      title: 'Distributed Cache-Aside System',
      org: 'Personal', duration: '4 weeks',
      pitch: 'Redis · Cache invalidation · Event-driven · Race condition protection',
      tag: '⚡ Backend',
      github: GH,
      overview: {
        blurb: 'A two-tier data layer that protects a relational database from read-heavy traffic without letting the cache and the source of truth drift apart.',
        features: [
          'PostgreSQL + Redis two-tier data layer in Docker',
          'Cache-Aside middleware evaluating records to intercept disk I/O requests',
          'Atomic invalidation transactions purging cache entries safely during data updates',
        ],
        concepts: [
          'Cache miss/hit routing loops and memory expiration windows',
          'Protecting relational backends from query saturation during high consumer traffic',
        ],
        weeks: [
          { tag: 'WK 05', title: 'Two-Tier Database Setup', body: 'Spin up Redis and Postgres containers in Docker. Seed tables with test logs to build base read profiles.' },
          { tag: 'WK 06', title: 'Cache-Aside Middleware', body: 'Write Express middleware intercepting queries: check Redis keys first, on failure fall back to disk and populate cache.' },
          { tag: 'WK 07', title: 'Atomic Cache Invalidation', body: 'Code the write path. Wrap SQL updates and Redis evictions in database transaction commits to avoid stale data blocks.' },
          { tag: 'WK 08', title: 'Load Test & Performance Metrics', body: 'Execute load matrices with k6 tracking thousands of users. Capture CPU usage graphs to visually verify the optimization footprint.' },
        ],
        stack: ['Node.js', 'Redis', 'PostgreSQL', 'k6'],
      },
      problem: 'A single PostgreSQL instance serving thousands of concurrent reads becomes the bottleneck — query latency climbs, connections pool out, and write traffic gets queued behind long-running reads. Naively dropping Redis in front introduces a worse problem: stale data, silently drifting apart from the database.',
      solution: 'An Express middleware intercepts every read: hit Redis first, fall back to Postgres on miss and populate the cache with a TTL. The write path wraps SQL updates and Redis evictions in the same database transaction so the cache cannot diverge from the source of truth. k6 load matrices quantify the gain under contention.',
      architecture: [
        { label: 'Clients', nodes: [
          { title: 'HTTP Clients', sub: 'Read-heavy workload' },
          { title: 'Write Path', sub: 'POST · PUT · DELETE' },
        ]},
        { label: 'App / Middleware', nodes: [
          { title: 'Express API', sub: 'Route · validate' },
          { title: 'Cache-Aside Middleware', sub: 'get → set · TTL' },
          { title: 'Invalidation Service', sub: 'Tx-bound evictions' },
        ]},
        { label: 'Data', nodes: [
          { title: 'Redis 7', sub: 'Read-through cache' },
          { title: 'PostgreSQL 16', sub: 'System of record' },
          { title: 'k6 Load Driver', sub: 'Latency · throughput', soft: true },
        ]},
      ],
      images: [
        { caption: 'Two-tier topology', text: 'Screenshot+1' },
        { caption: 'Cache hit/miss log', text: 'Screenshot+2' },
        { caption: 'k6 latency graph', text: 'Screenshot+3' },
      ],
      readme: `# Distributed Cache-Aside System

PostgreSQL-backed store fronted by Redis with atomic invalidation.

## Stack

- Express (Node.js) for the API layer
- Redis 7 as the read-through cache
- PostgreSQL 16 as the system of record
- k6 for load testing

## Middleware sketch

\`\`\`
async function cacheAside(key, ttl, loader) {
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);
  const fresh = await loader();
  await redis.set(key, JSON.stringify(fresh), "EX", ttl);
  return fresh;
}
\`\`\`

## Run

\`\`\`
docker compose up
npm run dev
k6 run tests/load.js
\`\`\`
`,
    },

    {
      code: 'P1', slug: 'e-appraisal', year: 2025, type: 'work',
      title: 'E-Appraisal System',
      org: 'YBS International Berhad', duration: 'YBS International',
      pitch: 'Internal HR web app · PHP · MySQL · REST APIs',
      tag: '🏢 Enterprise Web',
      github: GH,
      overview: {
        blurb: 'An internal employee performance appraisal workflow used across manufacturing plants, replacing a patchwork of spreadsheets and email threads.',
        features: [
          'Role-based access for staff, managers, and HR admins',
          'Configurable appraisal cycles, reviews, and reporting dashboards',
        ],
        concepts: [
          'PHP backend with MySQL schema and CRUD workflows',
          'REST API design for internal integrations',
          'Containerized deployment with Docker',
        ],
        stack: ['PHP', 'MySQL', 'REST APIs', 'Docker', 'Git'],
      },
      problem: 'Across multiple plants, performance appraisals were run through a mix of Excel templates, shared inboxes, and paper forms. HR couldn\'t see cycle status in real time, scoring was inconsistent between managers, and audit history was effectively lost the moment a form was submitted.',
      solution: 'A PHP web application backed by a normalised MySQL schema gives every role exactly the views they need. Configurable appraisal cycles, structured review forms, and an append-only audit log make scores comparable across plants and recoverable on demand. Containerised deployment means new plants onboard with a single compose-up.',
      architecture: [
        { label: 'Users', nodes: [
          { title: 'Staff', sub: 'Self-review' },
          { title: 'Managers', sub: 'Score · approve' },
          { title: 'HR Admin', sub: 'Cycle · reports' },
        ]},
        { label: 'App Layer', nodes: [
          { title: 'PHP Web App', sub: 'Server-rendered UI' },
          { title: 'RBAC Layer', sub: 'Staff · Mgr · HR' },
          { title: 'REST APIs', sub: 'Internal integrations' },
        ]},
        { label: 'Data', nodes: [
          { title: 'MySQL', sub: 'Cycles · reviews · users' },
          { title: 'Audit Log', sub: 'HR-grade history' },
          { title: 'Docker Host', sub: 'App + DB containers', soft: true },
        ]},
      ],
      images: [
        { caption: 'Appraisal dashboard', text: 'Screenshot+1' },
        { caption: 'Review form', text: 'Screenshot+2' },
      ],
      readme: `# E-Appraisal

Internal HR system for managing employee performance appraisal cycles at YBS International Berhad.

## Stack

- PHP (backend)
- MySQL (data layer)
- REST APIs (internal integration)
- Docker (deployment)

## Features

- Role-based access (staff / manager / HR)
- Configurable appraisal cycles
- Review forms with scoring rubrics
- Reporting dashboard for HR
`,
    },

    {
      code: 'P2', slug: 'it-request', year: 2025, type: 'work',
      title: 'IT Request System Management',
      org: 'YBS International Berhad · Spritzer Berhad', duration: 'YBS International',
      pitch: 'Ticketing workflow · ML auto-fill · Power BI dashboards',
      tag: '🎫 Internal Tools',
      github: GH,
      overview: {
        blurb: 'An internal IT ticketing platform serving three manufacturing plants, later extended with ML-driven auto-completion during a Spritzer Berhad internship.',
        features: [
          'Internal IT ticketing platform for 3 manufacturing plants',
          'ManageEngine API integration via C#',
          'ML-driven auto-completion for missing/incorrect ticket fields',
          'Power BI + Excel reporting dashboards',
        ],
        concepts: [
          'scikit-learn & ML.NET models for field prediction',
          'Workflow automation with Power Automate',
          'Reducing data inconsistencies via ML auto-fill',
        ],
        stack: ['React', 'TypeScript', 'ASP.NET', 'C#', 'Power Automate', 'scikit-learn', 'ML.NET', 'Power BI'],
      },
      problem: 'With IT support spread across three manufacturing plants and an existing ManageEngine instance, tickets came in with wildly inconsistent fields — missing categories, wrong request types, free-text descriptions where a structured value was needed. That noise propagated into Power BI dashboards and made routing rules unreliable.',
      solution: 'A React + TypeScript front-end gives staff a clean ticket form. An ASP.NET / C# service proxies ManageEngine\'s REST API and triggers Power Automate flows for approval and routing. On every write, a scikit-learn / ML.NET model predicts the most likely values for missing or suspect fields — dramatically reducing data inconsistencies before they hit the warehouse.',
      architecture: [
        { label: 'Users / Plants', nodes: [
          { title: 'Plant A / B / C', sub: 'staff' },
          { title: 'IT Helpdesk', sub: 'triage · close' },
          { title: 'Power BI', sub: 'Reports · Excel' },
        ]},
        { label: 'App Layer', nodes: [
          { title: 'React + TS Frontend', sub: 'Ticket forms' },
          { title: 'ASP.NET / C# API', sub: 'Business logic' },
          { title: 'ManageEngine', sub: 'REST integration' },
        ]},
        { label: 'ML · Automation · Data', nodes: [
          { title: 'ML Auto-fill', sub: 'scikit-learn · ML.NET' },
          { title: 'Power Automate', sub: 'Approval · routing' },
          { title: 'Ticket Store', sub: 'ManageEngine' },
          { title: 'Audit', sub: 'log', soft: true },
        ]},
      ],
      images: [
        { caption: 'Ticket dashboard', text: 'Screenshot+1' },
        { caption: 'ManageEngine integration', text: 'Screenshot+2' },
        { caption: 'Power BI report', text: 'Screenshot+3' },
      ],
      readme: `# IT Request System Management

Internal IT ticketing platform used across YBS International Berhad plants, extended with ML-driven auto-completion during my internship at Spritzer Berhad.

## Stack

- React + TypeScript (frontend)
- ASP.NET / C# (backend & ManageEngine API integration)
- Power Automate (workflow)
- Power BI + Excel (reporting)
- scikit-learn / ML.NET (auto-fill predictions)

## Highlights

- ML auto-complete predicts missing/incorrect ticket fields, reducing data inconsistencies.
- ManageEngine API integrated through C# services.
- Reporting dashboards surface trends across plants.
`,
    },

    {
      code: 'P3', slug: 'it-asset', year: 2025, type: 'work',
      title: 'IT Asset Management System',
      org: 'YBS International Berhad', duration: 'YBS International',
      pitch: 'Asset tracking · CRUD workflows · Schema design',
      tag: '📦 Enterprise Web',
      github: GH,
      overview: {
        blurb: 'A centralised inventory of IT assets across manufacturing plants — laptops, monitors, network gear — with lifecycle and audit history.',
        features: [
          'Centralised inventory of IT assets across plants',
          'Asset assignment, lifecycle tracking, and audit history',
          'Internal CRUD workflows tied to support tickets',
        ],
        concepts: [
          'Database schema design for relational asset data',
          'REST API design for internal integrations',
          'Containerized deployment with Docker',
        ],
        stack: ['PHP', 'MySQL', 'REST APIs', 'Docker', 'Git'],
      },
      problem: 'Asset records lived in scattered spreadsheets and personal files. There was no reliable answer to "who has what right now?", warranty expirations slipped unnoticed, and asset write-offs were effectively untraceable. When IT tickets needed an asset context, the link between ticket and inventory had to be reconstructed manually.',
      solution: 'A normalised MySQL schema models assets, assignments, locations and lifecycle states. A PHP front-end exposes CRUD workflows to asset owners and IT staff, with read-only access for auditors. A lifecycle engine flags warranty expirations, and every change writes to a per-asset audit log — traceable back to a single source of truth.',
      architecture: [
        { label: 'Users', nodes: [
          { title: 'Asset Owners', sub: 'request · update' },
          { title: 'IT Staff', sub: 'approve · assign' },
          { title: 'Auditors', sub: 'read · export' },
          { title: 'Ticketing (P2)', sub: 'linked records', soft: true },
        ]},
        { label: 'App Layer', nodes: [
          { title: 'PHP Web App', sub: 'CRUD · search' },
          { title: 'REST APIs', sub: 'Internal contracts' },
          { title: 'Lifecycle Engine', sub: 'status · warranty' },
        ]},
        { label: 'Data', nodes: [
          { title: 'MySQL', sub: 'assets · assignments' },
          { title: 'Audit History', sub: 'per-asset log' },
          { title: 'Docker Host', sub: 'app + DB', soft: true },
        ]},
      ],
      images: [
        { caption: 'Asset list view', text: 'Screenshot+1' },
        { caption: 'Asset detail page', text: 'Screenshot+2' },
      ],
      readme: `# IT Asset Management

Centralised inventory of IT assets across YBS International Berhad manufacturing plants.

## Stack

- PHP (backend)
- MySQL (data layer)
- REST APIs
- Docker

## Features

- Asset inventory with lifecycle tracking
- Assignment to staff and locations
- Audit history per asset
- CRUD workflows tied to support tickets
`,
    },

    {
      code: 'P4', slug: 'mobile-app', year: 2023, type: 'personal',
      title: 'Cross-Platform Mobile App (FlutterFlow)',
      org: 'Freelance', duration: 'Freelance · 2023–2024',
      pitch: 'FlutterFlow · Firebase · Auth · Realtime DB · Cloud Functions',
      tag: '📱 Mobile · Freelance',
      github: GH,
      overview: {
        blurb: 'A cross-platform mobile application shipped end-to-end for a freelance client, with a Firebase backend and no custom server to maintain.',
        features: [
          'Cross-platform mobile application built with FlutterFlow',
          'Firebase backend: real-time database, authentication, cloud functions',
          'Delivered to a real client as a freelance engagement',
        ],
        concepts: [
          'Firebase Realtime Database for live state',
          'Firebase Auth for user identity',
          'Cloud Functions for backend logic',
        ],
        stack: ['FlutterFlow', 'Firebase', 'Cloud Functions'],
      },
      problem: 'The client wanted an iOS and Android app with live data sync, authentication, and some server-side logic — without spinning up a custom backend or paying for a full native rewrite. The freelancer (me) had to ship something reliable without over-engineering the infrastructure.',
      solution: 'FlutterFlow produced a single cross-platform codebase covering both stores. Firebase Authentication handled identity, the Realtime Database carried live state into the app, and Cloud Functions absorbed the small amount of backend logic without standing up a custom server — delivered on a freelance budget.',
      architecture: [
        { label: 'Clients', nodes: [
          { title: 'iOS App', sub: 'FlutterFlow build' },
          { title: 'Android App', sub: 'FlutterFlow build' },
          { title: 'Client Admin (Web)', sub: 'content · users' },
        ]},
        { label: 'App', nodes: [
          { title: 'Auth Flow', sub: 'login · session' },
          { title: 'UI Screens', sub: 'lists · detail' },
          { title: 'Action Triggers', sub: 'call Cloud Functions' },
        ]},
        { label: 'Backend', nodes: [
          { title: 'Firebase Auth', sub: 'Identity' },
          { title: 'Realtime Database', sub: 'live state' },
          { title: 'Cloud Functions', sub: 'server logic' },
        ]},
      ],
      images: [
        { caption: 'Login screen', text: 'Screenshot+1' },
        { caption: 'Home screen', text: 'Screenshot+2' },
        { caption: 'Detail view', text: 'Screenshot+3' },
      ],
      readme: `# Cross-Platform Mobile App

A FlutterFlow mobile app built for a freelance client, integrated with Firebase for backend services.

## Stack

- FlutterFlow (UI & app shell)
- Firebase Authentication
- Firebase Realtime Database
- Firebase Cloud Functions

## Features

- User signup / login
- Live data sync via Realtime Database
- Cloud Functions for backend logic
- Cross-platform (iOS & Android)
`,
    },
  ];

  // Sort newest first for the rail (mirrors a timeline read top-down).
  PROJECTS.sort(function (a, b) { return b.year - a.year; });

  const GITHUB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>';

  /* ---------------- tiny markdown -> HTML renderer for README tab ---------------- */
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inlineMd(s) {
    s = escapeHtml(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return s;
  }
  function renderMarkdown(md) {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let i = 0;
    let listBuffer = null; // 'ul' | 'ol' | null

    function flushList() {
      if (listBuffer) { html += '</' + listBuffer + '>'; listBuffer = null; }
    }

    while (i < lines.length) {
      const line = lines[i];

      if (/^```/.test(line)) {
        flushList();
        const codeLines = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) { codeLines.push(lines[i]); i++; }
        html += '<pre><code>' + escapeHtml(codeLines.join('\n')) + '</code></pre>';
        i++;
        continue;
      }

      const h = line.match(/^(#{1,3})\s+(.*)$/);
      if (h) {
        flushList();
        const level = h[1].length;
        html += '<h' + level + '>' + inlineMd(h[2]) + '</h' + level + '>';
        i++;
        continue;
      }

      const ol = line.match(/^\d+\.\s+(.*)$/);
      if (ol) {
        if (listBuffer !== 'ol') { flushList(); html += '<ol>'; listBuffer = 'ol'; }
        html += '<li>' + inlineMd(ol[1]) + '</li>';
        i++;
        continue;
      }

      const ul = line.match(/^[-*]\s+(.*)$/);
      if (ul) {
        if (listBuffer !== 'ul') { flushList(); html += '<ul>'; listBuffer = 'ul'; }
        html += '<li>' + inlineMd(ul[1]) + '</li>';
        i++;
        continue;
      }

      if (line.trim() === '') { flushList(); i++; continue; }

      flushList();
      html += '<p>' + inlineMd(line) + '</p>';
      i++;
    }
    flushList();
    return html;
  }

  /* ---------------- generic architecture layer renderer ---------------- */
  const ARROW_DOWN_SVG = '<svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="8" y1="1" x2="8" y2="15"/><path d="M3 11 L8 17 L13 11" fill="none"/></svg>';

  function renderArchitecture(layers) {
    let out = '';
    layers.forEach(function (layer, idx) {
      out += '<div class="arch-layer"><div class="arch-layer-label">' + escapeHtml(layer.label) + '</div><div class="arch-nodes">';
      layer.nodes.forEach(function (n) {
        out += '<div class="arch-node' + (n.soft ? ' is-soft' : '') + '"><div class="arch-node-title">' + escapeHtml(n.title) + '</div><div class="arch-node-sub">' + escapeHtml(n.sub || '') + '</div></div>';
      });
      out += '</div></div>';
      if (idx < layers.length - 1) {
        out += '<div class="arch-connector">' + ARROW_DOWN_SVG + '</div>';
      }
    });
    return out;
  }

  /* ---------------- render project rail ---------------- */
  const rail = document.getElementById('project-rail');
  const detail = document.getElementById('project-detail');
  const search = document.getElementById('project-search');
  let activeType = 'all';
  let activeCode = PROJECTS.length ? PROJECTS[0].code : null;
  let query = '';

  function projectMatches(p) {
    if (activeType !== 'all' && p.type !== activeType) return false;
    if (query) {
      const hay = (p.title + ' ' + p.pitch + ' ' + p.org + ' ' + (p.overview.stack || []).join(' ')).toLowerCase();
      if (hay.indexOf(query.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function buildRail() {
    let html = '';
    PROJECTS.forEach(function (p) {
      html += '<button class="project-row" type="button" data-code="' + p.code + '">' +
        '<span class="row-rail"><span class="row-dot' + (p.type === 'work' ? ' type-work' : '') + '"></span><span class="row-line"></span></span>' +
        '<span class="row-body">' +
          '<span class="row-top"><span class="row-code">' + p.code + '</span><span class="row-year">' + p.year + '</span></span>' +
          '<span class="row-title">' + escapeHtml(p.title) + '</span>' +
          '<span class="row-org">' + escapeHtml(p.org) + '</span>' +
        '</span>' +
      '</button>';
    });
    rail.innerHTML = html;
    rail.querySelectorAll('.project-row').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectProject(btn.getAttribute('data-code'));
      });
    });
  }

  function applyRailFilter() {
    let anyVisible = false;
    rail.querySelectorAll('.project-row').forEach(function (btn) {
      const code = btn.getAttribute('data-code');
      const p = PROJECTS.filter(function (x) { return x.code === code; })[0];
      const match = projectMatches(p);
      btn.classList.toggle('is-hidden', !match);
      if (match) anyVisible = true;
    });
    let existing = rail.querySelector('.no-results');
    if (!anyVisible) {
      if (!existing) {
        existing = document.createElement('div');
        existing.className = 'no-results';
        existing.textContent = 'No projects match this filter.';
        rail.appendChild(existing);
      }
    } else if (existing) {
      existing.remove();
    }
    // If active selection got filtered out, jump to first visible.
    const activeBtn = rail.querySelector('.project-row.is-active');
    if (!activeBtn || activeBtn.classList.contains('is-hidden')) {
      const firstVisible = rail.querySelector('.project-row:not(.is-hidden)');
      if (firstVisible) selectProject(firstVisible.getAttribute('data-code'));
    }
  }

  function currentTab(code) {
    return (window.__projectTabs && window.__projectTabs[code]) || 'overview';
  }
  function setCurrentTab(code, tab) {
    if (!window.__projectTabs) window.__projectTabs = {};
    window.__projectTabs[code] = tab;
  }

  function renderDetail(p) {
    const tab = currentTab(p.code);
    const stackTags = (p.overview.stack || []).map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join('');

    const weeksHtml = p.overview.weeks ? (
      '<h4>Week-by-Week Breakdown</h4><ol class="week-list-plain" style="display:flex;flex-direction:column;gap:10px;">' +
      p.overview.weeks.map(function (w) {
        return '<li style="display:grid;grid-template-columns:70px 1fr;gap:16px;padding:12px 14px;background:var(--bg-alt);border:1px solid var(--border);border-radius:8px;font-size:14px;">' +
          '<span style="font-family:var(--font-mono);font-size:11.5px;color:var(--fg-faint);padding-top:2px;">' + w.tag + '</span>' +
          '<div><strong style="color:var(--fg);font-weight:600;">' + escapeHtml(w.title) + '</strong><p style="color:var(--fg-muted);font-size:13px;margin-top:4px;">' + escapeHtml(w.body) + '</p></div>' +
        '</li>';
      }).join('') + '</ol>'
    ) : '';

    const overviewHtml =
      '<p style="color:var(--fg-muted);font-size:15px;">' + escapeHtml(p.overview.blurb) + '</p>' +
      (p.overview.features ? '<h4>Features</h4><ul class="bullet-list">' + p.overview.features.map(function (f) { return '<li>' + escapeHtml(f) + '</li>'; }).join('') + '</ul>' : '') +
      '<h4>Core Concepts</h4><ul class="bullet-list">' + p.overview.concepts.map(function (c) { return '<li>' + escapeHtml(c) + '</li>'; }).join('') + '</ul>' +
      weeksHtml +
      '<div class="callout-grid">' +
        '<div class="callout"><span class="callout-label">Problem</span><div class="callout-body"><p>' + escapeHtml(p.problem) + '</p></div></div>' +
        '<div class="callout"><span class="callout-label">Solution</span><div class="callout-body"><p>' + escapeHtml(p.solution) + '</p></div></div>' +
      '</div>' +
      '<ul class="tag-list tag-strip">' + stackTags + '</ul>';

    const archHtml = '<h4>System Architecture</h4><div class="arch-diagram">' + renderArchitecture(p.architecture) + '</div>';

    const demoHtml = p.images && p.images.length
      ? '<h4>Screenshots &amp; Demo</h4><div class="image-gallery">' + p.images.map(function (img, i) {
          return '<button class="gallery-item" type="button" data-caption="' + escapeHtml(img.caption) + '" data-project="' + p.code + '" data-idx="' + i + '">' +
            '<img src="https://placehold.co/640x400/4c6785/f8f7f3?text=' + img.text + '" alt="' + escapeHtml(img.caption) + '" loading="lazy" />' +
            '<span class="gallery-caption">' + escapeHtml(img.caption) + '</span>' +
          '</button>';
        }).join('') + '</div>'
      : '<div class="demo-empty">No demo media yet for this project.</div>';

    const readmeHtml =
      '<div class="readme-card">' +
        '<div class="readme-titlebar"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/></svg><span>README.md</span></div>' +
        '<div class="readme-content">' + renderMarkdown(p.readme) + '</div>' +
      '</div>';

    detail.innerHTML =
      '<div class="detail-head">' +
        '<div class="detail-id-row">' +
          '<span class="detail-code">' + p.code + '</span>' +
          '<span class="detail-type-tag">' + p.tag + '</span>' +
          '<a class="detail-github" href="' + p.github + '" target="_blank" rel="noopener">' + GITHUB_SVG + '<span>GitHub</span></a>' +
        '</div>' +
        '<h3 class="detail-title">' + escapeHtml(p.title) + '</h3>' +
        '<p class="detail-pitch">' + escapeHtml(p.pitch) + '</p>' +
      '</div>' +
      '<div class="tab-bar" role="tablist">' +
        '<button class="tab-btn' + (tab === 'overview' ? ' is-active' : '') + '" role="tab" data-tab="overview">Overview</button>' +
        '<button class="tab-btn' + (tab === 'architecture' ? ' is-active' : '') + '" role="tab" data-tab="architecture">Architecture</button>' +
        '<button class="tab-btn' + (tab === 'demo' ? ' is-active' : '') + '" role="tab" data-tab="demo">Demo</button>' +
        '<button class="tab-btn' + (tab === 'readme' ? ' is-active' : '') + '" role="tab" data-tab="readme">README</button>' +
      '</div>' +
      '<div class="detail-body">' +
        '<div class="tab-panel' + (tab === 'overview' ? ' is-active' : '') + '" data-panel="overview"' + (tab === 'overview' ? '' : ' hidden') + '>' + overviewHtml + '</div>' +
        '<div class="tab-panel' + (tab === 'architecture' ? ' is-active' : '') + '" data-panel="architecture"' + (tab === 'architecture' ? '' : ' hidden') + '>' + archHtml + '</div>' +
        '<div class="tab-panel' + (tab === 'demo' ? ' is-active' : '') + '" data-panel="demo"' + (tab === 'demo' ? '' : ' hidden') + '>' + demoHtml + '</div>' +
        '<div class="tab-panel' + (tab === 'readme' ? ' is-active' : '') + '" data-panel="readme"' + (tab === 'readme' ? '' : ' hidden') + '>' + readmeHtml + '</div>' +
      '</div>';

    detail.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-tab');
        setCurrentTab(p.code, target);
        detail.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        detail.querySelectorAll('.tab-panel').forEach(function (panel) {
          const match = panel.getAttribute('data-panel') === target;
          panel.classList.toggle('is-active', match);
          if (match) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
        });
      });
    });

    detail.querySelectorAll('.gallery-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const img = btn.querySelector('img');
        if (!img) return;
        openLightbox(img.src, img.alt, btn.getAttribute('data-caption'));
      });
    });
  }

  function selectProject(code) {
    const p = PROJECTS.filter(function (x) { return x.code === code; })[0];
    if (!p) return;
    activeCode = code;
    rail.querySelectorAll('.project-row').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-code') === code);
    });
    renderDetail(p);
  }

  if (rail && detail) {
    buildRail();
    if (PROJECTS.length) selectProject(PROJECTS[0].code);

    document.querySelectorAll('.filter-btn[data-type]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeType = btn.getAttribute('data-type');
        document.querySelectorAll('.filter-btn[data-type]').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        applyRailFilter();
      });
    });

    if (search) {
      search.addEventListener('input', function () {
        query = search.value.trim();
        applyRailFilter();
      });
    }
  }

  /* ---------------- lightbox (shared) ---------------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-caption');
  const lbClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  function openLightbox(src, alt, caption) {
    if (!lightbox) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCap.textContent = caption || '';
    lightbox.removeAttribute('hidden');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) closeLightbox();
  });

  /* ---------------- theme toggle ---------------- */
  const toggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'portfolio-claude-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
  }
  const saved = (function () { try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; } })();
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- experience / academics expanders ---------------- */
  document.querySelectorAll('.expandable').forEach(function (item) {
    const trigger = item.querySelector('.expander');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      const open = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------------- timeline scroll-highlight ---------------- */
  const timelineItems = document.querySelectorAll('.timeline .timeline-item');
  if (timelineItems.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('is-active');
        else e.target.classList.remove('is-active');
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    timelineItems.forEach(function (i) { obs.observe(i); });
  }
})();
