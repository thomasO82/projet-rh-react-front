import './Home.css'
import React, { useState, useEffect } from 'react';

 const Home = () =>{
    const [company, setCompany] = useState(null)
    const [error, setError] = useState("")

    useEffect(()=>{
        const getCompany = async()=>{
           const response = await fetch('http://127.0.0.1:3009/company',{
            method:"GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem('token')
            }
           })
           const data = await response.json()
           console.log(data);
           setCompany(data.company)
        } 
        getCompany()
    },[])
    return (
        <main className='home-container'>
            
            {company ? (
                <p>{company.name}</p>
            ) : (
                <p>Chargement...</p>
            )}
        </main>
    )
}

export default Home