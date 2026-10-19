-- Baseline for the existing SQLite database initialized with `prisma db push`.
-- Mark this migration as applied with `prisma migrate resolve`; do not replay it.
CREATE TABLE "ValuationMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datasetName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "valuation" REAL NOT NULL,
    "confidence" REAL NOT NULL,
    "recordsCount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL DEFAULT 'system',
    "details" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
