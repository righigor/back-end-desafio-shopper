-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MeasureType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "measurements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "measureDatetime" DATETIME NOT NULL,
    "measureValue" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "measureUUID" TEXT NOT NULL,
    "confirmedValue" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "measure_type_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "measurements_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "measurements_measure_type_id_fkey" FOREIGN KEY ("measure_type_id") REFERENCES "MeasureType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
