import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button.jsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const nav = useNavigate()

  return (
    <main className='h-[100dvh] overflow-hidden'>
      <Navbar />
      <section className='flex flex-col items-center justify-center w-full h-full gap-10'>
        <h1 className='text-teal-700 text-6xl font-semibold'>
          Please choose your role
        </h1>
        <div className='flex gap-10'>
          <Button size="lg" className="bg-teal-700" onClick={()=>nav('/doctor')}>Doctor</Button>
          <Button size="lg" className="bg-teal-700" onClick={()=>nav('/patient/signup')}>Patient</Button>
          {/* <Button>Patient</Button> */}
        </div>
      </section>
    </main>
  )
}
export default Home
