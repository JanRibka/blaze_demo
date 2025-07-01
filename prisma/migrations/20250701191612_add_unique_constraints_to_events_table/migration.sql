/*
  Warnings:

  - A unique constraint covering the columns `[idEvent,idUser]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,idUser]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_idUser_fkey";

-- DropIndex
DROP INDEX "Event_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Event_idEvent_idUser_key" ON "Event"("idEvent", "idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Event_title_idUser_key" ON "Event"("title", "idUser");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;
