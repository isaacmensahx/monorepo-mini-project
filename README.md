# 🃏 Card System — Turborepo Monorepo

A full-stack card management application built as a mini project, demonstrating production-quality engineering practices including config-driven rendering, Component Driven Development (CDD), analytics events, comprehensive testing, and CI/CD readiness.

---

## 📌 Story

> **As a user**, I want to manage simple cards with a title and description so I can organize my thoughts and information efficiently.

### Acceptance Criteria
- [x] I can **view** all cards on a responsive grid
- [x] I can **create** a new card with title + description
- [x] I can **edit** an existing card's title and/or description
- [x] I can **delete** a card with a confirmation dialog
- [x] All changes sync in real-time with the backend
- [x] I receive toast notifications for all CRUD operations
- [x] The UI is accessible with proper ARIA labels

### Acceptance Specifications
| Scenario | Input | Expected Output |
|---|---|---|
| Create card | Valid title + desc | Card appears in grid, success toast |
| Create card | Empty title | Validation error shown inline |
| Edit card | Updated fields | Card updates in-place, success toast |
| Delete card | Confirm dialog → Yes | Card removed, success toast |
| Delete card | Confirm dialog → Cancel | Card remains unchanged |
| Load page | API available | Cards load in responsive grid |
| Load page | API unavailable | Error toast shown |

### Implementation Plan
1. **Phase 1** — Monorepo scaffolding (Turborepo, workspaces, shared config)
2. **Phase 2** — Backend API (Express, DrizzleORM, MySQL, controllers/services/routes)
3. **Phase 3** — Frontend (React + Vite, MUI + Tailwind, config-driven CDD)
4. **Phase 4** — Analytics events (both FE and BE)
5. **Phase 5** — Tests (Jest, unit tests for services, controllers, components)
6. **Phase 6** — CI/CD (GitHub Actions: lint → test → build → deploy)

---

## 🗂️ Project Structure

```
card-system/
├── apps/
│   ├── api/                  # Node.js + Express + DrizzleORM backend
│   │   └── src/
│   │       ├── config/       # App configuration (config-driven)
│   │       ├── controllers/  # Request/response handlers
│   │       ├── services/     # Business logic
│   │       ├── routes/       # Route definitions
│   │       ├── db/           # Schema, migrations, connection
│   │       ├── analytics/    # Analytics event tracking
│   │       ├── middleware/   # Error handlers
│   │       └── __tests__/   # Jest unit tests
│   │
│   └── web/                  # React + Vite frontend
│       └── src/
│           ├── config/       # App config (config-driven rendering)
│           ├── components/   # CDD components (CardItem, CardGrid, etc.)
│           ├── hooks/        # Custom hooks (useCards)
│           ├── services/     # API client (axios)
│           ├── analytics/    # Frontend analytics events
│           ├── types/        # TypeScript interfaces
│           └── __tests__/   # Jest + RTL tests
│
├── .github/
│   └── workflows/
│       └── ci.yml            # CI/CD pipeline
├── turbo.json                # Turborepo pipeline config
└── package.json              # Monorepo root
```

---

## 🎯 Tech Stack

| Layer | Technology |
|---|---|
| **Monorepo** | Turborepo + npm workspaces |
| **Frontend** | React 18 + Vite |
| **UI Framework** | MUI v5 + Tailwind CSS |
| **State** | React hooks (useState, useEffect, useCallback) |
| **HTTP Client** | Axios |
| **Backend** | Node.js + Express |
| **ORM** | DrizzleORM |
| **Database** | MySQL |
| **Validation** | Zod (BE) + inline validation (FE) |
| **Testing** | Jest + ts-jest + React Testing Library |
| **CI/CD** | GitHub Actions |
| **Notifications** | react-hot-toast |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MySQL 8.0+ running locally
- npm >= 9

### 1. Clone & Install
```bash
git clone <your-repo>
cd card-system
npm install
```

### 2. Configure Environment

**Backend** — copy and edit:
```bash
cp apps/api/.env.example apps/api/.env
```

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=card_system
CORS_ORIGINS=http://localhost:5173
ANALYTICS_ENABLED=true
```

**Frontend** — copy and edit:
```bash
cp apps/web/.env.example apps/web/.env
```

```env
VITE_API_URL=/api/v1
VITE_ENABLE_ANALYTICS=true
```

### 3. Create Database
```bash
mysql -u root -p -e "CREATE DATABASE card_system;"
```

### 4. Run Migrations
```bash
cd apps/api
npm run db:migrate
```

### 5. Start Development
```bash
# From monorepo root — starts both api and web concurrently
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health check**: http://localhost:3001/health

---

## 🧪 Running Tests

```bash
# All tests (from root)
npm run test

# Backend tests only
cd apps/api && npm run test

# Frontend tests only
cd apps/web && npm run test

# With coverage
npm run test -- --coverage
```

