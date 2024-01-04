DROP TABLE "inventory";--> statement-breakpoint
DROP TABLE "item";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "surname";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "roles";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "updated_At";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "general";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "other";