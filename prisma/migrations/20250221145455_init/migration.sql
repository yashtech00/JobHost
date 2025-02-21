/*
  Warnings:

  - You are about to drop the column `email` on the `UserProfile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserProfile_email_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "email";
