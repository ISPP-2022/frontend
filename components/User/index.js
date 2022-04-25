import Image from 'next/image';
import Link from 'next/link';
import { Rating } from "@mui/material";


export default function UserInfo({ user, userSession, ratings, withChat }) {

    const avgRating = ratings.length > 0 ? ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length : 0;

    return (
      <>
        <div className="basis-[60%] md:basis-5/6 xl:basis-[40%] relative flex flex-col xl:flex-row items-center">
            <div className="w-20 md:mr-3 flex justify-center">
                <Image src={user?.avatar ? `data:${user.avatar.mimetype};base64, ${user.avatar.image}` : '/spacePlaceholder.jpg'} className="rounded-full bg-white" width={300} height={300} objectFit="cover" alt={`spaceImage`}></Image>
            </div>
            <div className="basis-[45%] md:basis-1/2 xl:basis-3/4 flex flex-col items-center xl:items-start justify-start pl-2 pr-2 w-full mt-2 xl:mt-0 space-y-1">
                {(userSession?.userId === user?.id && userSession?.role === 'SUBSCRIBED') && 
                <div className='flex justify-center'>
                    <p className='font-bold  text-[#F59E0B]'>¡Usuario Premium!</p>
                </div>
                }
                <Link href={`/user/${user.id}`} passHref>
                    <a className="font-bold text-ellipsis whitespace-nowrap">{`${user?.name} ${user.surname ?? ''}` || 'SomeUser'}</a>
                </Link>
                <Rating value={avgRating || 0} readOnly />
                <p className="text-gray-600 text-sm">{ratings.length} {ratings.length === 1 ? 'valoración' : 'valoraciones'}</p>
            </div>
            {withChat &&
                <div className='flex justify-center'>
                    <Link href={`/chat?user=${user.id}`} passHref>
                        <button type="submit" className="h-full p-3 rounded-full bg-blue-bondi text-white flex items-center space-x-1">
                            <p>Chat</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </Link>
                </div>}
        </>
    )
}