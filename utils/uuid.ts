import { v5 as uuidv5 } from 'uuid';

// Namespace for generating consistent UUIDs
const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

export function convertFirebaseIdToUUID(firebaseId: string): string {
  // Generate a UUID v5 using the Firebase ID as input
  return uuidv5(firebaseId, NAMESPACE);
}