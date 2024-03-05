ALTER TABLE "t3-test_tags_on_ai_chars" RENAME COLUMN "tag_id" TO "tag_name";--> statement-breakpoint
ALTER TABLE "t3-test_tags_on_ai_chars" DROP CONSTRAINT "t3-test_tags_on_ai_chars_tag_id_t3-test_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "t3-test_tags_on_ai_chars" DROP CONSTRAINT "t3-test_tags_on_ai_chars_tag_id_ai_character_id_pk";--> statement-breakpoint
ALTER TABLE "t3-test_tags" ALTER COLUMN "name" SET DATA TYPE varchar(75);--> statement-breakpoint
ALTER TABLE "t3-test_tags_on_ai_chars" ALTER COLUMN "tag_name" SET DATA TYPE varchar(75);--> statement-breakpoint
ALTER TABLE "t3-test_tags_on_ai_chars" ADD CONSTRAINT "t3-test_tags_on_ai_chars_tag_name_ai_character_id_pk" PRIMARY KEY("tag_name","ai_character_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_idx" ON "t3-test_tags" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3-test_tags_on_ai_chars" ADD CONSTRAINT "t3-test_tags_on_ai_chars_tag_name_t3-test_tags_name_fk" FOREIGN KEY ("tag_name") REFERENCES "t3-test_tags"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
