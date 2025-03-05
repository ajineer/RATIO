import React, { useState } from 'react'

const index = () => {

  const [email, setEmail] = useState("")
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try { 
//         const response = await fetch("/api/test")
//         const data = await response.json()
//         console.log(data.message)
//     } catch ( error ) { 
//         console.error("Error: ", error)
//     }
//   }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    })
    const json = await response.json()
    if(!response.ok){
        console.error("Error: ", response)
        alert("look here: ", json?.error)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Signup</h2>
        <input
            required
            placeholder='Enter Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
            type="submit" value="Submit"
        />
    </form>
  )
}

export default index