// import { FcGoogle } from 'react-icons/fc';
// import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, app} from '../../utils/firebase';
import { Router, useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {toast} from 'react-toastify';

export default function Signup(){
    const { user, signup } = useAuth()
    console.log(user)
    const route = useRouter()
    const [data, setData] = useState({
      email: '',
      password: '',
    })
  
    const handleSignup = async (e) => {
      e.preventDefault()
  
      try {
        await signup(data.email, data.password)
        route.push('/')
      } catch (err) {
        console.log(err)
      }  
      console.log(data)
    //   return router.push('/dashboard')
    }

    return(
        <div className="shadow-xl mt-30 p-10 text-gray-700 rounded-lg mb-20">
            <div className="">
                <h3 className="py-4 font-medium text-2xl">Create an account</h3>
                {/* <button onClick={GoogleLogin} className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2 duration-300 hover:opacity-75">
                    <FcGoogle className='text-2xl' /> 
                    Sign in with Google
                </button> */}
                    <input
                    // onSubmit={handleLogin}
                    value={data.email}
                    className='p-4 flex align-middle w-full border border-b-2 border-gray-700 rounded-lg mb-4' 
                    type='email' 
                    placeholder='Enter Email'
                    onChange={(e) => 
                        setData({
                            ...data,
                            email: e.target.value
                        })
                    }
                    />
                    <input
                    value={data.password}
                    className='p-4 align-middle flex w-full border border-b-2 border-gray-700 rounded-lg mb-4'
                    type='password' 
                    placeholder='Enter Password'
                    onChange={(e) => 
                        setData({
                            ...data,
                            password: e.target.value,
                        })
                    }
                    />  
                    <div className='flex gap-2'>
                        <button className='border rounded-lg flex align-middle mb-4 p-4 bg-gray-700 text-white font-medium duration-300 hover:opacity-75' onClick={handleSignup}>
                            Create Account
                        </button>
                    </div>
            </div>
        </div>
    )
}