/*
  Warnings:

  - Changed the type of `gender` on the `UserProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "workingYear" DROP NOT NULL,
ALTER COLUMN "workingMonth" DROP NOT NULL,
ALTER COLUMN "currentLocations" DROP NOT NULL,
ALTER COLUMN "resume" DROP NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL,
ALTER COLUMN "preferedJobTitle" DROP NOT NULL,
ALTER COLUMN "preferedLocation" DROP NOT NULL,
ALTER COLUMN "skills" DROP NOT NULL;
