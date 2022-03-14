import React from 'react'
import axios, { Axios } from 'axios';


function PostTreatment(title, description, startAvailability, endAvailability, location, surface1, surface2, shared, type, price, tags, space, images) {
    let newSpace = {};
    newSpace.name = title;
    newSpace.description = description;
    newSpace.initialDate = new Date(startAvailability);
    if (endAvailability!=undefined) {
        newSpace.finalDate = new Date(endAvailability);
    }
    newSpace.location = location;
    newSpace.dimensions = surface1.toString() + 'x' + surface2.toString();
    newSpace.shared = shared;
    newSpace.ownerId = 2;
    
    if (type=='hours') {
        newSpace.priceHour = parseFloat(price);
    } else if (type=='days') {
        newSpace.priceDay = parseFloat(price);
    } else if (type=='months'){
        newSpace.priceMonth = parseFloat(price);
    }

    // Añade el tipo de espacio a los tags
    let tagsArray = tags;
    tagsArray.push(space);
    newSpace.tags = tagsArray;

    newSpace.images = images;
    
    axios.post(`http://localhost:4100/api/v1/spaces`, newSpace, {
        withCredentials: true,
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
    }).catch(err => {
        console.log(err.message);
    });
}


export default PostTreatment