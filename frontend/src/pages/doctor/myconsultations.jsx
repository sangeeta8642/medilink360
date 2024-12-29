import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { useGetdoctorConsultations } from '@/hooks/use-get-doctor-consultations';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Consultations = () => {

  const { consultations } = useGetdoctorConsultations()

  return (
    <main className='w-full h-full '>
      <Navbar />
      <section className='w-full h-full flex flex-col items-center py-5 gap-5'>
        {
          consultations.length > 0 ? (
            consultations.map((consult) => (
              <ConsultantCard consult={consult} />
            ))
          ) : <h2>You have no consultations</h2>
        }

      </section>
    </main>
  )
}

export default Consultations

export const ConsultantCard = ({ consult }) => {

  const nav = useNavigate()

  return (
    <div className='border-2 border-teal-700 flex gap-2 items-center justify-evenly px-5'>
      <div>
        <img src={consult.patient.profilePic} alt="docts's profile pic" width={50} height={50} />
      </div>
      <div>
        <h3>patient name: {consult.patient.name}</h3>
        <p>age: {consult.patient.age}</p>
        <p>illness: {consult.currentIllNess}</p>
        <p>recent surgery: {consult.recentSurgery.name} {consult.recentSurgery.timespan}</p>
      </div>
      <div>
        <p>received on : {new Date(consult.createdAt).toLocaleString('en-UK')}</p>
      </div>
      <Button onClick={() => nav(`/doctor/prescribe/${consult._id}`)} >Priscribe</Button>
    </div>
  )
}