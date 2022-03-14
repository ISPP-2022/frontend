import Image from 'next/image'
import avatar from '../../public/carouselImages/3.jpg'
import star from '../../public/images/purple star.svg'

export default function SpaceOwner() {
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
                        <Image src={star}
                            width={20}
                            height={20}
                            alt='star' />
                    </div>
                </div>

            </div>
        </>
    )
}