import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;

export async function fetchAPI(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: any,
) {
  const token = Cookies.get('JWT');

  const headers: HeadersInit = {
    accept: '*/*',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (body instanceof FormData) {
      options.body = body;
    } else if (typeof body === 'string') {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorMessage = await response.text(); // 응답 본문에서 에러 메시지 추출
      throw new Error(errorMessage || 'Network response was not ok');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : 'Success';
  } catch (error) {
    console.error('Fetch API error:', error);
    throw error;
  }
}
