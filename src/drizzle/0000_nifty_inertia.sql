DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'assistant', 'system', 'tool', 'function');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3-test-ai_character" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"user_id" varchar(36),
	"personality_type" varchar(50),
	"description" varchar(500),
	"avatar_image" varchar(255),
	"configuration_data" json,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3-test-chat" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"user_id" varchar(36),
	"guest_session_id" varchar(36),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3-test-message" (
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
CREATE TABLE IF NOT EXISTS "t3-test-user" (
	"id" varchar(36),
	"email" varchar(256),
	"name" varchar(256),
	"avatar_image" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "t3-test-user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ai_idx" ON "t3-test-ai_character" ("name","personality_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chat_idx" ON "t3-test-chat" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "message_idx" ON "t3-test-message" ("message");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "t3-test-user" ("id","email");