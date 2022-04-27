import { FieldTextBox, FieldSelectorBox } from '../../components/Core/Form';

export function LegalName({ userData, setUserData, error }) {
    return (
        <>
            <FieldTextBox
                label="Nombre"
                name="name"
                value={userData.name}
                onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                }}
                required="true"
            />
            <span className='text-gray-600 text-xs'> {error.name} </span>

            <span className='text-gray-600'> {error} </span>
            <FieldTextBox
                label="Apellido"
                name="surname"
                value={userData.surname}
                onChange={(e) => {
                    setUserData({ ...userData, surname: e.target.value });
                }}
                required="true"
            />
        </>
    )
};

export function Sex({ userData, setUserData, error }) {
    const options = [
        {
            label: 'Hombre',
            value: 'MALE',
        },
        {
            label: 'Mujer',
            value: 'FEMALE',
        },
        {
            label: 'Otro',
            value: 'OTHER',
        },
    ];



    return (
        <>
            <FieldSelectorBox
                label="Sexo"
                options={options}
                value={userData.sex}
                onChange={(e) => {
                    setUserData({ ...userData, sex: e.target.value });
                }}
                required="true"
            />

            <span className='text-gray-600'> {error} </span>
        </>

    )
};

export function IdCard({ userData, setUserData, error }) {
    return (

        <div className="w-full">
            <label className="pl-2 font-medium" htmlFor='idCard'>Identificación</label>
            <input type="text" name="idCard" id="idCard" value={userData.idCard}
                onChange={(e) => setUserData({ ...userData, idCard: e.target.value })}
                placeholder="00000000A"
                className="mx-2 my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi"
            >
            </input>
            <span className='text-gray-600'> {error} </span>
        </div>

    )
};

export function PhoneNumber({ userData, setUserData, error }) {
    return (

        <div className="w-full">
            <label className="pl-2 font-medium" htmlFor='phoneNumber'>Teléfono</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={userData.phoneNumber}
                onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                placeholder="+34XXXXXXXXX"
                className="mx-2 my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi"
            >
            </input>
            <span className='text-gray-600'> {error} </span>
        </div>

    )
}

export function Avatar({ userData, setUserData, error }) {
    // Convierte los archivos a base64 y los guarda en images
    async function handleFile(e) {
        let file = e.target.files[0];
        const maxAllowedSize = 50 * 1024 * 1024;
        let size = file.size;
        if (size < maxAllowedSize) {
            if (file.type.includes('image')) {
                var imageBase64 = await readFileAsDataURL(file);
                setUserData({ ...userData, avatar: imageBase64.split(',')[1] });
            } else {
                alert('El archivo no es una imagen');
                e.target.value = "";
            }
        }
        else {
            alert('El tamaño máximo de los archivos superan el maximo permitido');
            e.target.value = "";
        }
    }

    async function readFileAsDataURL(file) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
        return result_base64;
    }

    return (
        <div className="w-full my-2">
            <label className="pl-2 font-medium mr-4" htmlFor='img'>Avatar</label>
            <input className='pt-0' onChange={(e) => handleFile(e)} type="file" id="img" name="img" accept="image/png,image/jpeg" />
        </div>
    )
}