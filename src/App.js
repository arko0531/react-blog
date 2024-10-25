import 'App.css';
import store from 'store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, checkAuthLoader } from 'util/http'; // utill App,js로 옮기기
import Sidebar from 'components/sidebar/Sidebar';
import MainPostPage from 'pages/main/Index';
import DetailPostPage from 'pages/post/DetailPostPage';
import EditPostPage from 'pages/post/edit/EditPostPage';
import WritePostPage from 'pages/post/write/WritePostPage';
import AuthenticationPage from 'pages/auth/AuthenticationPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Sidebar />,
      children: [
        { index: true, element: <MainPostPage /> },
        { path: '/auth', element: <AuthenticationPage /> },
        {
          path: '/posts/new',
          element: <WritePostPage />,
          loader: checkAuthLoader
        },
        {
          path: '/posts/:postId',
          children: [
            { index: true, element: <DetailPostPage /> },
            { path: 'edit', element: <EditPostPage />, loader: checkAuthLoader }
          ]
        }
      ]
    }
  ]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
