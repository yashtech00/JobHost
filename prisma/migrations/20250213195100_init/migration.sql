-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workingYear" INTEGER NOT NULL,
    "workingMonth" INTEGER NOT NULL,
    "currentLocations" TEXT NOT NULL,
    "links" TEXT,
    "resume" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "gender" "GenderType" NOT NULL,
    "profilePic" TEXT,
    "preferedJobTitle" TEXT NOT NULL,
    "preferedLocation" TEXT NOT NULL,
    "skills" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_username_key" ON "UserProfile"("username");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
