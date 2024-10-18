import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jwt = searchParams.get('jwt');

  if (jwt) {
    const response = NextResponse.redirect('https://tripterrior.vercel.app/');
    response.cookies.set('JWT', jwt, { maxAge: 60 * 60 * 24, httpOnly: false });
    return response;
  }

  return NextResponse.json({ error: 'JWT token is missing' }, { status: 400 });
}
