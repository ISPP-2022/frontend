import { Rating } from "@mui/material";
import { Paragraph, Title } from "../Core/Text";
import Image from 'next/image';


const calculateSurface = (dimensions) => {
    const [width, height] = dimensions.split('x');
    return (width * height).toFixed(2);
};

const calculateUnitPrice = (priceHour, priceDay, priceMonth) => {
    if (priceHour) {
        return { amount: priceHour, unit: "€/h" };
    } else if (priceDay) {
        return { amount: priceDay, unit: "€/d" };
    } else if (priceMonth) {
        return { amount: priceMonth, unit: "€/m" };
    } else {
        return { amount: "-", unit: "" };
    }
};

/**
 * Returns the card object for index page
 * @param  {string} title
 * @param  {number} surface
 * @param  {number} rating
 * @param  {number} price
 * @param  {string} unitPrice
 * @param  {array<string>} tags
 * @param  {string} URLimage
 */
export const Card = ({ space: { name, dimensions, priceHour, priceDay, priceMonth, city, rating, tags, images } }) => {
    const modelTags = {
        enchufe: <><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 float-left" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Enchufe</>,
        wifi: <><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 float-left" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg> Wifi</>,

        agua: <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 float-left bi bi-droplet" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
            <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" /></svg> Agua</>,

        iluminacion: <><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 float-left" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> Con luz</>,

        ventilacion: <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 float-left bi bi-wind" viewBox="0 0 16 16">
            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" /></svg> Ventilado</>,

        cerrado: <><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 float-left" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg> Cerrado</>,
        empty: <p className="text-white">A</p>
    };

    /**
     * Prints the tags in two columns
     * @param  {array<string>} tags
     */
    const printTags = (tags) => {
        if (tags) {
            return (
                <>
                    <div className="w-full">
                        <div className="w-1/2 float-left">
                            {tags.slice(tags.length / 2, tags.length).map((e, index) => <Tag key={'l' + index}>{modelTags[e]}</Tag>)}
                        </div>
                        <div className="w-1/2 float-left">
                            {tags.slice(0, tags.length / 2).map((e, index) => <Tag key={'r' + index}>{modelTags[e]}</Tag>)}
                        </div>
                    </div>
                </>
            );
        }
    };

    const price = calculateUnitPrice(priceHour, priceDay, priceMonth);
    const surface = calculateSurface(dimensions);

    return (
        <div className="p-4 h-full">
            <div className="flex w-full h-full m-2 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/3 bg-cover relative">
                    <Image src={images?.length > 0 ? `data:${images[0].mimetype};base64, ${images[0].image}` : '/spacePlaceholder.jpg'} layout='fill' objectFit="cover" className="h-full" alt={`${name}`} />
                    {/*<Image alt="Image" className="h-full object-cover" src={URLimage || '/TrasteroStatic.webp'} layout="fill" objectFit="cover"></Image>*/}
                </div>
                <div className="w-2/3 p-4 flex flex-col">
                    <h1 className="text-gray-900 font-bold sm:text-2xl">{name} | {surface} m²</h1>

                    <Rating value={rating} readOnly />
                    <h1 className="text-blue-bondi font-bold text-2xl">{price.amount} {price.unit}</h1>

                    <div className="flex items-end justify-end mt-3 h-full text-webcolor-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="flex text-xl text-center items-end h-full">
                            {city}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};
/**
 * Styles for every tag
 * @param  {string} {children}
 */
export const Tag = ({ children, props }) => {
    return (<div className="mt-2 text-gray-600 text-base">{children}</div>)
};

export const CardMobile = ({ space: { name, dimensions, priceHour, priceDay, priceMonth, city, rating, tags, images } }) => {

    const price = calculateUnitPrice(priceHour, priceDay, priceMonth);
    const surface = calculateSurface(dimensions);
    return (
        <div className="w-full max-w-[540px] bg-white shadow-lg rounded-xl ">
            {/* Image */}
            <div className="h-52 relative">
                <Image src={images?.length > 0 ? `data:${images[0].mimetype};base64, ${images[0].image}` : '/spacePlaceholder.jpg'} layout="fill" objectFit="cover" alt={`${name}`} className="w-96 h-96 rounded-t-xl object-cover p-6 bg-cover" />
            </div>
            {/* Body */}
            <div className="grid grid-cols-[2fr_1fr] grid-rows-2 h-20 p-2">
                <h1 className="text-gray-900 font-bold text-md sm:text-2xl line-clamp-1">{name} | {surface} m²</h1>
                <h1 className="text-blue-bondi sm:font-bold text-md sm:text-2xl flex justify-end text-right">{price.amount} {price.unit}</h1>
                <div className=""><Rating value={rating} readOnly /></div>
                <div className="flex items-center justify-end h-full text-webcolor-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="flex items-center text-md text-center h-full">
                        {city}
                    </p>
                </div>
            </div>
        </div>
    );
};