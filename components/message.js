export default function Message({children, avatar, username, description, time, date, day}){


    return(
        <div className="bg-white p-8 my-3 border-b-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className='w-10 rounded-full' />
                <h2>{username}</h2>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            <div className="flex justify-end text-sm font-thin italic">
                <p>{day}</p>
            </div>
            {children}
        </div>
    )
}