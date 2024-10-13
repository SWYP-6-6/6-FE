import Cookies from 'js-cookie';

const BASE_URL = 'http://13.209.88.22:8080/'; // Your base API URL

export async function fetchAPI(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any,
) {
  const token = Cookies.get('JWT');

  const headers: HeadersInit = {
    // 'Content-Type': 'application/json', // Include JSON content type
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
    // FormData를 사용하면 자동으로 Content-Type이 설정됩니다.
    options.body = body instanceof FormData ? body : JSON.stringify(body);
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'; // JSON일 경우에만 설정
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : 'Success';
  } catch (error) {
    console.error('Fetch API error:', error);
    throw error;
  }
}
