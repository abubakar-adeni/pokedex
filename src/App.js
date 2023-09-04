import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import Home from './pages/Home'
import Profile from './pages/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile/:id',
    element: <Profile />,
  },
])

function App() {
 
  return (
    <div className="App">
      <RouterProvider router={router} />
  </div>
  );
}

export default App;
