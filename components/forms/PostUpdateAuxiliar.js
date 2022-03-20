export default function PostUpdateVerification(startHour, endHour, startAvailability, endAvailability, location, shared, type, space) {
    let errorsArray = [];
    if (space == '') {
        errorsArray.push('Escoge un tipo de espacio.');
    }

    if (type == '') {
        errorsArray.push('Escoge un tipo de alquiler.');
    }

    if (type=='hours') {
        if (startHour=='' || endHour=='') {
            errorsArray.push('Selecciona un tramo horario.');
        } else if (endAvailability=='') {
            errorsArray.push('Selecciona una fecha de fin de disponibilidad.');
        } else if (startHour<endHour) {
            let SHOnlyHour = startHour.split(':')[0];
            let EHOnlyHour = endHour.split(':')[0];
            if ((EHOnlyHour-SHOnlyHour)<1) {
                errorsArray.push('La diferencia entre la hora de inicio y la hora de fin debe ser de al menos una hora.');
            }
        } else if (startHour==endHour) {
            errorsArray.push('La diferencia entre la hora de inicio y la hora de fin debe ser de al menos una hora.');
        } else if (startHour>endHour) {
            errorsArray.push('La hora de inicio debe ser anterior a la hora de fin.');
        }
    }

    if (location == '') {
        errorsArray.push('Escoge una localización válida.');
    }

    if (endAvailability != '' && startAvailability>endAvailability) {
        errorsArray.push('La fecha de inicio de disponibilidad debe ser anterior a la fecha de fin.');
    }

    
    const date1 = new Date(startAvailability);
    const today = new Date();
    if (date1<today) {
        errorsArray.push('La fecha de inicio de disponibilidad debe ser posterior a la fecha actual');
    }

    if (type=='months' && endAvailability != undefined) {
        const date2 = new Date(endAvailability);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if (diffDays<30) {
            errorsArray.push('Si se indica un alquiler de meses, la disponibilidad debe ser al menos de 30 días.');
        }
    }

    if (shared==undefined) {
        errorsArray.push('Selecciona un valor posible en "Compartido".')
    }
    
    return errorsArray;
}

export function CreateNewSpaceObject(userId, title, description, startAvailability, endAvailability, startHour, endHour, location,
    surface1, surface2, shared, type, price, tags, space, images) {
    let newSpace = {};
    newSpace.ownerId = userId;
    newSpace.name = title;
    newSpace.description = description;

    if (type=='hours') {
        let initialDate = new Date(startAvailability);
        let startHourSplitted = startHour.split(':')
        initialDate.setHours(startHourSplitted[0], startHourSplitted[1]);
        newSpace.initialDate = initialDate;
    } else {
        newSpace.initialDate = new Date(startAvailability);
    }

    if (endAvailability!=undefined) {
        if (type=='hours') {
            let finalDate = new Date(endAvailability);
            let endHourSplitted = endHour.split(':')
            finalDate.setHours(endHourSplitted[0], endHourSplitted[1]);
            newSpace.finalDate = finalDate;
        } else {
            newSpace.finalDate = new Date(endAvailability);
        }
    }
    newSpace.location = location;
    newSpace.dimensions = surface1.toString() + 'x' + surface2.toString();
    newSpace.shared = shared;
    
    if (type=='hours') {
        newSpace.priceHour = parseFloat(price);
    } else if (type=='days') {
        newSpace.priceDay = parseFloat(price);
    } else if (type=='months'){
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


