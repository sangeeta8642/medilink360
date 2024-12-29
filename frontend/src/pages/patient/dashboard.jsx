import DoctorCard from '@/components/doctorCard'
import Navbar from '@/components/navbar'
import { useGetAllDoctors } from '@/hooks/uset-get-all-doctors'
import React from 'react'

const Dashboard = () => {
  const { doctors } = useGetAllDoctors()
 

  return (
    <>
      <Navbar />
      <main className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-col-3 sm:grid-cols-2 grid-cols-1 p-8 place-items-center gap-5'>
        {
          doctors.map((doc) => (
            <DoctorCard doctor={doc} key={doc._id} />
          ))
        }
      </main>
    </>
  )
}

export default Dashboard