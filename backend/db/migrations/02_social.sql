DROP TABLE IF EXISTS user_follows;

CREATE TABLE user_follows (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES users (id) ON DELETE CASCADE,
  friend_id uuid REFERENCES users (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX user_follows_userid_index ON user_follows (user_id);
CREATE INDEX user_follows_friendid_index ON user_follows (friend_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON user_follows TO postgres;
