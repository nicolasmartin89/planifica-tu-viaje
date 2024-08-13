import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from "@/components/ui/sonner"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/crear-viaje",
    element: <CreateTrip />,
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Header/>
    <Toaster />
    <RouterProvider router={router}/>
  </StrictMode>,
)
