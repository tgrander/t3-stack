ALTER TABLE "t3-test_user" ADD COLUMN "firstName" varchar(256);--> statement-breakpoint
ALTER TABLE "t3-test_user" ADD COLUMN "lastName" varchar(256);--> statement-breakpoint
ALTER TABLE "t3-test_user" DROP COLUMN IF EXISTS "name";