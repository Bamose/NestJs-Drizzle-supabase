CREATE TABLE IF NOT EXISTS "department" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"eventname" text,
	"description" text,
	"date" date,
	"time" time,
	"location" text,
	"organisedBy" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" text,
	"lastName" text,
	"emaol" text NOT NULL,
	"phoheNumber" text,
	"timestamp" timestamp DEFAULT now(),
	"departmentName" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "registration" (
	"id" serial PRIMARY KEY NOT NULL,
	"regstatus" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp DEFAULT now(),
	"otp/api" text,
	"emailtoken" text NOT NULL,
	"valid" boolean DEFAULT true,
	"expiration" time
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"roles" text,
	"timestamp" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
