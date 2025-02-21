/*
  Warnings:

  - The `phonenumber` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "companyname" DROP NOT NULL,
DROP COLUMN "phonenumber",
ADD COLUMN     "phonenumber" INTEGER;
