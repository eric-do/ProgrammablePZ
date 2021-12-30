-- CREATE MATERIALIZED VIEW
DROP MATERIALIZED VIEW IF EXISTS admin_rides CASCADE;
CREATE MATERIALIZED VIEW admin_rides AS SELECT
  r.id,
  r.creator_id,
  'PPZ' AS username,
  r.title,
  r.type,
  r.likes,
  rr.rating,
  rr.difficulty,
  r.dislikes,
  r.total_votes,
  r.ride_count,
  r.intervals,
  r.timeInSeconds,
  r.created_on
FROM rides as r
LEFT JOIN (
  SELECT
    ride_id AS id,
    ROUND(AVG(rating), 1)::float as rating,
    ROUND(AVG(difficulty), 1)::float as difficulty
  FROM ride_ratings
  GROUP BY ride_id
) AS rr
  ON rr.id = r.id
LEFT JOIN users as u
  ON u.id = r.creator_id
WHERE r.creator_id IS NULL OR u.admin = True
ORDER BY r.created_on DESC;

-- ADD INDEXES TO MATERIALIZED VIEW
CREATE INDEX admin_rides_type ON admin_rides(type);
CREATE INDEX admin_rides_time ON admin_rides(timeInSeconds);
CREATE UNIQUE INDEX admin_ride_id ON admin_rides (id);
GRANT SELECT, INSERT, UPDATE, DELETE ON admin_rides TO postgres;

-- ADD FUNCTION TO REFRESH VIEW
DROP FUNCTION IF EXISTS refresh_admin_rides() CASCADE;
CREATE OR REPLACE FUNCTION refresh_admin_rides()
RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY admin_rides with data;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- SET FUNCTION TO EXCECUTE WHEN A NEW RIDE IS INSERTED
CREATE OR REPLACE TRIGGER tg_refresh_admin_rides AFTER INSERT OR UPDATE OR DELETE
ON rides
FOR EACH STATEMENT EXECUTE PROCEDURE refresh_admin_rides();