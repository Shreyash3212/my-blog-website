import { signToken } from '@/lib/auth';

export async function POST(request) {
  const { username, password } = await request.json();
  
  if (username === 'admin' && password === 'MyDream123') {
    const token = signToken({ username: 'admin' });
    return Response.json({ token });
  }
  
  return Response.json({ message: 'Invalid credentials' }, { status: 401 });
}