import Image from 'next/image';
import Link from 'next/link';
import { Rating } from "@mui/material";

export default function UserInfo({ user, ratings }) {

    const avgRating = ratings.length ? ratings.reduce((acc, cur) => acc + cur.rating) / ratings.length : 0;

    return (
        <div className="basis-[60%] md:basis-5/6 xl:basis-[40%] relative flex flex-col xl:flex-row items-center">
            <div className="w-20 md:mr-3 flex justify-center">
                <Image src={user?.avatar ? `data:${user.avatar.mimetype};base64, ${user.avatar.image}` : '/spacePlaceholder.jpg'} className="rounded-full bg-white" width={300} height={300} objectFit="cover" alt={`spaceImage`}></Image>
            </div>
            <div className="basis-[45%] md:basis-1/2 xl:basis-3/4 flex flex-col items-center xl:items-start justify-start pl-2 pr-2 w-full mt-2 xl:mt-0 space-y-1">
                <Link href={`/user/${user.id}`} passHref>
                    <a className="font-bold text-ellipsis whitespace-nowrap">{`${user?.name} ${user.surname ?? ''}` || 'SomeUser'}</a>
                </Link>
                <Rating value={avgRating || 0} readOnly />
                <p className="text-gray-600 text-sm">{ratings.length} {ratings.length === 1 ? 'valoración' : 'valoraciones'}</p>
            </div>
        </div>
    )
}