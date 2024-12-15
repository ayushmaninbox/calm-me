import 'server-only';
import { fetchAccessToken } from "hume";

export const getHumeAccessToken = async () => {
  try {
    const accessToken = await fetchAccessToken({
      apiKey: String(process.env.HUME_API_KEY),
      secretKey: String(process.env.HUME_SECRET_KEY),
    });

    if (!accessToken || accessToken === "undefined") {
      console.error('Failed to get Hume access token');
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error('Error fetching Hume access token:', error);
    return null;
  }
};