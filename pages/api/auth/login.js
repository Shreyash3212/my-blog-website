// pages/api/auth/login.js
import { signToken } from '../../../lib/auth';

export default function handler(req, res) {
  const { username, password } = req.body;
  // Admin login, for demo hardcoding user & pass
  if (username === 'admin' && password === 'MyDream123') {
    const token = signToken({ username: 'admin' });
    return res.status(200).json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
}
