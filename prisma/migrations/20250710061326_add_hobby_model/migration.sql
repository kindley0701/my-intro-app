-- CreateTable
CREATE TABLE "Hobby" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "cropCenterX" INTEGER NOT NULL,
    "cropCenterY" INTEGER NOT NULL,
    "cropWidth" INTEGER NOT NULL,
    "cropHeight" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "halfWidth" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hobby_title_key" ON "Hobby"("title");
