-- CreateTable
CREATE TABLE "time" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_pkey" PRIMARY KEY ("id")
);
