/*
  Warnings:

  - Changed the type of `salary` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER NOT NULL;
