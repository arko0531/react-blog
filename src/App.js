import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import MainPostPage from './pages/main/Index';
import DetailPostPage from './pages/post/DetailPostPage';
import EditPostPage from './pages/post/edit/EditPostPage';
import WritePostPage from './pages/post/write/WritePostPage';
import AuthenticationPage from './pages/auth/AuthenticationPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './util/http';
import { app } from './firebase';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Sidebar />,
      children: [
        { index: true, element: <MainPostPage /> },
        { path: '/auth', element: <AuthenticationPage /> },
        { path: '/posts/new', element: <WritePostPage /> },
        {
          path: '/posts/:postId',
          children: [
            { index: true, element: <DetailPostPage /> },
            { path: 'edit', element: <EditPostPage /> },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
