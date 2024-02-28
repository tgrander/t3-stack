DO $$ BEGIN
 CREATE TYPE "personaType" AS ENUM('Inspirational Leader', 'Creative Genius', 'Comedic Relief', 'Wise Mentor', 'Rebel with a Cause', 'Tragic Hero', 'Adventurer', 'Romantic', 'Intellectual', 'Villain', 'Survivor', 'Everyman', 'Mystic', 'Innovator', 'Diplomat');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'assistant', 'system', 'tool', 'function');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3-test_ai_character" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"user_id" varchar(36),
	"persona_type" json NOT NULL,
	"description" varchar(500),
	"avatar_image" varchar(255),
	"cloudinary_public_id" varchar(255),
	"configuration_data" json,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3-test_chat" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"user_id" varchar(36),
	"guest_session_id" varchar(36),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3-test_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" varchar(1000) NOT NULL,
	"user_id" varchar(36),
	"is_guest" boolean DEFAULT false,
	"guest_session_id" varchar(36),
	"ai_character_id" serial NOT NULL,
	"chat_id" serial NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp,
	"flags" json,
	"role" "role" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3-test_user" (
	"id" varchar(36),
	"email" varchar(256),
	"name" varchar(256),
	"avatar_image" varchar(255),
	"cloudinary_public_id" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "t3-test_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ai_idx" ON "t3-test_ai_character" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chat_idx" ON "t3-test_chat" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "message_idx" ON "t3-test_message" ("message");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "t3-test_user" ("id","email");