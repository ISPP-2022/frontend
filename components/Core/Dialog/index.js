import React from "react";
import { Button } from "../Button";
/**
 * Returns the dialog object
 * @param  {string} title - The title of the dialog.
 * @param  {string} textAccept - The text of the accept button.
 * @param  {string} textCancel - The text of the cancel button.
 * @param  {string} size - The size of the dialog: small or medium.
 * @param  {function} onClickAccept - The function to be executed when the accept button is clicked.
 * @param  {function} onClickCancel - The function to be executed when the cancel button is clicked.
 * @param  {} onClickClose - The function to be executed when the close button is clicked.
 * @param  {} children - The content of the dialog.
 */
export const DialogText = ({ title = "Titulo", textAccept = "Aceptar", textCancel = "Cancelar", size = "medium", onClickAccept, onClickCancel, onClickClose, children }) => {
    const dialogSize = {
        "small": "w-1/4",
        "medium": "w-1/2",
    };
    return (
        <>
            {/*Background*/}
            <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-700">
                {/*Dialog*/}
                <div className={"opacity-100 bg-white rounded-lg " + dialogSize[size]}>
                    <div className="flex flex-col items-start p-4">
                        <div className="flex items-center w-full">
                            {/*Title*/}
                            <div className="text-black font-medium text-lg">{title}</div>
                            {/*Close button*/}
                            <svg onClick={onClickClose} className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                            </svg>
                        </div>
                        <div className="">
                            {children}
                        </div>
                        {/*Buttons Accept/Cancel */}
                        <div className="ml-auto">
                            <Button color="primary" onClick={onClickAccept}>{textAccept}</Button>
                            <Button color="secondary" onClick={onClickCancel}>{textCancel}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};