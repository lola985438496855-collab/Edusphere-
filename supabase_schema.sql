-- ============================================================
--  EDUSPHERE — Supabase PostgreSQL Schema
--  Run this ONCE in your Supabase SQL Editor
-- ============================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT UNIQUE NOT NULL,
  password     TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'Student',
  student_id   TEXT,
  major        TEXT,
  skills       JSONB DEFAULT '[]',
  avatar       TEXT,
  status       TEXT DEFAULT 'Available',
  bio          TEXT DEFAULT '',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id                   TEXT PRIMARY KEY,
  title                TEXT NOT NULL,
  description          TEXT,
  team_members         JSONB DEFAULT '[]',
  tech_stack           JSONB DEFAULT '[]',
  progress_percentage  INTEGER DEFAULT 0,
  checklist            JSONB DEFAULT '[]',
  timeline             JSONB DEFAULT '[]',
  live_demo_url        TEXT DEFAULT '',
  codebase_url         TEXT DEFAULT '',
  image_url            TEXT DEFAULT '',
  video_url            TEXT DEFAULT '',
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Evaluations Table
CREATE TABLE IF NOT EXISTS evaluations (
  id              TEXT PRIMARY KEY,
  project_id      TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  evaluator_id    TEXT NOT NULL,
  evaluator_name  TEXT,
  grades          JSONB NOT NULL,
  average_grade   NUMERIC(4,2),
  feedback        TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, evaluator_id)
);

-- 4. Alliances Table
CREATE TABLE IF NOT EXISTS alliances (
  id             TEXT PRIMARY KEY,
  sender_id      TEXT NOT NULL,
  sender_name    TEXT,
  recipient_id   TEXT NOT NULL,
  recipient_name TEXT,
  project_name   TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Disable Row Level Security (Required for anonymous API client access)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations DISABLE ROW LEVEL SECURITY;
ALTER TABLE alliances DISABLE ROW LEVEL SECURITY;
