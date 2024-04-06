-- AlterTable
CREATE SEQUENCE users_to_channel_id_seq;
ALTER TABLE "users_to_channel" ALTER COLUMN "id" SET DEFAULT nextval('users_to_channel_id_seq');
ALTER SEQUENCE users_to_channel_id_seq OWNED BY "users_to_channel"."id";
