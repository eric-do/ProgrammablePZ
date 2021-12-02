\c ppz
DROP TABLE IF EXISTS user_rides;

CREATE TABLE user_rides (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES users (id) ON DELETE CASCADE,
  ride_id INT REFERENCES rides (id) ON DELETE CASCADE,
  ridden_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX user_rides_userid_index ON user_rides (user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON user_rides TO postgres;
