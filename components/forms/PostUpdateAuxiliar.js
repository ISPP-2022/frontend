import { addDays } from 'date-fns';

export default function PostUpdateVerification(startHour, endHour, startAvailability, endAvailability, location, shared, type, space, title, description) {
    let errorsArray = [];


    if (title?.trim().length < 3) {
        console.log(title);
        errorsArray.push('El titulo debe tener al menos 3 caracteres');
    }

    if (description?.trim().length < 3) {
        errorsArray.push('La descripcion debe tener al menos 3 caracteres');
    }

    if (space == '') {
        errorsArray.push('Escoge un tipo de espacio.');
    }

    if (type == '') {
        errorsArray.push('Escoge un tipo de alquiler.');
    }

    if (location == '') {
        errorsArray.push('Escoge una localización válida.');
    }


    if (endAvailability != '' && startAvailability > endAvailability) {
        errorsArray.push('La fecha de inicio de disponibilidad debe ser anterior a la fecha de fin.');
    }

    if (type === 'hours') {
        if (!endHour || !startHour) {
            errorsArray.push('Escoge una hora de inicio y fin.');
        }

        if (endHour === startHour) {
            errorsArray.push('La hora de inicio no puede ser igual a la hora de fin.')
        }

        if (endHour != '' && endHour - startHour < 0) {
            errorsArray.push('La hora de inicio debe ser posterior a la hora de fin.');
        }

        if (endHour != '' && endHour - startHour < 60 * 60 * 1000 && endHour - startHour > 0) {
            errorsArray.push('La diferencia entre la hora de inicio y de fin debe ser de 1 hora mínimo.');
        }
        if (new Date(startHour).getHours() < 6 || new Date(endHour).getHours() > 22) {
            errorsArray.push('Para el alquiler por hora solo se permiten horas entre las 6:00 y las 22:59.');
        }
    }

    const date1 = new Date(startAvailability);
    const today = new Date();
    if (date1 < today) {
        errorsArray.push('La fecha de inicio de disponibilidad debe ser posterior a la fecha actual');
    }

    if (type == 'months' && endAvailability != undefined) {
        const date2 = new Date(endAvailability);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 30) {
            errorsArray.push('Si se indica un alquiler de meses, la disponibilidad debe ser al menos de 30 días.');
        }
    }

    if (shared == undefined) {
        errorsArray.push('Selecciona un valor posible en "Compartido".')
    }

    return errorsArray;
}

export function CreateNewSpaceObject(userId, title, description, startAvailability, endAvailability, location,
    surface1, surface2, shared, type, price, tags, space, images, startHourdate, endHourdate, city, province, country) {
    let newSpace = {};
    newSpace.ownerId = userId;
    newSpace.name = title;
    newSpace.description = description;

    newSpace.initialDate = new Date(startAvailability);
    newSpace.initialDate.setHours(0, 0, 0, 0);

    if (endAvailability) {
        newSpace.finalDate = new Date(endAvailability);
        newSpace.finalDate.setHours(0, 0, 0, 0);
    }

    newSpace.location = location;
    newSpace.city = city;
    newSpace.province = province;
    newSpace.country = country;
    newSpace.dimensions = surface1.toString() + 'x' + surface2.toString();
    newSpace.shared = shared;

    if (type == 'hours') {
        newSpace.priceHour = parseFloat(price);
        newSpace.startHour = new Date(startHourdate);
        newSpace.startHour = addDays(newSpace.startHour, 1);
        newSpace.startHour.setSeconds(0);
        newSpace.startHour.setMilliseconds(0);
        newSpace.startHour = newSpace.startHour.getTime();

        newSpace.endHour = new Date(endHourdate);
        newSpace.endHour = addDays(newSpace.endHour, 1);
        newSpace.endHour.setSeconds(0);
        newSpace.endHour.setMilliseconds(0);
        newSpace.endHour = newSpace.endHour.getTime();

    } else if (type == 'days') {
        newSpace.priceDay = parseFloat(price);
    } else if (type == 'months') {
        newSpace.priceMonth = parseFloat(price);
    }

    // Añade el tipo de espacio a los tags
    let tagsArray = tags;
    if (!(space in tags)) {
        tagsArray.push(space);
    }
    newSpace.tags = tagsArray;

    newSpace.images = images;
    return newSpace;
}


