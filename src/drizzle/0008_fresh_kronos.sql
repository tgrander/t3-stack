CREATE TABLE IF NOT EXISTS "t3-test_tags" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(500),
	"cloudinary_public_id" varchar(255),
	"persona_count" integer DEFAULT 0 NOT NULL,
	"created_by" varchar(36),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "t3-test_tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3-test_tags_on_ai_chars" (
	"tag_id" varchar(36) NOT NULL,
	"ai_character_id" varchar(36) NOT NULL,
	CONSTRAINT "t3-test_tags_on_ai_chars_tag_id_ai_character_id_pk" PRIMARY KEY("tag_id","ai_character_id")
);
--> statement-breakpoint
ALTER TABLE "t3-test_ai_characters_chats" DROP CONSTRAINT "t3-test_ai_characters_chats_ai_character_id_t3-test_chat_id_fk";
--> statement-breakpoint
ALTER TABLE "t3-test_ai_characters_chats" DROP CONSTRAINT "t3-test_ai_characters_chats_chat_id_t3-test_ai_character_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3-test_ai_characters_chats" ADD CONSTRAINT "t3-test_ai_characters_chats_ai_character_id_t3-test_ai_character_id_fk" FOREIGN KEY ("ai_character_id") REFERENCES "t3-test_ai_character"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3-test_ai_characters_chats" ADD CONSTRAINT "t3-test_ai_characters_chats_chat_id_t3-test_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "t3-test_chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3-test_tags_on_ai_chars" ADD CONSTRAINT "t3-test_tags_on_ai_chars_tag_id_t3-test_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "t3-test_tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3-test_tags_on_ai_chars" ADD CONSTRAINT "t3-test_tags_on_ai_chars_ai_character_id_t3-test_ai_character_id_fk" FOREIGN KEY ("ai_character_id") REFERENCES "t3-test_ai_character"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
