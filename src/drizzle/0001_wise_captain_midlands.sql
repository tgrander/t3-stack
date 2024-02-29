CREATE TABLE IF NOT EXISTS "t3-test_ai_characters_chats" (
	"ai_character_id" serial NOT NULL,
	"chat_id" serial NOT NULL,
	CONSTRAINT "t3-test_ai_characters_chats_ai_character_id_chat_id_pk" PRIMARY KEY("ai_character_id","chat_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3-test_ai_characters_chats" ADD CONSTRAINT "t3-test_ai_characters_chats_ai_character_id_t3-test_chat_id_fk" FOREIGN KEY ("ai_character_id") REFERENCES "t3-test_chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3-test_ai_characters_chats" ADD CONSTRAINT "t3-test_ai_characters_chats_chat_id_t3-test_ai_character_id_fk" FOREIGN KEY ("chat_id") REFERENCES "t3-test_ai_character"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
