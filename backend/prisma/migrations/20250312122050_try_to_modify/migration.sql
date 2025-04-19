/*
  Warnings:

  - Added the required column `userid` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN "userid" INTEGER; -- Temporarily nullable

UPDATE "Todo" 
SET "userid" = (SELECT "id" FROM "User" LIMIT 1) 
WHERE "userid" IS NULL; -- Assign an existing user to all todos

ALTER TABLE "Todo" ALTER COLUMN "userid" SET NOT NULL;


-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
