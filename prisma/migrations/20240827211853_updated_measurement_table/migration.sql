/*
  Warnings:

  - You are about to alter the column `confirmedValue` on the `measurements` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_measurements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "measureDatetime" DATETIME NOT NULL,
    "measureValue" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "measureUUID" TEXT NOT NULL,
    "confirmedValue" INTEGER NOT NULL DEFAULT 0,
    "hasConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "customer_code" TEXT NOT NULL,
    "measure_type_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "measurements_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customers" ("customerCode") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "measurements_measure_type_id_fkey" FOREIGN KEY ("measure_type_id") REFERENCES "MeasureType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_measurements" ("confirmedValue", "createdAt", "customer_code", "id", "imageUrl", "measureDatetime", "measureUUID", "measureValue", "measure_type_id", "updatedAt") SELECT "confirmedValue", "createdAt", "customer_code", "id", "imageUrl", "measureDatetime", "measureUUID", "measureValue", "measure_type_id", "updatedAt" FROM "measurements";
DROP TABLE "measurements";
ALTER TABLE "new_measurements" RENAME TO "measurements";
CREATE UNIQUE INDEX "measurements_measureUUID_key" ON "measurements"("measureUUID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
