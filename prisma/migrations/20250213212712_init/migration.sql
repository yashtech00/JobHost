/*
  Warnings:

  - You are about to drop the column `name` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserProfile_username_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "name",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL,
ALTER COLUMN "skills" SET NOT NULL,
ALTER COLUMN "skills" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");
