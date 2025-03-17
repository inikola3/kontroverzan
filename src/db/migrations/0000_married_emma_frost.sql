CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" varchar(255) NOT NULL,
	"country" text NOT NULL,
	"order_status" text DEFAULT 'unfulfilled' NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"street" varchar NOT NULL,
	"city" varchar(100) NOT NULL,
	"zip" varchar(20),
	"phone_number" varchar(20),
	"price" integer NOT NULL,
	"integer" integer NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orders_order_id_unique" UNIQUE("order_id")
);
