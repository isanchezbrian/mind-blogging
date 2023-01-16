// import React, { useContext, useState, useEffect, useRef } from 'react'
// import {auth, db} from '../../utils/firebase'
// import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
// import {doc, getDoc, setDoc, docRef, ref, set, query, where, collection, onSnapshot} from 'firebase/firestore'
// const AuthContext = React.createContext()

// export function useAuth() {
//     return useContext(AuthContext)
// }

// export function AuthProvider({children}) {
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)
//     // const [username, setUserName] = useState(null);
//     const userInfo = useRef()
//     console.log(user)
//     const auth = getAuth();

//     const signup = async (email, password) => {
//         return createUserWithEmailAndPassword(auth, email, password)
//         // .then(
//         //     async (result) => {
//         //         console.log(result)
//         //         try {
//         //             const ref = doc(db, 'userInfo/', result.user.uid)
//         //             const docRef = await setDoc(ref, {username})
//         //         } catch (error) {
//         //             console.log(error)
//         //         }
//         //     }
//         // )
//         // .then((userCredential) => {
//         //     const user = userCredential.user;
//         //     set(ref(db, 'userInfo' + user.uid), {
//         //         username: username,
//         //         email: email
//         //     })
//         //     alert('user created!')
//         // })
//         // .catch((error) => {
//         //     const errorCode = error.code;
//         //     const errorMessage = error.message;
            
//         //     alert(errorMessage)
//         // })
//     }

//     const login = async (email, password) => {
//         return signInWithEmailAndPassword(auth, email, password)
//         // .then((userCredential) => {
//         //     const user = userCredential.user;

//         //     const dt = new Date();
//         //     update(ref(db, 'username' + username.id), {
//         //         last_login: dt,
//         //     })
//         //     alert('user logged in!')
//         // })
//         // .catch((error) => {
//         //     const errorCode = error.code;
//         //     const errorMessage = error.message;
            
//         //     alert(errorMessage)
//         // })        
//     }

//     // const user = auth.currentUser;
//     // onAuthStateChanged(auth, (user) => {
//     //   if (user) {
//     //     // User is signed in, see docs for a list of available properties
//     //     // https://firebase.google.com/docs/reference/js/firebase.User
//     //     const uid = user.uid;
//     //     // ...
//     //   } else {
//     //     // User is signed out
//     //     // ...
//     //   }
//     // });

//     const logout = async () => {
//         setUser(null)
//         await signOut(auth)
//     }

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async user => {
//             if(user){
//             setUser({
//                 uid: user.uid,
//                 // email: user.email,
//                 // username: user.uid.username,
//             })
//         } else {
//             setUser(null)
//         }
//             setLoading(false)
//         })
//         return () => unsubscribe()
//     }, [])

//     return(
//         <AuthContext.Provider value={{ user, login, signup, logout}}>
//             {loading ? null : children}
//         </AuthContext.Provider>
//     )
// }