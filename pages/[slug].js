import Message from "../components/message"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth, db } from "../utils/firebase"
import { toast } from "react-toastify"
import { arrayUnion, getDoc, Timestamp, updateDoc, doc, onSnapshot, snapshot, orderBy, query } from "firebase/firestore"
import moment from "moment"

export default function Details(){

    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessage, setAllMessages] = useState([]);

    let commentDate = moment().format('MMMM Do YYYY');

    //Submit a message
    const submitMessage = async () => {
        //Check if user is logged
        if(!auth.currentUser) return router.push('/auth/login');

        if(!message){
            toast.error("Don't leave an empty comment", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        const docRef = doc(db, 'posts', routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                username: auth.currentUser.displayName,
                time: Timestamp.now(),
                commentDate,
            })
        })
        setMessage("");
    }

    //Get comments
    const getComments = async () => {
        const docRef = doc(db, 'posts', routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments);
        });
        return unsubscribe;
    }

    // const getComments = async () => {
    //     const docRef = doc(db, 'posts', routeData.id);
    //     const docSnap = await getDoc(docRef);
    //     setAllMessages(docSnap.data().comments);
    // }

    useEffect(() => {
        if(!router.isReady) return;
        getComments();
    }, [router.isReady])

    return(
        <div>
            <Message {...routeData}></Message>
            <div className="my-4">
                <div className="flex">
                    <input 
                        onChange={(e) => setMessage(e.target.value)} 
                        type='text' 
                        value={message} 
                        placeholder='Add a comment' 
                        className=" w-full p-2 text-sm border-2" 
                    />
                    <button onClick={submitMessage} className="bg-orange-500 text-white py-2 px-4 text-sm">Submit</button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessage?.map(message => (
                        <div className="bg-white p-4 my-4 border-2 rounded-lg" key={message.time}>
                            <div className="flex items-center gap-2 mb-4">
                                <img className="w-10 rounded-full" src={message.avatar} alt='' />
                                <h2>{message.username}</h2>
                            </div>
                            <h2>{message.message}</h2>
                            <div className="flex justify-end text-sm font-thin italic">
                                <p>{message.commentDate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}