### Test Coverage
- **Backend services**: CRUD operations, edge cases (not found, validation)
- **Backend controllers**: HTTP status codes, request validation, error propagation
- **Frontend components**: Render, user interactions, form validation, accessibility

---

## 📡 API Reference

**Base URL**: `http://localhost:3001/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cards` | Get all cards |
| `GET` | `/cards/:id` | Get card by ID |
| `POST` | `/cards` | Create new card |
| `PUT` | `/cards/:id` | Update card |
| `DELETE` | `/cards/:id` | Delete card |

### Request Body (POST/PUT)
```json
{
  "title": "My Card Title",
  "description": "My card description"
}
```

### Response Shape
```json
{
  "success": true,
  "data": {
    "id": "uuid-v4",
    "title": "My Card Title",
    "description": "My card description",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## ⚙️ Config-Driven Architecture

The app uses configuration objects to drive rendering behavior, making changes easy without touching component logic:

**Frontend** (`apps/web/src/config/app.config.ts`):
```ts
ui: {
  cardsPerRow: { xs: 1, sm: 2, md: 3, lg: 4 },   // Change grid layout here
  cardConfig: {
    showTimestamps: true,   // Toggle timestamp display
    showCardId: false,      // Toggle card ID badge
  },
  confirmDeleteDialog: true, // Toggle delete confirmation
}
```

**Backend** (`apps/api/src/config/index.ts`):
- Database connection, CORS, analytics toggle, pagination limits

---

## 📊 Analytics Events

### Frontend Events
| Event | Trigger |
|---|---|
| `page_viewed` | App mounts |
| `card_create_initiated` | "New Card" button clicked |
| `card_created` | Card successfully created |
| `card_edit_initiated` | Edit button clicked |
| `card_updated` | Card successfully updated |
| `card_delete_initiated` | Delete button clicked |
| `card_deleted` | Card successfully deleted |

### Backend Events
| Event | Trigger |
|---|---|
| `cards.listed` | GET /cards called |
| `card.viewed` | GET /cards/:id called |
| `card.created` | POST /cards succeeded |
| `card.updated` | PUT /cards/:id succeeded |
| `card.deleted` | DELETE /cards/:id succeeded |

> **Production**: Replace the `console.log` stubs with your analytics SDK (Segment, Mixpanel, PostHog, etc.)

---

## 🔄 CI/CD Pipeline

```
Push to develop/main
     │
     ▼
┌─────────────┐
│  Lint & Test│  ← All workspaces, MySQL service container
└─────────────┘
     │
     ▼
┌─────────────┐
│    Build    │  ← Turborepo cached build, artifacts uploaded
└─────────────┘
     │
   ┌─┴─────────────┐
   ▼               ▼
develop → Staging  main → Production
           │                │
           └── smoke test   └── release tag created
```

---

## 🚨 Rollback Plan

### Strategy 1: Git-Based Rollback (Recommended)
```bash
# 1. Find the last good release tag
git tag --sort=-creatordate | head -10

# 2. Create a rollback branch from that tag
git checkout -b rollback/v1.2.3 release-2024-01-15T10-00-00-000Z

# 3. Deploy the rollback branch through CI/CD
git push origin rollback/v1.2.3
# Trigger manual deploy via GitHub Actions
```

### Strategy 2: Artifact Rollback
GitHub Actions retains build artifacts for 7 days. Download and deploy a previous artifact directly:
```bash
# Use GitHub CLI to download a previous run's artifacts
gh run download <RUN_ID> --name api-dist
gh run download <RUN_ID> --name web-dist
```

### Strategy 3: Database Rollback
All schema changes must be backwards-compatible. For destructive migrations:
```bash
# Keep rollback SQL in migrations directory
# apps/api/src/db/migrations/rollback-YYYYMMDD.sql
mysql -u root -p card_system < rollback-20240115.sql
```

### Rollback Decision Matrix
| Severity | Action |
|---|---|
| UI bug only | Deploy hotfix branch |
| API regression | Redeploy previous API artifact, keep DB |
| DB corruption | Full rollback: code + data restore |
| Total outage | Rollback all layers + incident review |

---

## 🏗️ Component Driven Development (CDD)

Components are built in isolation from smallest → largest:

```
CardItem          ← Atomic: single card display + actions
  └── CardGrid    ← Molecule: card collection + empty/loading states
        └── App   ← Organism: full page with dialogs + header
```

Each component:
- Has clearly defined props interface
- Is independently testable
- Uses config for behavior customization
- Has proper ARIA labels for accessibility

---

## 📝 Future Improvements
- Add search/filter via config flag `features.enableSearch`
- Add card sorting options via config flag `features.enableSorting`  
- Add authentication (JWT)
- Add pagination
- Integrate real analytics platform
- Add E2E tests with Playwright
- Add Storybook for component documentation
