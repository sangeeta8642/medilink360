import Navbar from '@/components/navbar';
import React from 'react'

const DoctorProfile = () => {

    const user = JSON.parse(localStorage.getItem("authToken"))
    
    return (
        <main>
            <Navbar />
            <section className='p-10 flex items-center justify-center gap-5'>
                <div>
                    <img src={user.profilePic} alt="your profile pic" width={100} height={100} />
                </div>
                <div>
                    <h3>Name: {user.name}</h3>
                    <h3>Email: {user.email}</h3>
                    <h3>Phone: {user.phone}</h3>
                    <h3>Speaciality: {user.speciality} Years</h3>
                    <h3>Experience: {user.experience} Years</h3>
                </div>
            </section>
        </main>
    )
}

export default DoctorProfile