-- One row per country, with how many visits came from it. Nothing about individual visitors.
CREATE TABLE IF NOT EXISTS visits (
  country TEXT PRIMARY KEY,
  visits  INTEGER NOT NULL DEFAULT 0
);
