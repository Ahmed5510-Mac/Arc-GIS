import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"; 
// import './reg.css'
function Registretion() {
    const navigate=useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    
    const handelForm = (e) => {
        e.preventDefault()
        // ===============chick email =================
    const rdata = JSON.parse(localStorage.getItem("user")) || []
    const user = rdata.find((el) => {
        return  email === el.email
    })
        if (user)
        {
            Swal.fire('This email already exists')
            return
        }
// ==============
        if (!password || !email||!phone||!name)
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops.😡..',
                text: 'PLZ Fill All input ',
                footer: '<a href="./register">if you dont have acounnt go to registeration </a>'
            })
            return
        }
        const data = JSON.parse(localStorage.getItem("user"))||[]
         data.push({ name, email, password, phone })
        localStorage.setItem("user", JSON.stringify(data))
        Swal.fire(
            'Good job!👍',
            'You clicked the button!',
            'success'
          )
        navigate("/login")
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
            {/* --------------------------------- */}
            <form onSubmit={handelForm} >
                <h2>Registr </h2>
                <div className="form-group">
                    <label htmlFor=""> Name</label>
                    <input type="text" className='form-control' placeholder='Enter your name'
                        onChange={(e) => { setName(e.target.value) }} value={name} />
                </div>
                {/* ------------------------- */}
                <div className="form-group">
                    <label htmlFor=""> Email</label>
                    <input type="email" className='form-control' placeholder='Enter email'
                      onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </div>
                {/* ------------------------- */}
                <div className="form-group">
                    <label htmlFor=""> Passowrd</label>
                    <input type="password" className='form-control'
                        placeholder='Enter Password'
                      onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </div>
                {/* ------------------------- */}
                <div className="form-group">
                    <label htmlFor=""> Phone</label>
                    <input type="text" className='form-control' placeholder='Enter Phpone number'
                        onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                </div>
                <div className="footer">
                <button type='submit' className='btn btn-dark btn-larg'> <i class="fas fa-file-invoice"></i> | Register</button>
                <button onClick={()=>{navigate("/login")}} className='btn btn-dark btn-larg'><i class="fas fa-user"></i> |  to Login</button>
                </div>
            </form>
        </div>
    )
}
export default Registretion