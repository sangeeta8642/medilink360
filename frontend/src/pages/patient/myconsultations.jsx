import Navbar from '@/components/navbar';
import { useGetPatientConsultations } from '@/hooks/use-get-patient-consultations'
import React from 'react'

const Consultations = () => {

  const { consultations } = useGetPatientConsultations()

  console.log("consultations", consultations);


  return (
    <main className='w-full h-full '>
      <Navbar />
      <section className='w-full h-full flex flex-col items-center py-5 gap-5'>
        {
          consultations.map((consult) => (
            <ConsultantCard consult={consult} />
          ))
        }
        {
          consultations.map((consult) => (
            <ConsultantCard consult={consult} />
          ))
        }
        {
          consultations.map((consult) => (
            <ConsultantCard consult={consult} />
          ))
        }
        {
          consultations.map((consult) => (
            <ConsultantCard consult={consult} />
          ))
        }
      </section>
    </main>
  )
}

export default Consultations

export const ConsultantCard = ({ consult }) => {
  return (
    <div className='w-1/2 h-20 border-2 border-teal-700 flex gap-2'>
      <div>
        <img src={consult.doctor.profilePic} alt="docts's profile pic" width={50} height={50} />
      </div>
      <div>
        <h3>doctor: {consult.doctor.name}</h3>
        <p>illness: {consult.currentIllNess}
        </p>
      </div>
      <div>
        <p>sent on : {new Date(consult.createdAt).toLocaleString('en-UK')}</p>
      </div>
    </div>
  )
}