import React from "react";
import { Button } from "../Button";
import { Title } from "../Text";
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
export const DialogText = ({ title = "Titulo", textAccept = "Aceptar", textCancel = "Cancelar", width = "medium", height = "small", onClickAccept, onClickCancel, onClickClose, visibleAcceptButton=true, visibleCancelButton=true, children }) => {
    const dialogSize = {
        "small": "1/4",
        "medium": "1/2",
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-900 opacity-50 w-full h-full">
            </div>
            <div className="fixed inset-0 flex items-center justify-center z-10">
                {/* Main modal */}
                <div className="relative px-4 w-full max-w-2xl h-auto">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                {title}
                            </h3>
                            <button type="button" onClick={onClickClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-6 space-y-6">
                            {children}
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            {visibleAcceptButton && <Button color="primary" onClick={onClickAccept}>{textAccept}</Button>}
                            {visibleCancelButton && <Button color="secondary" onClick={onClickCancel}>{textCancel}</Button>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};