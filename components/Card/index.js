import { Rating } from "@mui/material";
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import LightModeIcon from '@mui/icons-material/LightMode';
import OpacityIcon from '@mui/icons-material/Opacity';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AirIcon from '@mui/icons-material/Air';
import { Paragraph, Title } from "../Core/Text";
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
export const Card = ({ title, surface, rating, price, unitPrice, tags, URLimage}) => {
    const modelTags = {
        enchufe: <><ElectricalServicesIcon /> Enchufe</>,
        wifi: <><NetworkWifiIcon /> Wifi</>,
        agua: <><OpacityIcon /> Agua</>,
        iluminacion: <><LightModeIcon /> Iluminado</>,
        ventilacion: <><AirIcon /> Ventilado</>,
        cerrado: <><VpnKeyIcon /> Cerrado</>,
    };

    /**
     * Prints the tags in two columns
     * @param  {array<string>} tags
     */
    const printTags = (tags) => {
        if(tags) {
            return (
                <div className="w-full">
                    <div className="w-1/2 float-left">
                        {tags.slice(tags.length / 2, tags.length).map(e => <Tag>{modelTags[e]}</Tag>)}
                    </div>
                    <div className="w-1/2 float-left">
                        {tags.slice(0, tags.length / 2).map(e => <Tag>{modelTags[e]}</Tag>)}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="p-4">
            <div className="flex w-full m-2 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/3 bg-cover">
                    <img className="h-full object-cover" src={URLimage}></img>
                </div>
                <div className="w-2/3 p-4">
                    <h1 className="text-gray-900 font-bold text-2xl">{title} | {surface} m²</h1>

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