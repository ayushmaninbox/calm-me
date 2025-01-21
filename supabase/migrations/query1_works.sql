-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY,
    email text NOT NULL,
    display_name text,
    photo_url text,
    cloudinary_public_id text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    content text NOT NULL,
    role text NOT NULL CHECK (role IN ('user', 'assistant')),
    emotions jsonb,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Profiles policies for anon role
CREATE POLICY "Enable read access for all users"
    ON profiles FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Enable insert for users based on id"
    ON profiles FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Enable update for users based on id"
    ON profiles FOR UPDATE
    TO anon
    USING (true);

-- Chat messages policies for anon role
CREATE POLICY "Enable read access for all messages"
    ON chat_messages FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Enable insert for messages"
    ON chat_messages FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);