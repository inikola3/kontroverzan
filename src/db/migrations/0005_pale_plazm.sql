ALTER TABLE "orders" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "total_discounts" numeric(10, 2) DEFAULT '0.00' NOT NULL;