import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]:input.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const url = "/api/users";
            const {data: res} = await axios.post(url,data);
            navigate("/login");
            console.log(res.error);
        }catch(error){
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500){
                    setError(error.response.data.mesasge);
            }
        }
    };
    return(
        <div className="w-full h-screen bg-black flex-col justify-center items-center">
            <div className='text-4xl font-bold text-blue-500 py-6 text-center'>
                REGISTER
            </div>

            <div>
                <form className='text-center border-[1px] shadow-2xl border-blue-400 max-w-md rounded-lg items-center p-4 mx-auto bg-gradient-to-r from-blue-500 to-purple-500' onSubmit={handleSubmit}>
                    <h1 className='py-4 text-2xl text-center font-bold'>Create an account</h1>
                    <div className='justify-center py-4'>
                        <input
                            type="text"
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleChange}
                            value = {data.firstName}
                            required
                            className='w-full mb-4 p-2 rounded-md text-center border border-blue-400 bg-white'
                        />

                        <input
                            type="text"
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleChange}
                            value = {data.lastName}
                            required
                            className='w-full mb-4 p-2 rounded-md text-center border border-blue-400 bg-white'
                        />
                        <input
                            type="text"
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value = {data.email}
                            required
                            className='w-full mb-4 p-2 rounded-md text-center border border-blue-400 bg-white'
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value = {data.password}
                            required
                            className='w-full mb-4 p-2 rounded-md text-center border border-blue-400 bg-white'
                        />
                        <button type='submit' className='border p-4 rounded-md bg-blue-300'>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Signup;
