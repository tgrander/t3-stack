ALTER TYPE "personaType" ADD VALUE 'Adventure';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Real Person';--> statement-breakpoint
ALTER TABLE "t3-test_ai_character" ALTER COLUMN "system_prompt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "t3-test_ai_character" ADD COLUMN "headline" varchar(100);