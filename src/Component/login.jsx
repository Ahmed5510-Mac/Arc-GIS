import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import './reg.css'
import Swal from "sweetalert2";  
function Login() {
    const navigate=useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const handelForm = (e) => {
        e.preventDefault()
        if (!email||!password) {   
            Swal.fire({
                icon: 'error',
                title: 'Oops.😡..',
                text: 'PLZ enter correct user name & password!',
                footer: '<a href="./register">if you dont have acounnt go to registeration </a>'
              })
        }
        const data = JSON.parse(localStorage.getItem("user")) || []
        const user = data.find((el) => {
            return password === el.password && email === el.email
        })
            if (user)
            {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  }) 
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })
                setTimeout(() => {
                    navigate("/map",{state:{user}})
                },3000)
            }
        else
        {
            console.log("fiald");
            }
    }
    return (
        <div className='container' >
            {/* --------------background------------------- */}
                 <div class="background-container">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt="" />
                    <div class="stars"></div>
                    <div class="twinkling"></div>
                    <div class="clouds"></div>
                </div>
            {/* ------------Login form--------------------- */}
            <h1>Khatib & Alami</h1>
            <form onSubmit={handelForm} >
                <h2>Login </h2>    
                    {/* ---------- input -1 --------------- */}
                <div className="form-group">
                    <label htmlFor=""> Email</label>
                    <input type="email" className='form-control' placeholder='Enter email'
                      onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </div>
                    {/* ---------- input -2 --------------- */}
                <div className="form-group">
                    <label htmlFor=""> Passowrd</label>
                    <input type="password" className='form-control'
                        placeholder='Enter Password'
                      onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </div>
                <div className="footer">
                <button type='submit' className='btn btn-dark btn-larg'><i class="fas fa-user"></i> Login</button>
                <button onClick={()=>{navigate("/register")}} className='btn btn-dark btn-larg'> <i class="fas fa-file-invoice"></i>to Register</button>
                </div>
            </form>
        </div>
    )
}
export default Login