CREATE TABLE IF NOT EXISTS "adminUserEmailAddresses" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "adminEmailUniqueIndex" ON "adminUserEmailAddresses" USING btree (lower("email"));