// Centralized API utilities
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
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
    // Use environment variable for API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/api/auth`);
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