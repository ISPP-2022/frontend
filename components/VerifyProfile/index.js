import axios from "axios";
import { useState } from "react";
import { DialogText } from "../Core/Dialog";
import { FieldTextBox } from "../Core/Form";
import { Paragraph } from "../Core/Text";

/**
 * Return a modal to verify the profile with phone number.
 * @param  {string} phoneNumber - Phone number of the user.
 */
export const VerifyProfile = ({ phoneNumber }) => {
    const [isOpenConfirmPhoneNumber, setIsOpenConfirmPhoneNumber] = useState(true);
    const [isOpenInsertCode, setIsOpenInsertCode] = useState(false);
    const [isOpenResponseDialog, setIsOpenResponseDialog] = useState(false);
    const [messageResponseDialog, setMessageResponseDialog] = useState("");
    const [code, setCode] = useState("");

    const onAcceptConfirmPhoneNumber = () => {
        setIsOpenConfirmPhoneNumber(false);
        axios.post(`${process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:4000'}/api/v1/verify`, {}, { withCredentials: true })
            .then(res => {
                setIsOpenConfirmPhoneNumber(false);
                setIsOpenInsertCode(true);
            })
            .catch(err => {
                if (err.response.data === "User already verified.") {
                    setMessageResponseDialog("Este usuario ya ha sido verificado.");
                } else if (err.response.data == "Missing phone number") {
                    setMessageResponseDialog("No se ha encontrado el número de teléfono. Añádelo en tu perfil.");
                } else if (err.response.data == "Invalid phone number") {
                    setMessageResponseDialog("El número de teléfono no es válido.");
                } else if (err.response.data == "Unauthorized") {
                    setMessageResponseDialog("Debes iniciar sesión.");
                } else {
                    setMessageResponseDialog("Error al enviar el código. Por favor, inténtalo más tarde. Si el error persiste, contacta con soporte técnico.");
                }

                setIsOpenResponseDialog(true);
            })
    };

    const onAcceptInsertCode = () => {
        axios.put(`${process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:4000'}/api/v1/verify`, { code: code }, { withCredentials: true })
            .then(res => {
                setIsOpenInsertCode(false);
                setMessageResponseDialog("El teléfono ha sido verificado con éxito. Vuelve a iniciar sesión.");
                setIsOpenResponseDialog(true);
            })
            .catch(err => {
                if (err.response.data === "Error when verifying this number. Wrong code.") {
                    setMessageResponseDialog("El código no es correcto. No se ha podido verificar el teléfono, inténtalo de nuevo.");
                } else {
                    setMessageResponseDialog("Error al enviar el código. Por favor, inténtalo más tarde. Si el error persiste, contacta con soporte técnico.");
                }
                
                setMessageResponseDialog(err.response.data);
                setIsOpenResponseDialog(true);
            })

        setIsOpenInsertCode(false);
    };

    return (
        <>
            {/* Dialog to confirm the phone number. */}
            {isOpenConfirmPhoneNumber && (
                <DialogText
                    title="Verificar perfil"
                    textAccept="Continuar"
                    textCancel="Cancelar"
                    width="medium"
                    height="small"
                    onClickAccept={() => { onAcceptConfirmPhoneNumber() }}
                    onClickCancel={() => { setIsOpenConfirmPhoneNumber(false) }}
                    onClickClose={() => { setIsOpenConfirmPhoneNumber(false) }}
                    visibleAcceptButton={!(phoneNumber === undefined || phoneNumber === null || phoneNumber === "")}
                    visibleCancelButton={!(phoneNumber === undefined || phoneNumber === null || phoneNumber === "")}>
                    {
                        (phoneNumber === undefined || phoneNumber === null || phoneNumber === "") ?
                            (<>
                                <Paragraph>No tienes asociado ningún número de teléfono a tu perfil.</Paragraph>
                            </>)
                            : (<>
                                <Paragraph>Se enviará un código de verificación mediante SMS a: <b>{phoneNumber}</b> </Paragraph>
                                <Paragraph>¿Estás de acuerdo? </Paragraph>
                            </>)
                    }

                </DialogText>
            )}
            {/* Dialog to insert the code. */}
            {isOpenInsertCode && (
                <DialogText
                    title="Verificar perfil"
                    textAccept="Continuar"
                    textCancel="Cancelar"
                    width="medium"
                    height="small"
                    onClickAccept={() => { onAcceptInsertCode() }}
                    onClickCancel={() => { setIsOpenInsertCode(false) }}
                    onClickClose={() => { setIsOpenInsertCode(false) }}
                    visibleAcceptButton={true}
                    visibleCancelButton={true}>
                    <div className="pr-4">
                        <FieldTextBox
                            label="Inserta el código de verificación"
                            placeholder="Código de verificación"
                            width="medium"
                            height="small"
                            type="text"
                            name="code"
                            required={true}
                            onChange={event => { setCode(event.target.value) }}
                        />
                    </div>
                </DialogText>
            )}
            {/* Dialog to show at the user the back response. */}
            {isOpenResponseDialog && (
                <DialogText
                    title="Verificar perfil"
                    textAccept="¡De acuerdo!"
                    textCancel="Cancelar"
                    width="medium"
                    height="small"
                    onClickAccept={() => { setIsOpenResponseDialog(false) }}
                    onClickCancel={() => { setIsOpenResponseDialog(false) }}
                    onClickClose={() => { setIsOpenResponseDialog(false) }}
                    visibleAcceptButton={true}
                    visibleCancelButton={false}>
                    <Paragraph>{messageResponseDialog}</Paragraph>
                </DialogText>
            )}
        </>
    );
}