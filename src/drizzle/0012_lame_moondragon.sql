ALTER TYPE "personaType" ADD VALUE 'Anime';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Companion';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Therapist/Counselor';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Tutor/Mentor';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Problem-Solver';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Debate Partner';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Storyteller';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Role-Play';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Trivia Master';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Games';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Historical Figure';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Fictional Character';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Memory Companion';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Experimental AI';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Vent';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Punching Bag';--> statement-breakpoint
ALTER TYPE "personaType" ADD VALUE 'Choose Your Own Adventure';--> statement-breakpoint
ALTER TABLE "t3-test_ai_character" ALTER COLUMN "system_prompt" SET DATA TYPE varchar(6000);