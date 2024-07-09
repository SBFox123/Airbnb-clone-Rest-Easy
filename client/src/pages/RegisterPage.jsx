import {Link} from "react-router-dom"
import { useState} from "react"
import axios from"axios";



export default function RegisterPage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
   async function registerUser(event){
        event.preventDefault();
     try{
        await axios.post("/register",{
            name,
            email,
            password
        })
        alert("Registration Successful. Proceed to Login")
     }
     catch(err){
        alert("Registration Failed. User already exists")
     }
        
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-40">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto " onSubmit={registerUser}>
                <input type="text"
                 placeholder="Username"
                 value={name} 
                 onChange={event=>setName(event.target.value)}/>
                <input type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={event=>setEmail(event.target.value)} />
                <input type="password" 
                placeholder="password" 
                value={password}
                onChange={event=>setPassword(event.target.value)}
                />
                <button className="login">Register</button>  
                <div className="text-center py-2 text-gray-500" >
                    Already a Member? <Link className="underline text-black" to={'/login'}>Login</Link>
                     </div>         
            </form>
            </div>

            
        </div>
    )
    
}