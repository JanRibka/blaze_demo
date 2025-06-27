-- CreateTable
CREATE TABLE "User" (
    "idUser" VARCHAR(25) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
