import SpaceOwner from "../SpaceOwner";
import { Button } from "../../components/Core/Button";

export default function SpaceInfo(props) {

    return (
        <>
            <div className="my-4 flex justify-between">
                <h2 className="ml-8 text-2xl font text-left">{props.space.name}</h2>
                <h2 className="mr-8 text-2xl font text-right">{props.space.dimensions + "\u00B2"}</h2>
            </div>
            <h3 className="ml-8 text-xl font-bold text-left">{props.space.priceHour.toString()} €/hora</h3>
            <div className="my-4 flex justify-between">
                <SpaceOwner space={props.space} owner={props.owner} />
                <Button type="button" className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl">
                    Chat
                </Button>
            </div>
            <div className="flex justify-center my-2">
                <Button onClick={() => props.setShowModal(true)} type="button" className="lg:hidden bg-gray-50 text-webcolor-50 border-webcolor-50 border-2">
                    Reservar
                </Button>
            </div>

            <hr className=" bg-webcolor-50 w-[80%] m-auto" />

            <div className="felx justify-center overflow-x-auto whitespace-nowrap my-3 hover:overflow-x-scroll">
                {props.space.tags.map(tag => (
                    <Button type="button" className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl inline-block" key={tag.tag} >
                        {tag.tag}
                    </Button>
                ))}
            </div>

            <hr className=" bg-webcolor-50 w-[80%] m-auto mb-4" />

            <p className="text-justify whitespace-pre-line mx-3">{props.space.description}</p>
        </>
    );
}