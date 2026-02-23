CREATE TABLE "hook_generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"niche" text NOT NULL,
	"topic" text NOT NULL,
	"audience" text NOT NULL,
	"platform" text NOT NULL,
	"tone" text NOT NULL,
	"goal" text NOT NULL,
	"hook_count" text NOT NULL,
	"generated_hooks" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
