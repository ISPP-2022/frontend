import { useState } from "react";
import { DialogText } from "../Core/Dialog";
import { FieldTextBox } from "../Core/Form";
import { Paragraph } from "../Core/Text";

export const VerifyProfile = ({ phoneNumber }) => {
    const [isOpenConfirmPhoneNumber, setIsOpenConfirmPhoneNumber] = useState(true);
    const [isOpenInsertCode, setIsOpenInsertCode] = useState(false);
    const [code, setCode] = useState("");

    const onAcceptConfirmPhoneNumber = () => {
        setIsOpenConfirmPhoneNumber(false);
        setIsOpenInsertCode(true);
    };

    const onAcceptInsertCode = (event) => {
        // TODO: Send code to server
        console.log(code);
        setIsOpenInsertCode(false);
    };
    
    return (
        <>
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


        </>
    );
}