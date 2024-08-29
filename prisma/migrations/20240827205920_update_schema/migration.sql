/*
  Warnings:

  - You are about to drop the column `customer_id` on the `measurements` table. All the data in the column will be lost.
  - You are about to alter the column `measureValue` on the `measurements` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - A unique constraint covering the columns `[customerCode]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_code` to the `measurements` table without a default value. This is not possible if the table is not empty.

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
    "confirmedValue" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "measure_type_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "measurements_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customers" ("customerCode") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "measurements_measure_type_id_fkey" FOREIGN KEY ("measure_type_id") REFERENCES "MeasureType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_measurements" ("confirmedValue", "createdAt", "id", "imageUrl", "measureDatetime", "measureUUID", "measureValue", "measure_type_id", "updatedAt") SELECT "confirmedValue", "createdAt", "id", "imageUrl", "measureDatetime", "measureUUID", "measureValue", "measure_type_id", "updatedAt" FROM "measurements";
DROP TABLE "measurements";
ALTER TABLE "new_measurements" RENAME TO "measurements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "customers_customerCode_key" ON "customers"("customerCode");
