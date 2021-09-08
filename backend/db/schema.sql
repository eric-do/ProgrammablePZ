DROP EXTENSION IF EXISTS pgcrypto;
CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS user_rides;
DROP TABLE IF EXISTS user_likes;
DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS ride_types;
DROP TABLE IF EXISTS users;

CREATE TABLE ride_types (
  type VARCHAR(5) PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE rides (
  id INT GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  type VARCHAR(5) REFERENCES ride_types (type),
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  total_votes INT DEFAULT 0,
  ride_count INT DEFAULT 0,
  intervals JSONB NOT NULL,
  timeInSeconds SMALLINT NOT NULL,
  created_on TIMESTAMPTZ,
  PRIMARY KEY(id)
);


CREATE INDEX rides_type_index ON rides (type);
CREATE INDEX rides_time_index ON rides (timeInSeconds);

CREATE TABLE users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE INDEX users_username_password_idx ON users (username, password);

CREATE TABLE user_likes (
  ride_id INT REFERENCES rides(id),
  user_id uuid REFERENCES users(id),
  vote INT,
  PRIMARY KEY(ride_id, user_id)
);

CREATE TABLE user_rides (
  id INT GENERATED ALWAYS AS IDENTITY,
  ride_id INT REFERENCES rides(id),
  user_id uuid REFERENCES users(id),
  timestamp TIMESTAMPTZ
);

CREATE INDEX userrides_userid_idx ON user_rides (user_id);

INSERT INTO ride_types (type, name) VALUES ('pz', 'Power Zone');
INSERT INTO ride_types (type, name) VALUES ('pze', 'Power Zone Endurance');
INSERT INTO ride_types (type, name) VALUES ('pzm', 'Power Zone Max');
INSERT INTO ride_types (type, name) VALUES ('ftp', 'Power Zone FTP');