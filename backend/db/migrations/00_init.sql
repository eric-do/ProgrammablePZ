DROP EXTENSION IF EXISTS pgcrypto;
CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS user_likes;
DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS ride_types;
DROP TABLE IF EXISTS users;

CREATE TABLE ride_types (
  type VARCHAR(5) PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  admin BOOLEAN DEFAULT TRUE
);

CREATE INDEX users_username_idx ON users (username);

CREATE TABLE rides (
  id INT GENERATED ALWAYS AS IDENTITY,
  creator_id uuid REFERENCES users (id) ON DELETE CASCADE,
  title TEXT,
  type VARCHAR(5) REFERENCES ride_types (type),
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  total_votes INT DEFAULT 0,
  ride_count INT DEFAULT 0,
  intervals JSONB NOT NULL,
  timeInSeconds SMALLINT NOT NULL,
  created_on TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(id)
);

CREATE INDEX rides_type_index ON rides (type);
CREATE INDEX rides_time_index ON rides (timeInSeconds);
CREATE INDEX rides_creator_index ON rides (creator_id);

CREATE TABLE user_likes (
  ride_id INT REFERENCES rides(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  PRIMARY KEY(ride_id, user_id)
);

CREATE INDEX userrlikes_userid_idx ON user_likes (user_id);

INSERT INTO ride_types (type, name) VALUES ('pz', 'Power Zone');
INSERT INTO ride_types (type, name) VALUES ('pze', 'Power Zone Endurance');
INSERT INTO ride_types (type, name) VALUES ('pzm', 'Power Zone Max');
INSERT INTO ride_types (type, name) VALUES ('ftp', 'Power Zone FTP');