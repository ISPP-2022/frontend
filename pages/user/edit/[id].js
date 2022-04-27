import axios from "axios";
import { useState } from "react";
import { Button } from "../../../components/Core/Button";
import jwt from 'jsonwebtoken';
import { LegalName, Sex, IdCard, PhoneNumber, Avatar } from "../../../components/forms/UserUpdateForm";
import { useRouter } from "next/router";


// Page to edit user info stored in db such as name, surname, email, etc.

export async function getServerSideProps(context) {
    let userSession;
    try {
        userSession = context.req.cookies.authToken ? jwt.decode(context.req.cookies.authToken) : null;
    } catch (error) {
        console.log(error);
        userSession = null;
    }

    const { id } = context.params;

    const user = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}`)
        .then(res => res.data).catch(() => null);

    return {
        props: {
            userData: user,
            userSession: userSession
        },
    };
};

const checkIdCard = (idCard) => {
    const dniChars = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

    if (!idCard.match(/^\d{8}[A-Z]$/)) {
        return false;
    } else {
        const rest = parseInt(idCard.slice(0, 8)) % 23;
        if (idCard[8] !== dniChars[rest]) {
            return false;
        }
    }
    return true;
};

export default function UserEdit({ userData, userSession }) {

    if (userSession?.userId !== userData?.id && userSession?.role !== 'ADMIN') {
        return (
            <div className="h-full flex justify-center items-center">
                <h1 className="text-6xl font-bold text-gray-500 text-center">Usuario no encontrado</h1>
            </div>
        );
    }

    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [userDataForm, setUserData] = useState(userData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, name, surname, sex, phoneNumber, idCard } = userDataForm;
        let { avatar } = userDataForm;
        let errorsTemp = {};
        let validations = []

        if (!name || name.match(/^ *$/) !== null) {
            errorsTemp = { ...errorsTemp, name: 'Debe insertar un nombre' };
            validations.push(false);
        }

        if (!surname || surname.match(/^ *$/) !== null) {
            errorsTemp = { ...errorsTemp, surname: `Debe insertar un apellido` };
            validations.push(false);
        }

        if (sex && (sex !== 'MALE' && sex !== 'FEMALE' && sex !== 'OTHER')) {
            errorsTemp = { ...errorsTemp, sex: `El género debe ser Hombre, Mujer u Otro` };
            validations.push(false);
        }

        if (phoneNumber && phoneNumber.match(/^\+?([0-9]{2})\d{9}$/) === null) {
            errorsTemp = { ...errorsTemp, phoneNumber: `El número de teléfono debe seguir el formato +34XXXXXXXXX` }
            validations.push(false);
        }

        if (idCard && !checkIdCard(idCard)) {
            errorsTemp = { ...errorsTemp, idCard: `El DNI debe seguir el formato XXXXXXXXA o es invalido` }
            validations.push(false);
        }

        if (!avatar) {
            await axios.get(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}/avatar`)
                .then(res => avatar = res.data.image)
                .catch(() => avatar = null);
        }


        if (validations.length === 0) {
            await axios.put(`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}`, {
                name: name,
                surname: surname,
                sex: sex,
                phoneNumber: phoneNumber,
                idCard: idCard,
                avatar: avatar,
            }, {
                withCredentials: true,
            }).then(() => {
                router.push(`/user/${id}`);
            })
                .catch(err => {
                    if (err.response.status === 400)
                        if (err.response.data === 'Bad Request: Missing required attributes: name, surname or phone number') {
                            alert('Error: Ingrese todos los atributos requeridos.');
                        } else if (err.response.data === 'Bad Request: Name must contain at least 3 characters') {
                            alert('Error: El nombre debe contener al menos 3 caracteres.')
                        } else if (err.response.data === 'Bad Request: Surname must contain at least 3 characters') {
                            alert('Error: El apellido debe contener al menos 3 caracteres.')
                        } else if (err.response.data === 'Bad Request: Invalid date format') {
                            alert('Error: Formato de fecha inválida.')
                        } else if (err.response.data === 'Bad Request: Birthday date cannot be after today') {
                            alert('Error: La fecha de nacimiento no puede ser posterior a la fecha actual.')
                        } else if (err.response.data === 'Bad Request: Invalid sex, must be MALE, FEMALE or OTHER') {
                            alert('Error: El sexo debe ser HOMBRE, MUJER u OTRO.')
                        } else if (err.response.data === 'Bad Request: Invalid ID card format') {
                            alert('Error: El formato de DNI no es válido.');
                        } else if (err.response.data === 'Bad Request: Invalid phone number, must be +34XXXXXXXXX') {
                            alert('Error: El número de teléfono no es válido, debe tener el formato +34XXXXXXXXX');
                        } else if (err.response.data === 'Bad Request: Avatar must be jpeg or png') {
                            alert('Error: El avatar debe ser un archivo JPEG o PNG.')
                        } else {
                            alert(err.response.data);
                        }
                    else
                        alert("Error al editar los datos");
                });
        } else {
            setErrors(errorsTemp);
        }



    }

    return (
        <div className="md:bg-gray-100 flex justify-center items-center">
            <main id='main' className="md:bg-white p-5 pl-10 pr-10 md:w-4/5 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-8 md:mb-8 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-500 text-center">Información personal</h2>
                <form onSubmit={handleSubmit}>
                    <LegalName userData={userDataForm} setUserData={setUserData} error={errors.name ?? ''} />
                    <Sex userData={userDataForm} setUserData={setUserData} error={errors.sex ?? ''} />
                    <IdCard userData={userDataForm} setUserData={setUserData} error={errors.idCard ?? ''} />
                    <PhoneNumber userData={userDataForm} setUserData={setUserData} error={errors.phoneNumber ?? ''} />
                    <Avatar userData={userDataForm} setUserData={setUserData} error={errors.avatar ?? ''} />

                    <div className="flex justify-center mt-4">
                        <Button
                            className="px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2"
                            color="secondary"
                            type="submit">
                            <div className="flex items-center justify-center">
                                <p className="ml-2"> Editar</p>
                            </div>
                        </Button>
                    </div>
                </form>
                <hr className="my-4" />
            </main >
        </div >
    );
};