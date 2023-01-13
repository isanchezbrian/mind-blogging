// import { FcGoogle } from 'react-icons/fc';
// import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, app} from '../../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {toast} from 'react-toastify';
import Link from 'next/link';

export default function Login(){
    // const [user, loading] = useAuthState(auth);
    const route = useRouter()
    const { user, login } = useAuth()
    const [data, setData] = useState({
      email: '',
      password: '',
    //   username: '',
    })
  
    const handleLogin = async (e) => {
      e.preventDefault()
  
      console.log(user)
      try {
        await login(data.email, data.password)
        route.push('/')
      } catch (err) {
        console.log(err)
      }
    }

    // //Sign in with google
    // const googleProvider = new GoogleAuthProvider();
    // const GoogleLogin = async () => {
    //   try {
    //     const result = await signInWithPopup(auth, googleProvider);
    //     route.push("/");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  
    // useEffect(() => {
    //   if (user) {
    //     route.push("/");
    //   } else {
    //     console.log("login");
    //   }
    // }, [user]);

    return(
        <div className="shadow-xl mt-30 p-10 text-gray-700 rounded-lg mb-20">
            <div className="">
                <h3 className="py-4 text-2xl font-medium ">Login to your account</h3>
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
                        <button className='border rounded-lg flex align-middle mb-4 p-4 bg-gray-700 text-white font-medium duration-300 hover:opacity-75' onClick={handleLogin}>
                            Sign In
                        </button>
                    </div>
                    <div className='duration-300 hover:opacity-60'>
                        <Link href={'/auth/signup'}>New user? Create an account</Link>
                    </div>
            </div>
        </div>
    )
}