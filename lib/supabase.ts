import { createClient } from '@supabase/supabase-js';
import { convertFirebaseIdToUUID } from '@/utils/uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true
  }
});

// Profile types
export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  photo_url: string | null;
  cloudinary_public_id: string | null;
  created_at: string;
  updated_at: string;
}

// Chat message types
export interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  role: 'user' | 'assistant';
  emotions: Record<string, number> | null;
  created_at: string;
}

// Helper function to validate UUID
function isValidUUID(uuid: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// Profile operations
export async function getProfile(firebaseId: string) {
  try {
    const uuid = convertFirebaseIdToUUID(firebaseId);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uuid)
      .single();

    if (error) throw error;
    return data as Profile;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

export async function upsertProfile(profile: Partial<Profile> & { id: string }) {
  try {
    const uuid = convertFirebaseIdToUUID(profile.id);
    
    const { data, error } = await supabase
      .from('profiles')
      .upsert([{
        ...profile,
        id: uuid,
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  } catch (error) {
    console.error('Error upserting profile:', error);
    throw error;
  }
}

// Chat operations
export async function getChatHistory(firebaseId: string) {
  try {
    const uuid = convertFirebaseIdToUUID(firebaseId);
    
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', uuid)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error in getChatHistory:', error);
      return [];
    }

    return data as ChatMessage[];
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}

export async function saveChatMessage(message: Omit<ChatMessage, 'id' | 'created_at'>) {
  try {
    if (!message.content || !message.user_id) {
      console.error('Invalid message data:', message);
      return null;
    }

    const uuid = convertFirebaseIdToUUID(message.user_id);
    
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        user_id: uuid,
        content: message.content,
        role: message.role,
        emotions: message.emotions,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error in saveChatMessage:', error);
      throw error;
    }

    return data as ChatMessage;
  } catch (error) {
    console.error('Error saving message:', error);
    return null;
  }
}