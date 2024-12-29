import Navbar from '@/components/navbar';
import React from 'react'

const PatientProfile = () => {

    const user = JSON.parse(localStorage.getItem("authToken"))
    console.log("user", user);


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
                    <h3>Age: {user.age} Years</h3>
                </div>
            </section>
        </main>
    )
}

export default PatientProfile