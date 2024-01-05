ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "userid" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "member" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");