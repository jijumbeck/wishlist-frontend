import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import './App.css';
import { useRefresh } from '../feautures/auth/useRefresh';


function App() {
  useRefresh()

  return (
    <RouterProvider router={router} />
  );
}

export default App;
