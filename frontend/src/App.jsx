import { useState } from 'react'
import { Button } from './components/ui/button'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './route'
// import Navbar from './components/navbar'

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <RouterProvider router={appRouter} ></RouterProvider>
    </>
  )
}

export default App
