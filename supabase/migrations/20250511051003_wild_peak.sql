/*
  # Create legal resources table

  1. New Tables
    - `legal_resources`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `url` (text)
      - `jurisdiction` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `legal_resources` table
    - Add policy for authenticated users to read resources
*/

CREATE TABLE IF NOT EXISTS legal_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  url text,
  jurisdiction text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE legal_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read legal resources"
  ON legal_resources
  FOR SELECT
  TO public
  USING (true);

-- Enable full text search
ALTER TABLE legal_resources ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (to_tsvector('english', content)) STORED;

CREATE INDEX IF NOT EXISTS legal_resources_fts_idx ON legal_resources USING GIN (fts);