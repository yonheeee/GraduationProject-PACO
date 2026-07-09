import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token') || searchParams.get('accessToken');
    if (token) {
      localStorage.setItem('accessToken', token);
      navigate('/main', { replace: true });
      return;
    }

    navigate('/signin', { replace: true });
  }, [navigate, searchParams]);

  return <div style={{ padding: '2rem', textAlign: 'center' }}>Signing in...</div>;
}
