// Centralized API utilities
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
  
    return response.json();
  }
  
  export async function getHumeToken() {
    try {
      const response = await fetchWithAuth('/api/auth');
      return response.accessToken;
    } catch (error) {
      console.error('Failed to get Hume token:', error);
      throw error;
    }
  }