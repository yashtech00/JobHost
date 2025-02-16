/*
  Warnings:

  - You are about to drop the column `skill` on the `Job` table. All the data in the column will be lost.
  - The `jobtype` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Jobstype" AS ENUM ('FullTime', 'PartTime', 'Contract', 'Freelance');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "skill",
DROP COLUMN "jobtype",
ADD COLUMN     "jobtype" "Jobstype"[],
ALTER COLUMN "salary" SET DATA TYPE TEXT;
