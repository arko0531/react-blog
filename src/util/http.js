import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';

export const queryClient = new QueryClient();

export const checkAuthLoader = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return redirect('/auth?mode=login');
  }

  return null;
};
