-- Run this in Supabase SQL Editor to add the status column to alliances table
ALTER TABLE alliances ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
