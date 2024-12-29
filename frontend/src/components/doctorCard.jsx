import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const DoctorCard = ({ doctor }) => {

    const nav = useNavigate()

    return (
        <div className='w-80 h-48 border-2 border-teal-700 flex gap-5 p-2 '>
            <div>
                <img src={doctor.profilePic} alt="doctor profile pic" width={40} height={40} className='rounded-full' />
            </div>
            <div>
                <h3 className='text-2xl font-bold'>{doctor.name}</h3>
                <p>{doctor.speciality}</p>
                <p>{doctor.experience}years of experience</p>
                <p>contact : {doctor.phone}</p>
                <p>email : {doctor.email}</p>
                <Button onClick={()=>nav(`/patient/consultant/${doctor._id}`)} >Consult</Button>
            </div>

        </div>
    )
}

export default DoctorCard