-- CreateTable
CREATE TABLE "Event" (
    "idEvent" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "startAt" TIMESTAMP(0) NOT NULL,
    "endAt" TIMESTAMP(0) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("idEvent")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_title_key" ON "Event"("title");

-- CreateIndex
CREATE INDEX "Event_idUser_idx" ON "Event"("idUser");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
