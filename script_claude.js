(function () {
  const root = document.documentElement;
  const GH = 'https://github.com/aparve08';

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
      readme: `# RunTrack\n\nA running analytics platform that turns raw Strava / Suunto data into actionable training insight.\n\n## Stack\n\n- **Frontend**: Next.js (Vercel)\n- **Backend**: FastAPI\n- **Database**: Supabase (Postgres + Auth + Storage)\n- **LLM**: Gemini Flash (run analysis, reports, schedules)\n- **Maps**: Mapbox + Leaflet\n- **Integrations**: Strava API, Suunto API\n\n## Features\n\n- Daily / weekly / monthly / yearly dashboards\n- Run detail pages with route maps\n- AI-powered run analysis (Gemini Flash)\n- Activity filtering and Excel export\n- AI-generated progress reports\n- Automatic PR detection\n- Training zone breakdowns\n- Strava & Suunto sync\n\n## Run locally\n\n\`\`\`\n# backend\nuvicorn app.main:app --reload\n\n# frontend\npnpm dev\n\`\`\`\n`,
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
        { caption: 'Ingestion & chunking run — chunk size/overlap sweep over the source PDF', src: 'img/P1_1.png' },
        { caption: 'Benchmark run — llama3.2 vs phi3 across 20 eval prompts', src: 'img/P1_2.png' },
        { caption: 'Benchmark dashboard — time-to-first-token and words/sec per model', src: 'img/P1_3.png' },
      ],
      readme: `# Local AI Evaluator & RAG Pipeline\n\nA fully local retrieval-augmented generation pipeline for evaluating open-source LLMs against your own documents.\n\n## Quick start\n\n\`\`\`\ndocker compose up -d            # postgres + pgvector\npip install -r requirements.txt\npython ingest.py ./docs/        # chunk + embed\npython benchmark.py --model nomic-embed-text\n\`\`\`\n\n## Layout\n\n\`\`\`\nrag/\n  ingest.py        chunking & embedding\n  retrieve.py      similarity search\n  benchmark/       eval harness\n  dashboard/       Next.js UI\n\`\`\`\n`,
    },
    {
      code: 'P6', slug: 'cache-aside', year: 2026, type: 'personal',
      title: 'Distributed Cache-Aside System',
      org: 'Personal', duration: '4 weeks',
      pitch: 'Redis · Cache invalidation · Event-driven · Race condition protection',
      tag: '⚡ Backend',
      github: GH,
      projectUrl: 'https://aparve08.github.io/portfolioV1/proj/cache-aside.html',
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
      readme: `# Distributed Cache-Aside System\n\nPostgreSQL-backed store fronted by Redis with atomic invalidation.\n\n## Stack\n\n- Express (Node.js) for the API layer\n- Redis 7 as the read-through cache\n- PostgreSQL 16 as the system of record\n- k6 for load testing\n\n## Middleware sketch\n\n\`\`\`\nasync function cacheAside(key, ttl, loader) {\n  const hit = await redis.get(key);\n  if (hit) return JSON.parse(hit);\n  const fresh = await loader();\n  await redis.set(key, JSON.stringify(fresh), "EX", ttl);\n  return fresh;\n}\n\`\`\`\n\n## Run\n\n\`\`\`\ndocker compose up\nnpm run dev\nk6 run tests/load.js\n\`\`\`\n`,
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
      readme: `# E-Appraisal\n\nInternal HR system for managing employee performance appraisal cycles at YBS International Berhad.\n\n## Stack\n\n- PHP (backend)\n- MySQL (data layer)\n- REST APIs (internal integration)\n- Docker (deployment)\n\n## Features\n\n- Role-based access (staff / manager / HR)\n- Configurable appraisal cycles\n- Review forms with scoring rubrics\n- Reporting dashboard for HR\n`,
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
      readme: `# IT Request System Management\n\nInternal IT ticketing platform used across YBS International Berhad plants, extended with ML-driven auto-completion during my internship at Spritzer Berhad.\n\n## Stack\n\n- React + TypeScript (frontend)\n- ASP.NET / C# (backend & ManageEngine API integration)\n- Power Automate (workflow)\n- Power BI + Excel (reporting)\n- scikit-learn / ML.NET (auto-fill predictions)\n\n## Highlights\n\n- ML auto-complete predicts missing/incorrect ticket fields, reducing data inconsistencies.\n- ManageEngine API integrated through C# services.\n- Reporting dashboards surface trends across plants.\n`,
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
      readme: `# IT Asset Management\n\nCentralised inventory of IT assets across YBS International Berhad manufacturing plants.\n\n## Stack\n\n- PHP (backend)\n- MySQL (data layer)\n- REST APIs\n- Docker\n\n## Features\n\n- Asset inventory with lifecycle tracking\n- Assignment to staff and locations\n- Audit history per asset\n- CRUD workflows tied to support tickets\n`,
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
      readme: `# Cross-Platform Mobile App\n\nA FlutterFlow mobile app built for a freelance client, integrated with Firebase for backend services.\n\n## Stack\n\n- FlutterFlow (UI & app shell)\n- Firebase Authentication\n- Firebase Realtime Database\n- Firebase Cloud Functions\n\n## Features\n\n- User signup / login\n- Live data sync via Realtime Database\n- Cloud Functions for backend logic\n- Cross-platform (iOS & Android)\n`,
    },
    {
      code: 'P52', slug: 'nanolake', year: 2026, type: 'personal',
      title: 'NanoLake — Browser-Native SQL Analytics',
      org: 'Personal', duration: '4 weeks',
      pitch: 'DuckDB-Wasm · Browser-native SQL · WASM background workers · Parquet compression',
      tag: '🦆 Data Systems',
      github: GH,
      overview: {
        blurb: 'A local-first analytics workspace that runs SQL directly on huge CSV/JSON files inside the browser — no server, no upload, no backend.',
        features: [
          'Table tree viewer, SQL code editor, and dynamic SVG data charts in one workspace',
          'Drag-and-drop ingestion that streams huge CSV/JSON files into browser memory',
          'Single-threaded DuckDB-Wasm pipeline running relational SQL inside the tab',
          'Compression pipeline exporting query results into binary Parquet on local storage',
        ],
        concepts: [
          'Running WebAssembly database workers off the main thread inside client-side tabs',
          "Streaming 500MB+ files into memory without locking the browser's UI thread",
          'Hand-writing Canvas/SVG chart rendering directly from query results, no chart libraries',
        ],
        weeks: [
          { tag: 'MOD 01', title: 'The UI Shell', body: 'Responsive workspace: table tree viewer on the left, SQL editor in the middle, dynamic SVG charts at the bottom.' },
          { tag: 'MOD 02', title: 'The Ingestion Module', body: 'Browser drag-and-drop boundary that asynchronously streams large local CSV/JSON files into memory.' },
          { tag: 'MOD 03', title: 'The Core Analytics Layer', body: 'Single-threaded DuckDB-Wasm pipeline executing standard relational SQL inside the browser tab.' },
          { tag: 'MOD 04', title: 'The Compression Pipeline', body: 'File exporter converting text rows into binary Parquet structures written to local storage.' },
        ],
        stack: ['Next.js (Static)', 'TypeScript', 'Tailwind CSS', 'DuckDB-Wasm', 'IndexedDB'],
      },
      problem: 'Ad-hoc analysis of a large CSV or JSON export usually means spinning up a database, writing an ingestion script, or fighting spreadsheet row limits — just to answer one query. That friction kills the habit of actually looking at the data.',
      solution: 'NanoLake runs DuckDB compiled to WebAssembly directly in a background worker, so dropping a 500MB CSV onto the page gets you a real SQL engine without leaving the tab. Query results render through hand-written SVG charts, and anything worth keeping exports straight to compressed Parquet in local storage — the whole pipeline never touches a server.',
      architecture: [
        { label: 'Client UI', nodes: [
          { title: 'Table Tree Viewer', sub: 'Schema browser' },
          { title: 'SQL Editor', sub: 'Query input' },
          { title: 'SVG Chart Renderer', sub: 'Hand-written, no libs' },
        ]},
        { label: 'Wasm Runtime', nodes: [
          { title: 'DuckDB-Wasm Worker', sub: 'Off-main-thread SQL' },
          { title: 'Ingestion Stream', sub: 'Chunked file reader' },
        ]},
        { label: 'Storage', nodes: [
          { title: 'Browser Memory', sub: 'In-tab tables' },
          { title: 'Parquet Export', sub: 'Binary compression' },
          { title: 'IndexedDB', sub: 'Local persistence', soft: true },
        ]},
      ],
      images: [
        { caption: 'Workspace — table tree, SQL editor, live chart', text: 'Screenshot+1' },
        { caption: 'Ingesting a 500MB CSV without blocking the UI', text: 'Screenshot+2' },
        { caption: 'Parquet export from a query result', text: 'Screenshot+3' },
      ],
      readme: `# NanoLake\n\nA local-first analytics workspace running SQL directly on huge CSV/JSON files in the browser.\n\n## Stack\n\n- Next.js (static export)\n- DuckDB-Wasm (in-tab SQL engine)\n- IndexedDB (local persistence)\n- Hand-written Canvas/SVG charts\n\n## Modules\n\n\`\`\`\nui/          table tree · SQL editor · charts\ningest/      drag-and-drop streaming ingestion\nwasm/        DuckDB-Wasm worker\nexport/      Parquet compression pipeline\n\`\`\`\n`,
    },
    {
      code: 'P53', slug: 'flexsql-workbench', year: 2026, type: 'personal',
      title: 'FlexSQL Workbench',
      org: 'Personal', duration: '4 weeks',
      pitch: 'AST lexer engine · DAG dependency resolver · Generator-based mock data factory',
      tag: '🏭 Dev Tooling',
      github: GH,
      overview: {
        blurb: 'A database blueprint compiler that turns raw CREATE TABLE scripts into realistic, relationally-consistent mock datasets.',
        features: [
          'Split-pane workspace: CREATE TABLE script input, generated .sql/.csv output',
          'AST lexer engine parsing raw DDL into column types and structural constraints',
          'Dependency resolver ordering table generation so root tables build before dependents',
          'Async generator pipeline streaming data batches to avoid blowing up browser memory',
        ],
        concepts: [
          'Building an AST parser that turns raw SQL DDL into structured JSON',
          'Topological sort (DAG resolution) to auto-order relational table generation',
          'JavaScript generator functions (function*) to write large files without OOM errors',
        ],
        weeks: [
          { tag: 'MOD 01', title: 'The Workspace Layout', body: 'Split-pane text grid: left is the CREATE TABLE script input, right is the generated .sql/.csv output.' },
          { tag: 'MOD 02', title: 'The AST Lexer Engine', body: 'Compiler function that analyzes raw DDL input, matches column types, and tracks structural boundaries.' },
          { tag: 'MOD 03', title: 'The Hierarchy Resolver', body: "Sorting algorithm computing dependency order so root tables (e.g. users) generate before dependents (e.g. orders)." },
          { tag: 'MOD 04', title: 'The Async Generator Matrix', body: "Streaming factory producing mock data batches incrementally to protect the host machine's memory." },
        ],
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Local Storage API'],
      },
      problem: 'Seeding a relational schema with believable test data usually means either writing one-off faker scripts per table, or hand-editing foreign keys until nothing violates a constraint. Neither approach scales past a handful of tables.',
      solution: 'FlexSQL Workbench parses a pasted CREATE TABLE script into an AST, resolves the dependency graph between tables so foreign keys always generate after the rows they reference, and streams realistic mock data out through JavaScript generators — keeping memory flat no matter how large the dataset gets.',
      architecture: [
        { label: 'Input', nodes: [
          { title: 'DDL Editor', sub: 'CREATE TABLE input' },
          { title: 'AST Lexer', sub: 'Tokenize + parse' },
        ]},
        { label: 'Resolution', nodes: [
          { title: 'Dependency Graph', sub: 'DAG builder' },
          { title: 'Topological Sort', sub: 'Generation order' },
        ]},
        { label: 'Output', nodes: [
          { title: 'Async Generator', sub: 'Batched mock rows' },
          { title: 'SQL / CSV Export', sub: 'Downloadable output' },
          { title: 'Local Storage', sub: 'Saved scripts', soft: true },
        ]},
      ],
      images: [
        { caption: 'Split-pane workspace — DDL input and generated output', text: 'Screenshot+1' },
        { caption: 'Dependency graph resolving table generation order', text: 'Screenshot+2' },
        { caption: 'Streaming generator producing a large mock dataset', text: 'Screenshot+3' },
      ],
      readme: `# FlexSQL Workbench\n\nTurns raw CREATE TABLE scripts into realistic, relationally-consistent mock datasets.\n\n## Stack\n\n- Next.js\n- TypeScript\n- Local Storage API (saved scripts)\n\n## Pipeline\n\n\`\`\`\nDDL input → AST lexer → dependency graph → topological sort\n          → async generator → .sql / .csv export\n\`\`\`\n`,
    },
    {
      code: 'P54', slug: 'titandb', year: 2026, type: 'personal',
      title: 'TitanDB — Slotted-Page Storage Engine & B+Tree',
      org: 'Personal · Systems', duration: '4 weeks',
      pitch: 'Slotted-page storage · Disk-backed B+Tree · WAL durability · ACID from scratch',
      tag: '💾 Database Systems',
      github: GH,
      overview: {
        blurb: 'A from-scratch, disk-backed database storage engine implementing the same B+Tree, WAL, and page-buffer architecture as SQLite and Postgres.',
        features: [
          'AST parser tokenizing SQL into logical execution commands',
          'Buffer Pool manager + slotted-page layout on 4KB binary byte arrays',
          'Write-Ahead Log (WAL) with LSN tracking for crash recovery and ACID durability',
          'Disk-backed B+Tree mapping primary keys to page numbers with node splitting and rebalancing',
          'Zero-fragmentation variable-length tuple storage with slot offset directory',
        ],
        concepts: [
          'Low-level binary: Uint8Array and DataView byte-precise I/O',
          'ACID durability: crash recovery, LSN, atomic fsync sync',
          'Slotted pages for variable-length rows with slot directory',
          'B+Tree node splitting, merging, and page allocation',
        ],
        stack: ['TypeScript', 'Node.js', 'Uint8Array', 'DataView', 'Node fs/promises', 'IndexedDB / OPFS'],
      },
      problem: 'Most software engineers treat SQL databases as opaque black boxes. When locking conflicts, write-ahead log stalls, or index bloat impact high-throughput production workloads, developers lack the low-level intuition on disk layouts, byte offsets, and buffer-pool caching to diagnose I/O bottlenecks.',
      solution: 'TitanDB implements the storage and durability foundation of SQLite and Postgres from scratch in TypeScript. It organizes disk records into 4KB slotted binary pages to eliminate fragmentation, maintains an append-only Write-Ahead Log (WAL) with Log Sequence Numbers (LSN) for ACID durability, and indexes row keys via a disk-backed B+Tree that handles page splits and merges.',
      architecture: [
        { label: 'Parser & Execution', nodes: [
          { title: 'SQL Lexer & Parser', sub: 'AST tokenization' },
          { title: 'Query Execution Engine', sub: 'Iterator / Volcano model' },
        ]},
        { label: 'Buffer & Index', nodes: [
          { title: 'Disk-backed B+Tree', sub: 'Page split & merge index' },
          { title: 'Buffer Pool Manager', sub: 'LRU clock eviction & pin count' },
        ]},
        { label: 'Storage & Durability', nodes: [
          { title: 'Write-Ahead Log (WAL)', sub: 'LSN append-only redo log' },
          { title: 'Slotted Page Engine', sub: '4KB binary arrays (DataView)' },
          { title: 'Disk / OPFS', sub: 'Atomic fsync & binary file I/O' },
        ]},
      ],
      images: [
        { caption: '4KB slotted-page binary layout with slot directory', text: 'Slotted+Page' },
        { caption: 'B+Tree node split and page balancing visualization', text: 'B+Tree+Split' },
        { caption: 'WAL replay path and crash recovery execution', text: 'WAL+Recovery' },
      ],
      readme: `# TitanDB\n\nA from-scratch, disk-backed database storage engine implementing the same B+Tree, WAL, and page-buffer architecture as SQLite and Postgres.\n\n## Architecture\n\n- **Slotted-Page Storage**: 4KB fixed binary pages with header, slot array, and variable-length record data.\n- **Disk-backed B+Tree**: Multi-level index mapping row keys to Page Numbers, supporting node splits and merges.\n- **Write-Ahead Log (WAL)**: Append-only log with Log Sequence Numbers (LSN) guaranteeing crash recovery before dirty page flush.\n- **Buffer Pool**: Memory manager with LRU clock eviction and page pin tracking.\n\n## Stack\n\n- TypeScript / Node.js\n- Low-level byte manipulation: Uint8Array & DataView\n- Node fs/promises & IndexedDB / OPFS\n`,
    },
    {
      code: 'P55', slug: 'devlog-catalyst', year: 2026, type: 'personal',
      title: 'DevLog Catalyst — Offline-First Developer Journal',
      org: 'Personal', duration: '4 weeks',
      pitch: 'Offline-first PWA · Markdown parser · Contribution grid · OPFS + Supabase sync',
      tag: '⚡ Offline PWA',
      github: GH,
      overview: {
        blurb: 'An offline-first developer journal that turns Markdown notes into a GitHub-style contribution graph of personal engineering learning.',
        features: [
          'Modular sidebar configuring personal vs coding project learning streams',
          'Fast Markdown processor scanning tasks, timestamps, and hashtags into structured records',
          'Interactive SVG contribution matrix visualizing daily learning streaks',
          'Dual-layer persistence: local IndexedDB cache with transparent Supabase cloud backup',
          'Origin Private File System (OPFS) integration for high-performance offline document access',
        ],
        concepts: [
          'Offline-First: write to browser first, always responsive without network',
          'Origin Private File System (OPFS) for fast local binary file access',
          'Text marker parsing converting raw markdown into relational graphs',
        ],
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'IndexedDB', 'OPFS', 'Supabase', 'PWA'],
      },
      problem: 'Developer learning logs and project notes are scattered across private markdown files and hosted SaaS tools. When offline, remote note-taking apps fail completely, and simple static files lack streak tracking and cross-topic knowledge discovery.',
      solution: 'DevLog Catalyst functions as an offline-first PWA using the Origin Private File System (OPFS) and IndexedDB to deliver instant writes and full local access without an active internet connection. It parses hashtags and timestamps in real time into an interactive SVG contribution heatmap, and seamlessly synchronizes state to Supabase when reconnected.',
      architecture: [
        { label: 'UI Layer', nodes: [
          { title: 'Next.js PWA', sub: 'Tailwind · Service Worker' },
          { title: 'Contribution Grid', sub: 'Interactive SVG matrix' },
        ]},
        { label: 'Parsing & Indexing', nodes: [
          { title: 'Markdown Parser', sub: 'Hashtag & timestamp extractor' },
          { title: 'Local Search Index', sub: 'Fast in-browser fuzzy search' },
        ]},
        { label: 'Local & Remote Sync', nodes: [
          { title: 'OPFS / IndexedDB', sub: 'Zero-latency local persistence' },
          { title: 'Supabase Sync Engine', sub: 'Background delta sync' },
        ]},
      ],
      images: [
        { caption: 'Contribution matrix tracking engineering learning streaks', text: 'Contribution+Grid' },
        { caption: 'Markdown editor with hashtag auto-linking and task parsing', text: 'Markdown+Editor' },
        { caption: 'Offline sync status and local OPFS file tree', text: 'Offline+Sync' },
      ],
      readme: `# DevLog Catalyst\n\nAn offline-first developer journal that turns Markdown notes into a GitHub-style contribution graph of your own learning.\n\n## Stack\n\n- Next.js (PWA)\n- TypeScript & Tailwind CSS\n- Origin Private File System (OPFS) & IndexedDB\n- Supabase (cloud backup & sync)\n\n## Features\n\n- Zero-latency local editing\n- Real-time Markdown parser for tasks and tags\n- Interactive SVG contribution heatmap\n- Seamless offline-to-cloud sync\n`,
    },
    {
      code: 'P56', slug: 'resume-portfolio', year: 2026, type: 'personal',
      title: 'Resume-to-Portfolio Generator',
      org: 'Personal · AI', duration: '6 weeks',
      pitch: 'pdf.js extraction · AI JSON structuring · Multi-theme renderer · Supabase deploy',
      tag: '📄 AI Systems',
      github: GH,
      overview: {
        blurb: 'A tool that turns a dropped-in resume PDF into a live, shareable developer portfolio site in minutes — the demo is the product.',
        features: [
          'Client-side PDF parser (pdf.js Web Worker) with live document preview',
          'AI structuring engine converting raw text into a strictly validated JSON schema',
          'Six-section themeable component tree with inline contentEditable editing',
          'Multi-theme switcher (Terminal Dark, Sleek Minimalist, Modern Gradient)',
          'Drag-and-drop section reordering powered by dnd-kit',
          'Supabase deployment engine publishing instantly to public /p/[slug] routes',
        ],
        concepts: [
          'Client-side WASM parsing for zero-upload document ingestion',
          'Structured JSON extraction using LLMs with schema validation retry loops',
          'Dynamic multi-theme component rendering and client-side site generation',
        ],
        weeks: [
          { tag: 'WK 01', title: 'PDF Parser + Preview', body: 'pdf.js drag-and-drop zone with Web Worker extraction and multi-column layout preview.' },
          { tag: 'WK 02', title: 'AI Structuring Engine', body: 'JSON schema definition, extraction prompt engineering, and validation retry on parse failure.' },
          { tag: 'WK 03', title: 'First Theme + Tree', body: '6 section components, Terminal Dark theme, and contentEditable inline editing.' },
          { tag: 'WK 04', title: 'Themes + Switcher', body: '4 additional themes, live theme switcher, and dnd-kit section reordering.' },
          { tag: 'WK 05', title: 'Supabase + Deploy', body: 'portfolios table with RLS, slug availability checker, and /p/[slug] edge rendering.' },
          { tag: 'WK 06', title: 'Polish & Self-Host', body: 'View counter, export flow, and generating your own portfolio as the live demo.' },
        ],
        stack: ['Next.js', 'TypeScript', 'pdf.js', 'Gemini Flash', 'Supabase', 'dnd-kit', 'Tailwind CSS'],
      },
      problem: 'Software engineers spend weeks coding personal portfolio websites from scratch or battling bulky CMS templates, repetitively re-formatting the exact same experience, project, and education details already refined on their resumes.',
      solution: 'Resume-to-Portfolio Generator parses any uploaded resume PDF directly inside the browser using a pdf.js Web Worker, uses an LLM to extract and validate the contents into a structured JSON schema, renders the data across polished themes with inline editing, and deploys it to a permanent Supabase-hosted URL in seconds.',
      architecture: [
        { label: 'Ingestion & Worker', nodes: [
          { title: 'Dropzone & pdf.js', sub: 'Web Worker text extraction' },
          { title: 'Document Preview', sub: 'Canvas PDF viewer' },
        ]},
        { label: 'AI Structuring', nodes: [
          { title: 'Schema Validator', sub: 'Strict TypeScript JSON schema' },
          { title: 'AI Extraction Engine', sub: 'Gemini / Ollama prompt parser' },
        ]},
        { label: 'Theme Renderer', nodes: [
          { title: 'Component Tree', sub: 'Terminal, Minimal, Modern' },
          { title: 'Inline Editor', sub: 'dnd-kit section reordering' },
        ]},
        { label: 'Cloud Publishing', nodes: [
          { title: 'Supabase DB & RLS', sub: 'Portfolios table & slug check' },
          { title: 'Edge Deployment', sub: 'Live public route /p/[slug]' },
        ]},
      ],
      images: [
        { caption: 'Resume PDF dropzone and side-by-side text extraction', text: 'PDF+Extraction' },
        { caption: 'Live portfolio preview with theme selector and inline editing', text: 'Theme+Editor' },
        { caption: 'One-click deployed public portfolio with custom slug', text: 'Deployed+Site' },
      ],
      readme: `# Resume-to-Portfolio Generator\n\nA tool that turns a dropped-in resume PDF into a live, shareable developer portfolio site in minutes.\n\n## Stack\n\n- **Frontend**: Next.js 14, TypeScript, Tailwind CSS\n- **PDF Extraction**: pdf.js (Web Worker)\n- **AI Structuring**: Gemini Flash / Ollama\n- **Interactivity**: dnd-kit (drag-and-drop reordering)\n- **Storage & Deploy**: Supabase (Postgres + Auth + Storage)\n\n## Pipeline\n\n\`\`\`\nResume PDF → pdf.js Worker → Raw Text → AI Structuring Engine → JSON Schema\n          → Live Theme Preview → Inline Editing → One-click Supabase Deploy\n\`\`\`\n`,
    },
    {
      code: 'P57', slug: 'token-lens', year: 2026, type: 'personal',
      title: 'token · lens — Transformer Internals Explorer',
      org: 'Personal', duration: '3 weeks',
      pitch: 'Live BPE training · Hand-written transformer backprop · Attention visualization · Zero dependencies',
      tag: '🔍 AI / ML',
      github: GH,
      overview: {
        blurb: 'A single self-contained HTML page that trains a real BPE tokenizer and a tiny GPT-style transformer from scratch in the browser at page load, then makes tokenization, next-token prediction, and attention visually inspectable.',
        features: [
          'Live BPE tokenizer trainer (203 merges) with a replay slider that re-runs training from any step',
          'Hand-written 1-layer, 2-head transformer trained via manual backprop + Adam — no ML library',
          'Per-token surprise heatmap, top-5 next-token distribution, temperature-adjustable resampling',
          "SVG attention arcs/matrix view plus a generate mode that samples and re-analyzes its own output",
        ],
        concepts: [
          'Byte-pair encoding as frequency-driven subword merging, not hand-designed rules',
          'A full forward/backward pass — attention, residuals, feed-forward — in ~150 lines of plain JS',
          'Causal masking made visually obvious via the always-empty upper triangle of the attention matrix',
          'Cross-entropy loss as the literal training signal, rendered per-token as a heatmap',
        ],
        weeks: [
          { tag: 'MOD 01', title: 'Tokenizer Core', body: 'trainBPE/encodeWord run over a hand-written corpus, producing a 233-token vocabulary re-encoded live on every input.' },
          { tag: 'MOD 02', title: 'Transformer Core', body: 'Token embedding + positional encoding, 2-head causal self-attention with residual, feed-forward block, unembedding to softmax.' },
          { tag: 'MOD 03', title: 'Training Loop', body: 'Manual backprop through every layer above, gradient-clipped and updated with Adam over 1,100 steps of random 32-token windows.' },
          { tag: 'MOD 04', title: 'Inspector UI', body: 'Inference drives the surprise heatmap, top-5 + temperature reshaping, attention arcs/matrix, generate mode, and a seeded share link.' },
        ],
        stack: ['HTML/CSS/JS (No Deps)', 'Hand-Written Backprop', 'BPE Tokenizer', 'Adam Optimizer', 'SVG Attention Viz'],
      },
      problem: "Transformer internals are usually either a black box behind a library call, or a wall of matrix math with no way to poke at it — hard to build real intuition for attention and next-token prediction without building a framework yourself.",
      solution: 'token·lens trains a tiny BPE tokenizer and a real 1-layer transformer with hand-written forward/backward passes, entirely in the browser at page load — no PyTorch, no server. Every prediction exposes its per-token surprise, its top-5 distribution, and its attention pattern as an inspectable SVG, all reproducible from a single shareable URL.',
      architecture: [
        { label: 'Training (on load)', nodes: [
          { title: 'Corpus', sub: 'Hand-written text' },
          { title: 'BPE Trainer', sub: '203 merges' },
          { title: 'Transformer', sub: '1-layer, 2-head' },
        ]},
        { label: 'Manual Backprop', nodes: [
          { title: 'Forward Pass', sub: 'Attention · feed-forward' },
          { title: 'Backward Pass', sub: 'Gradients' },
          { title: 'Adam Optimizer', sub: '1,100 steps', soft: true },
        ]},
        { label: 'Inspector', nodes: [
          { title: 'Surprise Heatmap', sub: 'Per-token loss' },
          { title: 'Attention Viz', sub: 'SVG arcs / matrix' },
          { title: 'Generate Mode', sub: 'Sample + re-analyze' },
        ]},
      ],
      images: [
        { caption: 'Live BPE merge-replay slider', text: 'Screenshot+1' },
        { caption: 'Per-token surprise heatmap over generated text', text: 'Screenshot+2' },
        { caption: 'SVG attention arcs / matrix view', text: 'Screenshot+3' },
      ],
      readme: `# token · lens\n\nA zero-dependency, single-HTML-file transformer trained live in the browser at page load.\n\n## Stack\n\n- Plain HTML/CSS/JS — no framework, no ML library\n- Hand-written BPE tokenizer (203 merges)\n- Hand-written 1-layer, 2-head transformer with manual backprop + Adam\n\n## Open it\n\n\`\`\`\nopen index.html\n# trains on load, then explore tokenization / prediction / attention live\n\`\`\`\n`,
    },
    {
      code: 'P58', slug: 'glasshouse', year: 2026, type: 'personal',
      title: 'GlassHouse — Cross-Agent Observability Layer',
      org: 'Personal', duration: '4 weeks',
      pitch: 'Native CLI hooks · Cross-agent event schema · Hash-chained session log · Local-first replay viewer',
      tag: '👁️ Dev Tooling',
      github: GH,
      overview: {
        blurb: "A local-first observability layer that hooks natively into Claude Code, Codex CLI, and Gemini CLI, normalizes every tool-use event into one hash-chained schema, and replays a session's full audit trail offline.",
        features: [
          'Recorder core normalizing agent-native hook JSON into one GlasshouseEvent schema, SHA-256 hash-chained',
          "Three thin shims (claude-shim, codex-shim, gemini-shim) translating each CLI's native hook payload",
          "Git-diff fallback watcher covering Codex's blind spot — apply_patch writes never reach its hooks",
          'CLI with init (auto-config), serve (live WS viewer), and verify (offline hash-chain integrity check)',
        ],
        concepts: [
          'Every major coding CLI now ships native lifecycle hooks — no more fragile stdout-parsing wrappers',
          'Hook coverage gaps differ per agent and have to be designed around, not assumed away',
          'Hash-chained JSONL as a tamper-evident local audit log, verifiable without a server or browser',
          "One canonical event schema decouples the replay/viewer layer from any single agent's quirks",
        ],
        weeks: [
          { tag: 'MOD 01', title: 'Recorder Core', body: 'Hash-chain + JSONL writer, fully agent-agnostic — the shared backbone every shim writes into.' },
          { tag: 'MOD 02', title: 'Agent Shims', body: "Pure functions mapping each CLI's native hook JSON into one GlasshouseEvent shape." },
          { tag: 'MOD 03', title: 'Codex File-Watch Fallback', body: "fs.watch/chokidar diffed against git to catch the apply_patch file writes Codex's own hooks can't see." },
          { tag: 'MOD 04', title: 'CLI + Viewer', body: 'glasshouse init auto-configures hooks; glasshouse serve tails the log into a live WS replay viewer; glasshouse verify re-checks the hash chain offline.' },
        ],
        stack: ['Node.js / TypeScript', 'Claude Code Hooks', 'Codex CLI Hooks', 'Gemini CLI Hooks', 'SHA-256 Hash Chain', 'chokidar'],
      },
      problem: "Every coding agent CLI logs differently, and Codex's own hooks silently miss file edits made through apply_patch — meaning a wrapper trusting hooks alone has a blind spot it doesn't know about. There was no single audit trail that worked the same way across Claude Code, Codex, and Gemini CLI.",
      solution: "GlassHouse normalizes every agent's native hook payload into one GlasshouseEvent schema through per-agent shims, hash-chains each event into a tamper-evident session.jsonl, and layers a git-diff watcher on top of Codex specifically to catch the file writes its hooks can't see. glasshouse serve replays any session live over WebSocket; glasshouse verify re-checks the hash chain fully offline.",
      architecture: [
        { label: 'Agent CLIs', nodes: [
          { title: 'Claude Code', sub: 'settings.json hooks' },
          { title: 'Codex CLI', sub: 'hooks.json (shell only)' },
          { title: 'Gemini CLI', sub: '.gemini/settings.json' },
        ]},
        { label: 'Normalization', nodes: [
          { title: 'Agent Shims', sub: 'claude · codex · gemini' },
          { title: 'Git-Diff Watcher', sub: 'Codex fallback' },
          { title: 'Recorder Core', sub: 'Hash-chain writer' },
        ]},
        { label: 'Output', nodes: [
          { title: 'session.jsonl', sub: 'Hash-chained log' },
          { title: 'Live WS Viewer', sub: 'glasshouse serve' },
          { title: 'Integrity Check', sub: 'glasshouse verify', soft: true },
        ]},
      ],
      images: [
        { caption: 'Live session replay viewer', text: 'Screenshot+1' },
        { caption: 'Hash-chain integrity check output', text: 'Screenshot+2' },
        { caption: 'Cross-agent event schema comparison', text: 'Screenshot+3' },
      ],
      readme: `# GlassHouse\n\nA local-first observability layer for Claude Code, Codex CLI, and Gemini CLI.\n\n## Stack\n\n- Node.js / TypeScript\n- Native hooks: Claude Code, Codex CLI, Gemini CLI\n- SHA-256 hash-chained JSONL session log\n\n## CLI\n\n\`\`\`\nglasshouse init      # detect installed agents, write hook config\nglasshouse serve      # tail session.jsonl into a live WS replay viewer\nglasshouse verify     # re-run the hash-chain integrity check offline\n\`\`\`\n`,
    },
    {
      code: 'P59', slug: 'arveend-os', year: 2026, type: 'personal',
      title: 'arveend_OS — Personal Command Center',
      org: 'Personal', duration: '3 weeks',
      pitch: 'Local-first PWA · WIP-limited kanban · Optional Firestore sync · Zero-build static app',
      tag: '🖥️ Personal Ops',
      github: GH,
      overview: {
        blurb: 'A personal command center — dashboard, project matrix, WIP-limited kanban, brain-dump inbox, icebox — built as a single static index.html with instant localStorage persistence and optional Google/Firestore cloud sync.',
        features: [
          'Dashboard, project matrix, WIP-limited kanban, brain-dump inbox, and icebox in one static HTML file',
          'Local-first persistence: every change written to localStorage instantly, works fully offline',
          'Optional cloud sync — Google sign-in + Firestore, per-user state gated by firestore.rules',
          'Export/import JSON snapshot round-trip as a manual backup path independent of any cloud provider',
        ],
        concepts: [
          'Local-first architecture: the browser is the source of truth, cloud sync is a strictly optional mirror',
          'WIP limits as an actual kanban constraint, not just a column count',
          'Static hosting with no build command as a deliberate constraint — zero infrastructure to keep running',
          "Firebase Authorized Domains as the one piece of cloud config that can't be skipped once sign-in is enabled",
        ],
        weeks: [
          { tag: 'MOD 01', title: 'Static App Shell', body: 'Dashboard, project matrix, kanban, inbox, and icebox views in one index.html — no build step, no framework.' },
          { tag: 'MOD 02', title: 'Local Persistence', body: 'localStorage read/write on every state change, verified working from a plain file:// open with no server running.' },
          { tag: 'MOD 03', title: 'Cloud Sync Layer', body: 'Firebase Auth (Google) + Firestore, per-user document at users/{uid}/os/state, firestore.rules enforcing access.' },
          { tag: 'MOD 04', title: 'Backup + Hosting', body: 'Export/import JSON snapshot buttons; deploy static to GitHub Pages; add the live domain to Firebase Authorized Domains.' },
        ],
        stack: ['Vanilla JS', 'LocalStorage', 'Firebase Auth', 'Firestore', 'GitHub Pages'],
      },
      problem: "Personal task and project tracking tools either demand a server and an account just to jot something down, or lock you into someone else's data model. What was needed was somewhere to dump ideas and track WIP that works instantly, offline, from a single file — with sync as a bonus, not a requirement.",
      solution: 'arveend_OS is one static index.html: dashboard, kanban, inbox, and icebox all persisted to localStorage on every change, so it works straight from file:// with zero setup. An optional Firebase Auth + Firestore layer mirrors that same state per-user when signed in, gated by firestore.rules, with JSON export/import as a manual fallback — the browser stays the source of truth either way.',
      architecture: [
        { label: 'App Shell', nodes: [
          { title: 'Dashboard', sub: 'Overview' },
          { title: 'Project Matrix', sub: 'All projects' },
          { title: 'Kanban', sub: 'WIP-limited' },
          { title: 'Inbox / Icebox', sub: 'Capture + defer' },
        ]},
        { label: 'Persistence', nodes: [
          { title: 'localStorage', sub: 'Instant, offline-first' },
          { title: 'JSON Export/Import', sub: 'Manual backup' },
        ]},
        { label: 'Optional Sync', nodes: [
          { title: 'Firebase Auth', sub: 'Google sign-in' },
          { title: 'Firestore', sub: 'users/{uid}/os/state' },
          { title: 'GitHub Pages', sub: 'Static hosting', soft: true },
        ]},
      ],
      images: [
        { caption: 'Dashboard overview', text: 'Screenshot+1' },
        { caption: 'WIP-limited kanban board', text: 'Screenshot+2' },
        { caption: 'Brain-dump inbox and icebox', text: 'Screenshot+3' },
      ],
      readme: `# arveend_OS\n\nA personal command center — dashboard, project matrix, kanban, inbox, icebox — as one static file.\n\n## Stack\n\n- Vanilla JS, no build step\n- localStorage (source of truth)\n- Firebase Auth + Firestore (optional sync)\n\n## Run\n\n\`\`\`\nopen index.html          # works offline, straight from file://\n\`\`\`\n`,
    },
    {
      code: 'H1', slug: 'factory-guardian', year: 2026, type: 'work', hackathon: true,
      title: 'Factory Guardian — Autonomous Incident Investigator',
      org: 'Agentic Cinema · Grafana Labs Track', duration: 'Hackathon 2026',
      pitch: 'Grafana Labs track submission · Google ADK · Gemini 2.5 · Root-cause causal tracing',
      tag: '🏆 Hackathon · Grafana Labs & Google Cloud',
      github: GH,
      projectUrl: 'https://devpost.com/software/factory-guardian?ref_content=user-portfolio&ref_feature=in_progress',
      overview: {
        blurb: 'An AI incident investigator for a factory production line built on the Grafana Labs track. When an alert fires on high API latency (a symptom), Factory Guardian traces system states across metrics, logs, and traces to pinpoint the real root cause four layers upstream at a degrading physical motor.',
        features: [
          'Reads Grafana alerts, querying Mimir metrics, Loki logs, and Tempo traces in unified multi-modal investigations',
          'Walks the causal stack to determine which signal moved first — cited evidence, never a guess',
          'Proposes targeted remediation, waits for human confirmation, then re-queries to empirically verify recovery',
          'Deterministic approval gate built directly into FunctionTool.run_async before remediation execution',
          'Engineered pacing and 9-tool filtering working within Gemini free-tier 250k tokens/min budget',
          'Verified recovery: API latency 6,834 ms → 199 ms, Error rate 14.8% → 0.20%, Motor temp 97.8°C → 66.7°C',
        ],
        concepts: [
          'Agentic telemetry workflows using local mcp-grafana over stdio',
          'Causal dependency graph traversal across distributed traces',
          'Human-in-the-loop safety gating inside async tool execution',
          'Deterministic plant simulator: 1 hidden variable driving 7 derived signals',
        ],
        stack: ['Google ADK', 'Gemini 2.5', 'Grafana Cloud', 'Mimir', 'Loki', 'Tempo', 'OpenTelemetry', 'MCP', 'Python'],
      },
      problem: 'When production alerts fire on API latency or saturation spikes, on-call teams scramble through disconnected monitoring dashboards trying to find what broke. API slowdowns are often secondary symptoms caused by deep physical hardware failures (e.g. motor overheating or thread pool starvation) that raw log search alone cannot correlate.',
      solution: 'Factory Guardian orchestrates Gemini 2.5 through Google ADK and an in-process InMemoryRunner to query Grafana Cloud via local stdio MCP. It analyzes time offsets across metrics, logs, and traces to identify the exact initial failure point, presents evidence-backed root cause diagnosis to a human operator, and upon approval triggers remediation and validates system stabilization.',
      architecture: [
        { label: 'Telemetry & Ingestion', nodes: [
          { title: 'Grafana Alert', sub: 'Webhook trigger' },
          { title: 'OpenTelemetry', sub: 'Mimir · Loki · Tempo' },
          { title: 'Plant Simulator', sub: 'simulator.py (1 var → 7 signals)' },
        ]},
        { label: 'Agent Core & Reasoning', nodes: [
          { title: 'Google ADK', sub: 'InMemoryRunner loop' },
          { title: 'Gemini 2.5', sub: 'Multi-modal root cause analysis' },
          { title: 'Token Pacer', sub: '9-tool filter & result truncation' },
        ]},
        { label: 'Tooling & Safety', nodes: [
          { title: 'mcp-grafana', sub: 'Local stdio MCP server' },
          { title: 'Approval Gate', sub: 'FunctionTool.run_async human check' },
          { title: 'Remediation Executor', sub: 'Motor cool-down & pool reset' },
        ]},
      ],
      images: [
        { caption: 'Grafana Cloud telemetry dashboard during peak incident', text: 'Telemetry+Peak' },
        { caption: 'Gemini root-cause trace analysis and cited evidence', text: 'Root+Cause+Analysis' },
        { caption: 'Verified recovery metrics: Latency 6,834ms → 199ms', text: 'Recovery+Metrics' },
      ],
      readme: `# Factory Guardian\n\nSubmission to Agentic Cinema: The Blockbuster Hackathon (Grafana Labs track).\n\n## Verified Recovery Results\n\n| Metric | Peak Incident | After Remediation |\n| :--- | :--- | :--- |\n| **API latency** | 6,834 ms | **199 ms** |\n| **API error rate** | 14.8% | **0.20%** |\n| **DB pool in use** | 100% | **39.1%** |\n| **Motor temperature** | 97.8°C | **66.7°C** |\n| **Factory throughput** | 575 / hr | **966 / hr** |\n\n## Architecture Highlights\n\n- **Agent Framework**: Google ADK + Gemini 2.5 via in-process \`InMemoryRunner\`\n- **Tool Integration**: \`mcp-grafana\` connected over local \`stdio\`\n- **Safety Gate**: Approval check enforced directly inside \`FunctionTool.run_async\` before remediation executes\n- **Telemetry**: OpenTelemetry reporting to Grafana Cloud (Mimir metrics, Loki logs, Tempo distributed traces)\n`,
    },
    {
      code: 'H2', slug: 'glasshouse-hackathon', year: 2026, type: 'personal', hackathon: true,
      title: 'Glasshouse — Cryptographic Agent Flight Recorder',
      org: 'OpenAI Build Week', duration: 'Hackathon 2026',
      pitch: 'OpenAI Build Week submission · SHA-256 hash-chained session log · Zero-backend offline replay',
      tag: '🏆 Hackathon · OpenAI',
      github: GH,
      overview: {
        blurb: 'A flight recorder for coding AI agents — captures what an agent actually did during a session (never its hidden reasoning), and links every event into a tamper-evident cryptographic chain you can replay and verify completely offline.',
        features: [
          'Records observable actions only: file reads/writes, commands, output, test runs — no private reasoning or secrets',
          'Every event hash-chains to its predecessor: SHA256(prev_hash + timestamp + payload)',
          'Editing, deleting, or reordering any event breaks the chain from that point forward',
          'Replays as one self-contained ~29KB HTML file — zero backend, zero network, opens directly from file://',
          'Codex CLI support via a wrapper around codex exec --json',
          'Claude Code support via native settings.json hooks (PreToolUse, PostToolUse, Stop)',
          'Agent-neutral format: any recorder emitting a valid chain replays in the same viewer',
        ],
        concepts: [
          'Tamper-evident append-only cryptographic ledger mechanics',
          'Agent-agnostic observability and normalized event schemas',
          'Pure client-side zero-dependency SHA-256 implementation in JavaScript',
        ],
        stack: ['SHA-256 hash chain', 'Codex CLI', 'Claude Code Hooks', 'Next.js', 'pnpm monorepo', 'Self-contained HTML'],
      },
      problem: 'AI coding agents execute dozens of terminal commands and file edits autonomously. When an unexpected file mutation or vulnerability occurs, reviewing flat logs is unreliable: logs can be tampered with or truncated, and reviewers cannot prove whether the agent executed what it claimed without tedious manual reproduction.',
      solution: 'Glasshouse acts as an immutable flight recorder. By intercepting native agent hooks (Claude Code settings.json and Codex CLI JSON stream), it normalizes events into an append-only JSONL log where every entry is cryptographically SHA-256 hash-chained to the prior event. It packages the session into an ultra-compact ~29KB single-file HTML viewer that replays and validates the cryptographic chain completely offline.',
      architecture: [
        { label: 'Agent Hooks & Shims', nodes: [
          { title: 'Claude Code Hooks', sub: 'PreToolUse · PostToolUse · Stop' },
          { title: 'Codex CLI Shim', sub: 'codex exec --json wrapper' },
          { title: 'AgentAdapter Contract', sub: 'Extensible agent connector' },
        ]},
        { label: 'Recorder Engine', nodes: [
          { title: 'Action Normalizer', sub: 'GlasshouseEvent schema' },
          { title: 'Hash Chainer', sub: 'SHA256(prev + time + data)' },
          { title: 'Tamper-Evident Ledger', sub: 'session.jsonl' },
        ]},
        { label: 'Offline Replay & Verification', nodes: [
          { title: 'Standalone HTML Viewer', sub: '~29KB zero-dependency bundle' },
          { title: 'Hash Chain Verifier', sub: 'Offline integrity checker' },
          { title: 'Local Replay Engine', sub: 'Step-by-step file & shell diffs' },
        ]},
      ],
      images: [
        { caption: 'Offline replay viewer demonstrating step-by-step tool execution', text: 'Glasshouse+Viewer' },
        { caption: 'Tamper-evident SHA-256 cryptographic hash-chain inspection', text: 'Hash+Chain' },
        { caption: 'Terminal session recorder hooking into Claude Code & Codex CLI', text: 'CLI+Hooks' },
      ],
      readme: `# Glasshouse\n\nSubmission to OpenAI Build Week (2026).\n\n## Overview\n\nA local-first, tamper-evident flight recorder for coding AI agents (Claude Code, Codex CLI, Gemini CLI).\n\n## Core Mechanics\n\n- **Observable Actions Only**: Records commands, file reads/writes, test results. Never records hidden thoughts or API keys.\n- **Cryptographic Hash Chain**: Every event is hashed with \`SHA256(prev_hash + timestamp + payload)\`. Any tampering breaks the chain.\n- **Zero-Backend Offline Replay**: Generates a self-contained ~29KB HTML file that opens from \`file://\` without any server.\n\n## CLI Usage\n\n\`\`\`bash\nglasshouse init      # detect installed agents, configure native hooks\nglasshouse serve     # tail session.jsonl into a live WS replay viewer\nglasshouse verify    # re-run hash-chain integrity check fully offline\n\`\`\`\n`,
    },
    {
      code: 'H3', slug: 'nadi', year: 2026, type: 'personal', hackathon: true,
      title: 'Nadi — Culturally-Aware AI Health Companion',
      org: 'Google DeepMind & Google Cloud', duration: 'Hackathon 2026',
      pitch: 'Build with AI: Gemini Hackathon · Kuala Lumpur · Nutrition & Training for Malaysia',
      tag: '🏆 Hackathon · Google DeepMind',
      github: GH,
      overview: {
        blurb: 'A culturally-aware AI health companion for Malaysia — addressing the highest obesity rate in Southeast Asia — built around the hidden caloric load in local staples like nasi lemak and roti canai, and the tropical heat that makes outdoor training grueling.',
        features: [
          'Meal AI: Gemini 2.5 Flash Vision identifies Malaysian dishes from photos with ingredient-aware nutrition breakdowns',
          'Run Analyzer: processes Strava JSON for AI-powered performance insight, fatigue detection, and heat recovery advice',
          'Health Dashboard: visualizes VO2 Max and weekly mileage to track "Nadi" (pulse) trends over time',
          'Ingredient-level caloric breakdown accounting for santan (coconut milk) and palm oil density in local street foods',
          'Heat-acclimated hydration and pacing guidance tailored to equatorial temperature and humidity',
        ],
        concepts: [
          'Multimodal computer vision calibrated on Southeast Asian cuisine',
          'Biometric timeseries modeling over Strava activity streams (spun out of RunTrack)',
          'Culturally localized health algorithms vs one-size-fits-all Western fitness metrics',
        ],
        stack: ['Next.js', 'FastAPI', 'Python', 'Gemini 2.5 Flash', 'Supabase', 'Strava API', 'Chart.js'],
      },
      problem: 'Malaysia has the highest adult obesity rate in Southeast Asia. Western fitness applications fail locally because their food databases have zero understanding of local cooking (e.g. santan in nasi lemak, condensed milk in teh tarik), and their generic training recommendations do not account for high humidity and tropical thermal stress.',
      solution: 'Nadi provides a 3-pillar health platform built for Malaysia: Meal AI uses Gemini 2.5 Flash Vision to identify complex local dishes and quantify hidden calories; Run Analyzer ingests Strava JSON to calculate heat-stress impact and fatigue; and Health Dashboard tracks long-term cardiovascular health ("Nadi") with actionable medical and training guidance.',
      architecture: [
        { label: 'Client Application', nodes: [
          { title: 'Next.js Frontend', sub: 'PWA · Mobile-optimized' },
          { title: 'Health Dashboard', sub: 'Chart.js · VO2 / Pace curves' },
        ]},
        { label: 'Backend API', nodes: [
          { title: 'FastAPI Backend', sub: 'Python · Async service' },
          { title: 'Strava Webhook Sync', sub: 'Activity stream pipeline' },
        ]},
        { label: 'AI Intelligence Layer', nodes: [
          { title: 'Gemini 2.5 Flash Vision', sub: 'Malaysian food identification' },
          { title: 'Run Analyzer Engine', sub: 'Heat fatigue & recovery insight' },
        ]},
        { label: 'Database & Storage', nodes: [
          { title: 'Supabase Postgres', sub: 'User health history & metrics' },
          { title: 'Supabase Storage', sub: 'Meal snapshot image store' },
        ]},
      ],
      images: [
        { caption: 'Meal AI identifying Malaysian food with nutrition breakdown', text: 'Meal+AI+Vision' },
        { caption: 'Run Analyzer surfacing heat fatigue from Strava activity data', text: 'Run+Analyzer' },
        { caption: 'Health dashboard tracking VO2 Max and cardiovascular Nadi score', text: 'Health+Dashboard' },
      ],
      readme: `# Nadi\n\nSubmission to Build with AI: Gemini Hackathon · Google DeepMind (Kuala Lumpur, 2026).\n\n## Three Core Pillars\n\n1. **Meal AI**: Gemini 2.5 Flash Vision identifies local dishes (nasi lemak, roti canai, mee goreng) from photos with ingredient-level nutrition breakdowns.\n2. **Run Analyzer**: Ingests Strava activity streams to detect cardiac strain, hydration deficits, and heat-induced fatigue.\n3. **Health Dashboard**: Visualizes VO2 Max and weekly mileage to track cardiovascular "Nadi" (pulse) over time.\n\n## Stack\n\n- **Frontend**: Next.js (React), Tailwind CSS, Chart.js\n- **Backend**: Python, FastAPI, Supabase (PostgreSQL + Auth + Storage)\n- **AI**: Google Gemini 2.5 Flash (Vision & Prompt Analysis)\n- **Integrations**: Strava API\n`,
    },
    {
      code: 'H4', slug: 'agents-for-humans', year: 2026, type: 'personal', hackathon: true,
      title: 'Agents for Humans — Autonomous Task Orchestrator',
      org: 'Agents for Humans Hackathon · AWS', duration: 'Hackathon 2026',
      pitch: 'AWS · Strands Agents SDK · Autonomous background workflows with human decision gates',
      tag: '🏆 Hackathon · AWS & Strands',
      github: GH,
      overview: {
        blurb: 'Built on AWS and the Strands Agents SDK: an autonomous agent that handles routine, repetitive tasks in the background and only surfaces when there is a genuine decision to make — not another chatbot wrapper.',
        features: [
          'Autonomous multi-step background task execution loop without conversational overhead',
          'Interrupt engine alerting humans only when ambiguous decisions or approval gates occur',
          'Strands Agents SDK workflow state persistence and resumption',
          'Containerized deployment on AWS AgentCore with DynamoDB state backing',
          'Public repo under MIT license with complete architecture specifications',
        ],
        concepts: [
          'Asynchronous autonomous agent lifecycles vs interactive chat wrappers',
          'Confidence-bounded exception escalation and human-in-the-loop gates',
          'Stateful agent orchestration using Strands Agents SDK and AWS services',
        ],
        stack: ['AWS', 'Strands Agents SDK', 'AgentCore', 'Python', 'DynamoDB', 'Docker'],
      },
      problem: 'Most AI "agent" applications are conversational chatbot wrappers that force users to babysit every intermediate reasoning step, generating excessive token chatter instead of autonomously completing routine tasks.',
      solution: 'This project utilizes the Strands Agents SDK on AWS AgentCore to run autonomous task loops in the background. It executes deterministic workflows independently and only interrupts the user when an explicit approval threshold or decision branch requires human oversight.',
      architecture: [
        { label: 'Trigger & Ingestion', nodes: [
          { title: 'Event Triggers', sub: 'Webhook / Scheduled jobs' },
          { title: 'Context Assembler', sub: 'Session history & parameters' },
        ]},
        { label: 'Agent Runtime', nodes: [
          { title: 'Strands Agent Core', sub: 'Autonomous execution loop' },
          { title: 'Confidence Guardrails', sub: 'Decision-boundary evaluator' },
        ]},
        { label: 'Human-in-the-Loop', nodes: [
          { title: 'Interrupt Notification', sub: 'Surfaces only on ambiguity' },
          { title: 'Approval Gate', sub: 'Human override & policy check' },
        ]},
        { label: 'Cloud Infrastructure', nodes: [
          { title: 'AWS AgentCore', sub: 'Containerized agent host' },
          { title: 'DynamoDB / S3', sub: 'Durable execution state' },
        ]},
      ],
      images: [
        { caption: 'Autonomous agent execution loop running background workflows', text: 'Agent+Loop' },
        { caption: 'Human-in-the-loop decision gate surfacing upon confidence threshold', text: 'Approval+Gate' },
        { caption: 'AWS AgentCore deployment and execution telemetry', text: 'AWS+AgentCore' },
      ],
      readme: `# Agents for Humans\n\nSubmission to Agents for Humans Hackathon (AWS & Strands Agents SDK).\n\n## Overview\n\nAn agent that handles routine, repetitive tasks autonomously in the background and only surfaces when there is a genuine decision to make — not another chatbot wrapper.\n\n## Stack\n\n- **Cloud**: AWS (AgentCore, DynamoDB, S3)\n- **Agent Framework**: Strands Agents SDK (Python)\n- **Architecture**: Autonomous execution loop with confidence-bounded interrupt gates\n`,
    },
  ];

  PROJECTS.sort(function (a, b) { return (b.hackathon ? 1 : 0) - (a.hackathon ? 1 : 0) || b.year - a.year; });

  const GITHUB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>';

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inlineMd(s) {
    s = escapeHtml(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>');
    return s;
  }
  function renderMarkdown(md) {
    const lines = md.replace(/\\r\\n/g, '\\n').split('\\n');
    let html = '';
    let i = 0;
    let listBuffer = null;

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
        html += '<pre><code>' + escapeHtml(codeLines.join('\\n')) + '</code></pre>';
        i++;
        continue;
      }
      const h = line.match(/^(#{1,3})\\s+(.*)$/);
      if (h) {
        flushList();
        const level = h[1].length;
        html += '<h' + level + '>' + inlineMd(h[2]) + '</h' + level + '>';
        i++;
        continue;
      }
      const ol = line.match(/^\\d+\\.\\s+(.*)$/);
      if (ol) {
        if (listBuffer !== 'ol') { flushList(); html += '<ol>'; listBuffer = 'ol'; }
        html += '<li>' + inlineMd(ol[1]) + '</li>';
        i++;
        continue;
      }
      const ul = line.match(/^[-*]\\s+(.*)$/);
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

  function renderArchitecture(layers) {
    let out = '';
    layers.forEach(function (layer, idx) {
      out += '<div class="arch-layer"><div class="arch-layer-label">' + escapeHtml(layer.label) + '</div><div class="arch-nodes">';
      layer.nodes.forEach(function (n) {
        out += '<div class="arch-node' + (n.soft ? ' is-soft' : '') + '"><div class="arch-node-title">' + escapeHtml(n.title) + '</div><div class="arch-node-sub">' + escapeHtml(n.sub || '') + '</div></div>';
      });
      out += '</div></div>';
      if (idx < layers.length - 1) {
        out += '<div class="arch-connector"><svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="8" y1="1" x2="8" y2="15"/><path d="M3 11 L8 17 L13 11" fill="none"/></svg></div>';
      }
    });
    return out;
  }

  const rail = document.getElementById('project-rail');
  const detail = document.getElementById('project-detail');
  const search = document.getElementById('project-search');
  let activeType = 'all';
  let activeCode = PROJECTS.length ? PROJECTS[0].code : null;
  let query = '';

  function projectMatches(p) {
    if (activeType === 'hackathon') { if (!p.hackathon) return false; }
    else if (activeType !== 'all' && p.type !== activeType) return false;
    if (query) {
      const hay = (p.title + ' ' + p.pitch + ' ' + p.org + ' ' + (p.overview.stack || []).join(' ') + (p.hackathon ? ' hackathon' : '')).toLowerCase();
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
          (p.hackathon ? '<span class="row-badge">🏆 Hackathon</span>' : '') +
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

    const weeksHtml = p.overview.weeks ? ('<h4>Week-by-Week Breakdown</h4><ol class="week-list-plain" style="display:flex;flex-direction:column;gap:10px;">' +
      p.overview.weeks.map(function (w) {
        return '<li style="display:grid;grid-template-columns:70px 1fr;gap:16px;padding:12px 14px;background:var(--bg-alt);border:1px solid var(--border);border-radius:8px;font-size:14px;">' +
          '<span style="font-family:var(--font-mono);font-size:11.5px;color:var(--fg-faint);padding-top:2px;">' + w.tag + '</span>' +
          '<div><strong style="color:var(--fg);font-weight:600;">' + escapeHtml(w.title) + '</strong><p style="color:var(--fg-muted);font-size:13px;margin-top:4px;">' + escapeHtml(w.body) + '</p></div>' +
        '</li>';
      }).join('') + '</ol>') : '';

    const overviewHtml =
      '<p style="color:var(--fg-muted);font-size:15px;">' + escapeHtml(p.overview.blurb) + '</p>' +
      (p.overview.features ? '<h4>Features</h4><ul class="bullet-list">' + p.overview.features.map(function (f) { return '<li>' + escapeHtml(f) + '</li>'; }).join('') + '</ul>' : '') +
      '<h4>Core Concepts</h4><ul class="bullet-list">' + p.overview.concepts.map(function (c) { return '<li>' + escapeHtml(c) + '</li>'; }).join('') + '</ul>' +
      weeksHtml +
      (p.problem ? '<div class="callout-grid">' +
        '<div class="callout"><span class="callout-label">Problem</span><div class="callout-body"><p>' + escapeHtml(p.problem) + '</p></div></div>' +
        '<div class="callout"><span class="callout-label">Solution</span><div class="callout-body"><p>' + escapeHtml(p.solution) + '</p></div></div>' +
      '</div>' : '') +
      '<ul class="tag-list tag-strip">' + stackTags + '</ul>';

    const archHtml = p.architecture
      ? '<h4>System Architecture</h4><div class="arch-diagram">' + renderArchitecture(p.architecture) + '</div>'
      : '<div class="demo-empty">Architecture write-up coming soon.</div>';

    const demoHtml = p.images && p.images.length
      ? '<h4>Screenshots &amp; Demo</h4><div class="image-gallery">' + p.images.map(function (img, i) {
          const src = img.src ? img.src : ('https://placehold.co/640x400/4c6785/f8f7f3?text=' + img.text);
          return '<button class="gallery-item" type="button" data-caption="' + escapeHtml(img.caption) + '" data-project="' + p.code + '" data-idx="' + i + '">' +
            '<img src="' + src + '" alt="' + escapeHtml(img.caption) + '" loading="lazy" />' +
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
          (p.projectUrl ? '<a class="detail-github detail-project-link" href="' + p.projectUrl + '" target="_blank" rel="noopener"><span>View project ↗</span></a>' : '') +
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
    setCurrentTab(p.code, 'overview');
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

  document.querySelectorAll('.expandable').forEach(function (item) {
    const trigger = item.querySelector('.expander');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      const open = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

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