import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { useGetPatientPrescription } from '@/hooks/use-get-patient-prescriptions';
import React from 'react'

const Prescriptions = () => {

  const { prescriptions } = useGetPatientPrescription()

  console.log("prescriptions", prescriptions);


  return (
    <main className='w-full h-full '>
      <Navbar />
      <section className='w-full h-full flex flex-col items-center py-5 gap-5'>
        {
          prescriptions.map((prescription) => (
            <PrescriptionCard prescription={prescription} />
          ))
        }
        {
          prescriptions.map((prescription) => (
            <PrescriptionCard prescription={prescription} />
          ))
        }
        {
          prescriptions.map((prescription) => (
            <PrescriptionCard prescription={prescription} />
          ))
        }
        {
          prescriptions.map((prescription) => (
            <PrescriptionCard prescription={prescription} />
          ))
        }
      </section>
    </main>
  )
}

export default Prescriptions

export const PrescriptionCard = ({ prescription }) => {
  return (
    <div className='w-1/2 h-20 border-2 border-teal-700 flex gap-4 items-center'>
      <div>
        <img src={prescription.consultation.doctor.profilePic} alt="docts's profile pic" width={50} height={50} />
      </div>
      <div>
        <h3>doctor: {prescription.consultation.doctor.name}</h3>
        <p>precautions: {prescription.careToBeTaken}
        </p>
        <p>medicines: {prescription.Medicines}
        </p>
      </div>
      <div>
        <p>sent on : {new Date(prescription.createdAt).toLocaleString('en-UK')}</p>
      </div>
      <div>
        <Button>Viwe receipt</Button>
      </div>
    </div>
  )
}