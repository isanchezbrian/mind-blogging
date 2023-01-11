import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, app} from '../../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login(){
    const auth = getAuth(app);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const route  = useRouter();
    const [user, loading] = useAuthState(auth);

    // const signUp = () => {   
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Signed in 
    //         const user = userCredential.user;
    //         route.push('/')
    //         console.log(user)
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ..
    //     });
    // }

    // const signIn = () => {
    //     signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Signed in 
    //         const user = userCredential.user;
    //         route.push('/')
    //         console.log(user)
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //     });
    // }
    const{ login, signup, currentUser } = useAuth()

    async function submitHandler() {
        if(!email || !password) {
            setError('Please enter Email and Password')
            return
        }
        if(isLoggingIn) {
            try {
                return await login(email, password)
            } catch (err){
                setError('Incorrect email or password')
            }
            
        }
        await signup(email, password)
    }

    // const handlelogin = () => {
    //     e.preventDefault(data)
    // }

    // const handlelogin = () => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             const uid = user.uid;
    //             route.push('/')
    //             // ...
    //         } else {
    //             // User is signed out
    //             console.log('login')
    //             // route.push('/login')
    //             // ...
    //         }
    //     });
    // }

    //Sign in with Google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            route.push("/");
        } catch (error) {
            console.log(error);
        }
    }; 
    

    useEffect(() => {
        if(user){
            route.push("/")
        }else{
            console.log('login');
        }
    }, [user]);

    return(
        <div className="shadow-xl mt-30 p-10 text-gray-700 rounded-lg mb-20">
            <h2 className="text-2x1 font-medium">Join Today</h2>
            <div className="py-4">
                <h3 className="py-4">Sign in with one of the providers</h3>
                <button onClick={GoogleLogin} className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2 duration-300 hover:opacity-75">
                    <FcGoogle className='text-2xl' /> 
                    Sign in with Google
                </button>
                <form className='py-4'>
                    <input
                    value={email}
                    className='p-4 flex align-middle w-full border border-b-2 border-gray-700 rounded-lg mb-4' 
                    type='email' 
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                    value={password}
                    className='p-4 align-middle flex w-full border border-b-2 border-gray-700 rounded-lg mb-4'
                    type='password' 
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    />  
                    <div className='flex gap-2'>
                        <button className='border rounded-lg flex align-middle mb-4 p-4 bg-gray-700 text-white font-medium duration-300 hover:opacity-75' onClick={signup}>
                            Create Account
                        </button>
                        <button className='border rounded-lg flex align-middle mb-4 p-4 bg-gray-700 text-white font-medium duration-300 hover:opacity-75' onClick={login}>
                            Sign In
                        </button> 
                    </div>
                </form>
            </div>
        </div>
    )
}