/*
  Warnings:

  - You are about to drop the `MeasureType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `measure_type_id` on the `measurements` table. All the data in the column will be lost.
  - Added the required column `measureType` to the `measurements` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MeasureType";
PRAGMA foreign_keys=on;

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
    "measureType" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "measurements_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customers" ("customerCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_measurements" ("confirmedValue", "createdAt", "customer_code", "hasConfirmed", "id", "imageUrl", "measureDatetime", "measureUUID", "measureValue", "updatedAt") SELECT "confirmedValue", "createdAt", "customer_code", "hasConfirmed", "id", "imageUrl", "measureDatetime", "measureUUID", "measureValue", "updatedAt" FROM "measurements";
DROP TABLE "measurements";
ALTER TABLE "new_measurements" RENAME TO "measurements";
CREATE UNIQUE INDEX "measurements_measureUUID_key" ON "measurements"("measureUUID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
