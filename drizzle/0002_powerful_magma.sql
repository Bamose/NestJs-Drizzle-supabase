ALTER TABLE "event" ADD COLUMN "userId" integer;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "userid" integer;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "memberid" integer;--> statement-breakpoint
ALTER TABLE "registration" ADD COLUMN "eventid" integer;--> statement-breakpoint
ALTER TABLE "registration" ADD COLUMN "memberid" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_memberid_member_id_fk" FOREIGN KEY ("memberid") REFERENCES "member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
