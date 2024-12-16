// Centralized API utilities
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
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
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function getHumeToken() {
  try {
    const response = await fetch('/api/auth');
    const data = await response.json();
    
    if (!data.accessToken) {
      throw new Error('No access token received');
    }
    
    return data.accessToken;
  } catch (error) {
    console.error('Failed to get Hume token:', error);
    throw error;
  }
}