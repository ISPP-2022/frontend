import axios from "axios";
import { useState } from "react";
import { Button } from "../../../components/Core/Button";
import jwt from 'jsonwebtoken';
import { LegalName, Sex, IdCard, PhoneNumber, Avatar } from "../../../components/forms/UserUpdateForm";
import { useRouter } from "next/router";
import { DialogText } from "../../../components/Core/Dialog";
import Image from "next/image";


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
    const [showModal, setShowModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [newpass, setNewPass] = useState('');
    const [showNewPass, setShowNewPass] = useState(false);
    const [passConfirm, setPassConfirm] = useState('');
    const [showPassConfirm, setShowPassConfirm] = useState(false);
    const [passError, setPassError] = useState({});

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

        if (phoneNumber && phoneNumber.match(/^[+]{1}34[67]{1}[0-9]{8}$/) === null) {
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
    const handlerChangePass = async (e) => {
        e.preventDefault()
        let valid = validatePassChange();
        if (valid) {
            axios.put(`${process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:4000'}/api/v1/changePassword`, { oldPassword, newPassword: newpass }, { withCredentials: true })
                .then(res => {
                    alert('Contraseña cambiada con éxito.');
                    setShowNewPass(false);
                    setShowOldPassword(false);
                    setShowPassConfirm(false);
                    setOldPassword('');
                    setNewPass('');
                    setPassConfirm('');
                    setPassError({});
                    setShowModal(false);
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        if (err.response.data === 'Missing password') {
                            setPassError({
                                response: 'Debes completar todos los campos'
                            })
                        }
                        if (err.response.data === 'Wrong old password') {
                            setPassError({
                                oldPassword: 'La contraseña actual es incorrecta'
                            })
                        }
                        if (err.response.data === 'New password must be different from the old one') {
                            setPassError({
                                newpass: 'La nueva contraseña debe ser diferente a la actual'
                            })
                        }
                        if (err.response.data === 'Password must contain at least one number, one lowercase and one uppercase letter, and at least 8 characters long') {
                            setPassError({
                                newpass: 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número'
                            })
                        }
                    }
                    else
                        setErrors({
                            response: 'Ha ocurrido un error, revise los campos e intentalo de nuevo'
                        })
                })
        }
    }

    const validatePassChange = () => {
        let errorsTemp = {};
        let valid = true;

        if (!oldPassword) {
            errorsTemp.oldPassword = 'La contraseña actual es requerida';
            valid = false
        }

        if (!newpass) {
            errorsTemp.newpass = 'La contraseña es requerida'
            valid = false
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newpass)) {
            errorsTemp.newpass = 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número'
            valid = false
        }
        if (!passConfirm) {
            errorsTemp.passConfirm = 'La confirmación de la contraseña es requerida'
            valid = false
        } else if (newpass !== passConfirm) {
            errorsTemp.passConfirm = 'Las contraseñas no coinciden'
            valid = false
        }
        setPassError(errorsTemp);
        console.log(errorsTemp)
        return valid
    }

    return (
        <div className="md:bg-gray-100 flex justify-center items-center">
            <main id='main' className="md:bg-white py-5 md:w-4/5 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-8 md:mb-8 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg flex flex-col md:flex-row">
                <div className="basis-2/3 p-10">
                    <h2 className="text-2xl font-bold text-gray-500 text-center">Información personal</h2>
                    <form className="pr-3" onSubmit={handleSubmit}>
                        <LegalName userData={userDataForm} setUserData={setUserData} error={errors.name ?? ''} />
                        <Sex userData={userDataForm} setUserData={setUserData} error={errors.sex ?? ''} />
                        <IdCard userData={userDataForm} setUserData={setUserData} error={errors.idCard ?? ''} />
                        <PhoneNumber userData={userDataForm} setUserData={setUserData} error={errors.phoneNumber ?? ''} />
                        <Avatar userData={userDataForm} setUserData={setUserData} error={errors.avatar ?? ''} />


                        <hr className="my-4" />
                        <div className="flex justify-center mt-4">
                            <Button
                                className="px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2"
                                color="secondary"
                                onClick={() => {
                                    router.push(`/user/${userSession.userId}`)
                                }}
                            >
                                <div className="flex items-center justify-center">
                                    <p>Cancelar</p>
                                </div>
                            </Button>
                            <Button
                                className="px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2"
                                color="secondary"
                                type="submit">
                                <div className="flex items-center justify-center">
                                    <p>Editar</p>
                                </div>
                            </Button>
                        </div>
                    </form>
                </div>
                <hr className="my-4 block md:hidden" />

                <div className="basis-1/3 grid grid-cols-[1px_1fr]">

                    <div className=" w-1 border-r">

                    </div>
                    <div className="flex align-middle justify-center mt-4">
                        <Button
                            className="px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2"
                            color="secondary"
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            <div className="flex items-center justify-center">
                                <p>Cambiar contraseña</p>
                            </div>
                        </Button>
                    </div>
                </div>
            </main >
            {
                showModal &&
                <div className="fixed inset-0 z-10">
                    <div onClick={() => {
                        setShowNewPass(false);
                        setShowOldPassword(false);
                        setShowPassConfirm(false);
                        setOldPassword('');
                        setNewPass('');
                        setPassConfirm('');
                        setPassError({});
                        setShowModal(false);
                    }} className="absolute inset-0 bg-gray-900 opacity-50 min-h-[850px]" />
                    <div className="fixed block top-1/2 left-1/2 w-full h-full md:w-[30rem] md:h-2/3 min-h-[550px] bg-white -translate-x-1/2 -translate-y-1/2 rounded">
                        <header className="flex justify-end items-center md:hidden ">
                            <svg onClick={() => {
                                setShowNewPass(false);
                                setShowOldPassword(false);
                                setShowPassConfirm(false);
                                setOldPassword('');
                                setNewPass('');
                                setPassConfirm('');
                                setPassError({});
                                setShowModal(false);
                            }} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 m-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#4aa7c0" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </header>
                        <main className="flex flex-col justify-center md:h-full items-center space-y-[2vh] py-8">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-2xl font-bold text-[#4aa7c0]">Cambio de contraseña</h1>

                            </div>
                            <div className="flex flex-col justify-center items-center w-full">
                                <form className=" w-2/3 md:w-full px-6 md:px-10 space-y-[2vh]">
                                    <div className="relative">
                                        <input
                                            type={showOldPassword ? 'text' : 'password'}
                                            placeholder="Contraseña anterior"
                                            className={`bg-white rounded border border-gray-400 px-4 py-2 focus:outline-none w-full focus:border-gray-500 ${passError.oldPassword || passError.response ? 'border-red-500 placeholder:text-red-500' : ''} `}
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <div class="absolute inset-y-0 right-0 flex items-center px-2">
                                            <input class="hidden js-password-toggle" id="toggleOld" type="checkbox" value={showOldPassword} onChange={(e) => setShowOldPassword(e.target.checked)} />
                                            <label class=" hover:bg-gray-400 rounded p-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggleOld">
                                                {
                                                    showOldPassword ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <span
                                        className={`border-red-500 text-red-500`}>
                                        {passError.oldPassword}
                                    </span>
                                    <div className="relative">
                                        <input
                                            type={showNewPass ? 'text' : 'password'}
                                            placeholder="Nueva Contraseña"
                                            className={`bg-white rounded border border-gray-400 px-4 py-2 focus:outline-none w-full focus:border-gray-500 ${passError.newpass || passError.response ? 'border-red-500 placeholder:text-red-500' : ''} `}
                                            value={newpass}
                                            onChange={(e) => setNewPass(e.target.value)}
                                        />
                                        <div class="absolute inset-y-0 right-0 flex items-center px-2">
                                            <input class="hidden js-password-toggle" id="toggle" type="checkbox" value={showNewPass} onChange={(e) => setShowNewPass(e.target.checked)} />
                                            <label class=" hover:bg-gray-400 rounded p-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle">
                                                {
                                                    showNewPass ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <span
                                        className={`border-red-500 text-red-500`}>
                                        {passError.newpass}
                                    </span>
                                    <div className="relative">
                                        <input
                                            type={showPassConfirm ? 'text' : 'password'}
                                            placeholder="Confirmar Contraseña"
                                            className={`bg-white rounded border border-gray-400 px-4 py-2 focus:outline-none w-full focus:border-gray-500 ${passError.passConfirm || passError.response ? 'border-red-500 placeholder:text-red-500' : ''} `}
                                            value={passConfirm}
                                            onChange={(e) => setPassConfirm(e.target.value)}
                                        />
                                        <div class="absolute inset-y-0 right-0 flex items-center px-2">
                                            <input class="hidden js-password-toggle" id="toggleCon" type="checkbox" value={showPassConfirm} onChange={(e) => setShowPassConfirm(e.target.checked)} />
                                            <label class=" hover:bg-gray-400 rounded p-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggleCon">
                                                {
                                                    showPassConfirm ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <span
                                        className={`border-red-500 text-red-500`}>
                                        {passError.passConfirm}
                                        <br />
                                    </span>
                                    <span
                                        className={passError.response ? `border-red-500 text-red-500` : `text-gray-600`}>
                                        {passError.response ? passError.response : '*La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número'}
                                    </span>
                                    <div className="flex justify-center">
                                        <button onClick={handlerChangePass} className="bg-[#4aa7c0] rounded text-white py-2 px-7 hover:bg-[#34778a]">
                                            Confirmar
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </main>
                        <div className="shrink-0 flex md:hidden justify-center my-16">
                            <Image src="/logolargo.png" alt="StackingUp Logo" width={200} height={70} layout="intrinsic" />
                        </div>
                    </div>
                </div>
            }
        </div >
    );
};