ALTER TABLE "t3-test_ai_character" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "t3-test_ai_characters_chats" ALTER COLUMN "ai_character_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "t3-test_ai_characters_chats" ALTER COLUMN "chat_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "t3-test_chat" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "t3-test_message" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "t3-test_message" ALTER COLUMN "ai_character_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "t3-test_message" ALTER COLUMN "ai_character_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "t3-test_message" ALTER COLUMN "chat_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "t3-test_message" ALTER COLUMN "chat_id" DROP NOT NULL;