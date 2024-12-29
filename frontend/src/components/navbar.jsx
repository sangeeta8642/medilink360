import { userContext } from '@/context/userContext'
import React, { useContext } from 'react'
import { doctorLinks, userLinks } from '.'
// import { Link } from 'react-router-dom'

const Navbar = () => {

    const { user } = useContext(userContext)

    return (
        <div className='w-full h-16 text-white bg-teal-700 px-5 flex items-center justify-between'>
            <h1 className='text-2xl '>
                Navbar
            </h1>
            {/* <div className='flex gap-3'>
                {
                    user ? (
                        
                        user === "patient" ? (
                            userLinks.map((patient) => (
                                <a href={patient.link} key={patient.link} >{patient.title}</a>
                            ))
                            <button>Log out</button>
                        ) 
                        
                        : user === "doctor" ? (
                            doctorLinks.map((doctor) => (
                                <a href={doctor.link} key={doctor.link} >{doctor.title}</a>
                            ))
                        ) : null
                        
                    ) : null
                }


            </div> */}
            <div className='flex gap-3'>
                {
                    user ? (
                        user === "patient" ? (
                            <>
                                {userLinks.map((patient) => (
                                    <a href={patient.link} key={patient.link}>
                                        {patient.title}
                                    </a>
                                ))}
                                <button>Log out</button> {/* Log out button for patient */}
                            </>
                        ) : user === "doctor" ? (
                            <>
                                {doctorLinks.map((doctor) => (
                                    <a href={doctor.link} key={doctor.link}>
                                        {doctor.title}
                                    </a>
                                ))}
                                <button>Log out</button> {/* Log out button for patient */}
                            </>
                        ) : null
                    ) : null
                }
            </div>

        </div>
    )
}

export default Navbar