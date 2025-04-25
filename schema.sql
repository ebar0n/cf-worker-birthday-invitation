-- Schema for the birthday invitation application
-- This file defines the structure of the database tables

-- Table: invitation
-- Stores information about each guest invitation
CREATE TABLE IF NOT EXISTS invitation (
  token TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL,
  vehiclePlate TEXT,
  guests TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on token for faster lookups
CREATE INDEX IF NOT EXISTS idx_invitation_token ON invitation(token);

-- Insert default settings if needed
INSERT OR REPLACE INTO invitation (token, name, attendance, vehiclePlate, guests) VALUES
  ('11e4a756-c8f0-4888-9a1e-8c5b6fb7e7d1', 'Niño01', 'pending', NULL, NULL),
  ('22f5b867-d9f1-4999-8b2f-9d6c7fc8e8e2', 'Niño02', 'pending', NULL, NULL),
  ('33e6c978-e8f2-4aaa-9c3f-ae7d8fd9f9f3', 'Niño03', 'pending', NULL, NULL),
  ('44d7d889-f7f3-4bbb-8d4f-bf8e9fe8f8f4', 'Niño04', 'pending', NULL, NULL),
  ('55c8e99a-e6f4-4ccc-9e5f-cf9f8fe7f7f5', 'Niño05', 'pending', NULL, NULL),
  ('66b9faa1-d5f5-4ddd-8f6f-df8f7fd6f6f6', 'Niño06', 'pending', NULL, NULL),
  ('77aafbb2-c4f6-4eee-9f7f-ef7f6fc5f5f7', 'Niño07', 'pending', NULL, NULL),
  ('889bfcc3-b3f7-4fff-8e8f-ff6f5fb4f4f8', 'Niño08', 'pending', NULL, NULL),
  ('998cfdd4-a2f8-4000-9d9f-0f5f4fa3f3f9', 'Niño09', 'pending', NULL, NULL),
  ('aa7dfee5-91f9-4111-8eaf-1e4f3f92f2fa', 'Niño10', 'pending', NULL, NULL),
  ('bb6efff6-80fa-4222-9dbf-2d3f2f81f1fb', 'Niño11', 'pending', NULL, NULL),
  ('cc5f00f7-70fb-4333-8ccf-3c2f1f70f0fc', 'Niño12', 'pending', NULL, NULL),
  ('dd4f11f8-60fc-4444-9ddf-4b1f0f60effd', 'Niño13', 'pending', NULL, NULL),
  ('ee3f22f9-50fd-4555-8eef-5a0fef5defe', 'Niño14', 'pending', NULL, NULL),
  ('ff2f33fa-40fe-4666-9fff-690ede4defe', 'Niño15', 'pending', NULL, NULL),
  ('001f44fb-30ff-4777-800f-780dcd3cefe', 'Niño16', 'pending', NULL, NULL),
  ('112f55fc-20f0-4888-911f-870cbc2befe', 'Niño17', 'pending', NULL, NULL),
  ('223f66fd-10f1-4999-a22f-960bab1aefe', 'Niño18', 'pending', NULL, NULL),
  ('334f77fe-00f2-4aaa-b33f-a50a9a09efe', 'Niño19', 'pending', NULL, NULL),
  ('445f88ff-f0f3-4bbb-c44f-b4f98908efe', 'Niño20', 'pending', NULL, NULL),
  ('556f9900-e0f4-4ccc-d55f-c3e87807efe', 'Niño21', 'pending', NULL, NULL),
  ('667faa01-d0f5-4ddd-e66f-d2d76706efe', 'Niño22', 'pending', NULL, NULL),
  ('778fbb02-c0f6-4eee-f77f-e1c65605efe', 'Niño23', 'pending', NULL, NULL),
  ('889fcc03-b0f7-4fff-088f-f0b54504efe', 'Niño24', 'pending', NULL, NULL),
  ('99afdd04-a0f8-4000-199f-0fa43403efe', 'Niño25', 'pending', NULL, NULL),
  ('aabfee05-90f9-4111-2aaf-1e932302efe', 'Niño26', 'pending', NULL, NULL),
  ('bbcfff06-80fa-4222-3bbf-2d821201efe', 'Niño27', 'pending', NULL, NULL),
  ('ccdf0007-70fb-4333-4ccf-3c710100efe', 'Niño28', 'pending', NULL, NULL),
  ('ddef1108-60fc-4444-5ddf-4b60f0ffefe', 'Niño29', 'pending', NULL, NULL),
  ('eeff2209-50fd-4555-6eef-5a5feffeefe', 'Niño30', 'pending', NULL, NULL);