// import { auth, db } from '../utils/firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { collection, onSnapshot, query, where, doc, deleteDoc } from 'firebase/firestore';
// // import {BsTrash} from 'react-icons/bs';
// // import {AiOutlineEdit} from 'react-icons/ai';
// import Link from 'next/link';

// export default function Profile () {
    
//     const route = useRouter();
//     const [user, loading] = useAuthState(auth);
//     //See if user is logged in 

//     // const getData = async () => {
//     //     if(loading) return;
//     //     if(!user) return route.push('/auth/login'); 
//     //     const collectionRef = collection(db, 'posts');
//     //     const q = query(collectionRef, where('user', '==', user.uid));
//     //     const unsubscribe = onSnapshot(q, (snapshot => {
//     //         setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
//     //     }))
//     //     return unsubscribe;
//     // }

//     //Get users data
//     // useEffect(() => {
//     //     getData();
//     // }, [user, loading]);

    

//     return(
//         <div className="shadow-xl mt-30 p-10 text-gray-700 rounded-lg mb-20">
//             <div className="">
//                 <h3 className="py-4 font-medium text-2xl">Profile</h3>

//                     <input 
//                     // value={data.username}
//                     className='p-4 flex align-middle w-full border border-b-2 border-gray-700 rounded-lg mb-4'
//                     type='text'
//                     placeholder='Enter Full Name'
//                     // onChange={(e) =>
//                     //     setData({
//                     //         ...data,
//                     //         username: e.target.value,
//                     //     })
//                     // }
//                     />
//                     <input
//                     // onSubmit={handleLogin}
//                     // value={data.email}
//                     className='p-4 flex align-middle w-full border border-b-2 border-gray-700 rounded-lg mb-4' 
//                     type='email' 
//                     placeholder='Enter Email'
//                     // onChange={(e) => 
//                     //     setData({
//                     //         ...data,
//                     //         email: e.target.value,
//                     //     })
//                     // }
//                     />
//                     <input
//                     // value={data.password}
//                     className='p-4 align-middle flex w-full border border-b-2 border-gray-700 rounded-lg mb-4'
//                     type='password' 
//                     placeholder='Enter Password'
//                     // onChange={(e) => 
//                     //     setData({
//                     //         ...data,
//                     //         password: e.target.value,
//                     //     })
//                     // }
//                     />  
//                     <div className='flex gap-2'>
//                         <button className='border rounded-lg flex align-middle mb-4 p-4 bg-gray-700 text-white font-medium duration-300 hover:opacity-75' onClick=''>
//                             Update Profile
//                         </button>
//                     </div>
//             </div>
//         </div>
//     )
// }