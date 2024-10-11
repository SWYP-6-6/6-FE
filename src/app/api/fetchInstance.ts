import Cookies from 'js-cookie';

const BASE_URL = 'http://13.209.88.22:8080/'; // Your base API URL

export async function fetchAPI(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any,
) {
  const token = Cookies.get('JWT');

  const headers: HeadersInit = {
    'Content-Type': 'application/json', // Include JSON content type
    accept: '*/*', // Accept all types of responses
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch API error:', error);
    throw error;
  }
}
