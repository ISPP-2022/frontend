import Image from 'next/image'
import avatar from '../../public/carouselImages/3.jpg'
import { Rating } from "react-simple-star-rating";

export default function SpaceOwner() {
    const fillColorArray = [
        "#f17a45",
        "#f19745",
        "#f1a545",
        "#f1b345",
        "#f1d045",
    ];
    return (
        <>
            <div className='flex ml-8 mt-4'>
                <div className='w-16'>
                    <Image
                        className='rounded-full'
                        src={avatar}
                        alt='Space Owner'
                        width={100}
                        height={100}
                    />
                </div>
                <div className='ml-2 mt-2'>
                    <h1 className='text-base font-bold'>Space O.</h1>
                    <div className='flex'>
                        <h2 className='text-sm font-bold mr-1'> 4,2/5 </h2>
                        <Rating
                            fillColorArray={fillColorArray}
                            className="px-3"
                            fullClassName="px-3"
                            size={20}
                            ratingValue={4 * 20}
                            readonly
                        />
                    </div>
                </div>

            </div>
        </>
    )
}