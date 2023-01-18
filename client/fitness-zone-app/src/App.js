import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Pages/Main/Main';
import AddNew from './Pages/AddNew/AddNew';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/add',
      element: <AddNew />,
    },
    {
      path: '/view',
      element: <Main />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
