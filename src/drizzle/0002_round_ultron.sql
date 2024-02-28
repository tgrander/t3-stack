DO $$ BEGIN
 CREATE TYPE "personaTypes" AS ENUM('Inspirational Leader', 'Creative Genius', 'Comedic Relief', 'Wise Mentor', 'Rebel with a Cause', 'Tragic Hero', 'Adventurer', 'Romantic', 'Intellectual', 'Villain', 'Survivor', 'Everyman', 'Mystic', 'Innovator', 'Diplomat');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP INDEX IF EXISTS "ai_idx";--> statement-breakpoint
ALTER TABLE "t3-test-ai_character" ADD COLUMN "persona_types" "personaTypes" NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ai_idx" ON "t3-test-ai_character" ("id","persona_types");--> statement-breakpoint
ALTER TABLE "t3-test-ai_character" DROP COLUMN IF EXISTS "personality_type";