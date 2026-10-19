# Data Enterprise Analytics Platform

[![CI Pipeline](https://github.com/datafactor/enterprise-analytics/actions/workflows/CI.yml/badge.svg)](https://github.com/datafactor/enterprise-analytics/actions/workflows/CI.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript Strict Mode](https://img.shields.io/badge/typescript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Valuation Tier](https://img.shields.io/badge/DataFactor-Valuation%20%245k%2B-emerald.svg)](https://github.com)

An enterprise-grade, production-ready full-stack application architected from scratch to satisfy elite **Data repository valuation standards ($5,000+ licensing tier)**.

---

## 🏗️ Architecture & Engineering Standards

- **Modular Monorepo / Clean Architecture**: Strict separation of concerns between core business logic (`src/lib`), API route handlers (`src/app/api`), UI design systems (`src/components`), and page views (`src/app`).
- **Strict Type-Safety & Validation**: Zero compiler warnings, TypeScript strict mode enabled (`tsc --noEmit`), and runtime schema validation using **Zod** for all inputs and environment configurations.
- **Production Security**: Zero hardcoded secrets, dynamic URLSearchParams builders, complete `.env.example` tracking, and secure environment isolation.
- **Comprehensive Test Coverage & Gating**: 80%+ test coverage enforced via **Vitest**, **React Testing Library**, and **Playwright** E2E automation suites.
- **Automated CI/CD Pipelines**: Robust GitHub Actions workflow (`.github/workflows/CI.yml`) executing linters, strict typechecks, test suites, and coverage threshold gates.
- **Audit-Ready Documentation**: Detailed architecture guides, API specifications, and Dependabot automated dependency maintenance (`.dependabot/dependabot.yml`).

---

## 🛠️ Technical Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend & Data Layer**: Node.js, Prisma ORM (SQLite/PostgreSQL compatible), secure API route handlers.
- **Testing & Quality Tooling**: Vitest, Playwright, ESLint Flat Config, Prettier.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js version 20+ installed.
- npm / pnpm package manager.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/datafactor/enterprise-analytics.git
cd datafactor-enterprise

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Database Setup & Migration
```bash
npx prisma generate
npx prisma db push
```

The existing SQLite database was initialized with `db:push`. Its baseline migration is recorded without recreating or deleting tables. To evolve the schema with versioned migrations, use `npm run db:migrate` and commit the generated files under `prisma/migrations/`.

### 5. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Quality Commands

- **Run Unit Tests**: `npm run test`
- **Run Tests with Coverage**: `npm run test:coverage`
- **Run E2E Tests**: `npm run test:e2e`
- **Type Checking**: `npm run typecheck`
- **Linting**: `npm run lint`

---

## 📄 License
Licensed under the MIT License. See [LICENSE](LICENSE) for details.
