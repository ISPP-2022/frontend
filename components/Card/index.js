import { Rating } from "@mui/material";
import { Paragraph, Title } from "../Core/Text";
import Image from 'next/image';

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
export const Card = ({ title, surface, rating, price, unitPrice, tags, URLimage }) => {
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
                            {tags.slice(tags.length / 2, tags.length).map(e => <Tag key={modelTags[e]}>{modelTags[e]}</Tag>)}
                        </div>
                        <div className="w-1/2 float-left">
                            {tags.slice(0, tags.length / 2).map(e => <Tag key={modelTags[e]}>{modelTags[e]}</Tag>)}
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <div className="p-4">
            <div className="flex w-full m-2 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/3 bg-cover relative">
                    <Image alt="Image" className="h-full object-cover" src={URLimage || '/TrasteroStatic.webp'} layout="fill" objectFit="cover"></Image>
                </div>
                <div className="w-2/3 p-4">
                    <h1 className="text-gray-900 font-bold sm:text-2xl">{title} | {surface} m²</h1>

                    <Rating value={rating} readOnly />
                    <h1 className="text-blue-bondi font-bold text-2xl">{price} {unitPrice}</h1>

                    {/* Tags */}
                    {printTags(tags)}
                    <div className="flex item-center justify-between mt-3">
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
export const Tag = ({ children }) => {
    return (<p className="mt-2 text-gray-600 text-base">{children}</p>)
};

export const CardMobile = ({ title, surface, rating, price, unitPrice, tags, URLimage }) => {
    return (
        <div className="w-full max-w-[540px] bg-white shadow-lg rounded-xl ">
            {/* Image */}
            <div className="h-52 relative">
                <Image src={URLimage || '/TrasteroStatic.webp'} layout="fill" objectFit="cover" alt="Image" className="w-96 h-96 rounded-t-xl object-cover p-6 bg-cover" />
            </div>
            {/* Body */}
            <div className="grid grid-cols-2 grid-rows-2 h-20">
                <h1 className="text-gray-900 font-bold text-xl sm:text-2xl px-6 col-span-2">{title} | {surface} m²</h1>
                <div className="pl-6 pt-2 float-left"><Rating value={rating} readOnly /></div>
                <h1 className="text-blue-bondi font-bold sm:text-2xl float-right pr-6 pb-6 align-middle text-right">{price} {unitPrice}</h1>
            </div>
        </div>
    );
};