import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import './App.css';
import { useRefresh } from '../feautures/auth/useRefresh';
import { useUpdateGuestReservations } from '../feautures/gifts/hooks';


function App() {
  useRefresh();
  useUpdateGuestReservations();

  return (
    <RouterProvider router={router} />
  );
}

export default App;
