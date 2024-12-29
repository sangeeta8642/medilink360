import React from 'react'
import { doctorLinks, userLinks } from '.'
import { LogOut } from '@/actions/logOut'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("authToken"))
    const navigator = useNavigate()
    return (
        <div className='w-full h-16 text-white bg-teal-700 px-5 flex items-center justify-between'>
            <h1 className='text-2xl '>
                Navbar
            </h1>
            <div className='flex gap-3'>
                {
                    user ? (
                        user.role === "patient" ? (
                            <>
                                {userLinks.map((patient) => (
                                    <a href={patient.link} key={patient.link}>
                                        {patient.title}
                                    </a>
                                ))}
                                <button onClick={() => {
                                    LogOut()
                                    alert("logout successfull")
                                    navigator('/')
                                }} >Log out</button>
                            </>
                        ) : user.role === "doctor" ? (
                            <>
                                {doctorLinks.map((doctor) => (
                                    <a href={doctor.link} key={doctor.link}>
                                        {doctor.title}
                                    </a>
                                ))}
                                <button onClick={() => {
                                    LogOut()
                                    alert("logout successfull")
                                    navigator('/')
                                }}>Log out</button>
                            </>
                        ) : null
                    ) : null
                }
            </div>

        </div>
    )
}

export default Navbar