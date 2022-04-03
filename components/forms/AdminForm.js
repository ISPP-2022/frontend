import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/router';

/**
 * Crea un formulario. Pensado para la vista de administración en la que se va a poder observar y editar datos de un elemento.
 *
 * @param {object} data Datos del elemento para cargar su formulario (debe estar vacio si es uno nuevo).
 * @param {object} mainTable Datos del elemento para cargar su formulario (debe estar vacio si es uno nuevo).
 * @param {object} labelAttr Objeto con label como clave y nombre del atributo como valor para ver si se muestra o no.
 * @param {string} updateLink Link para actualizar un item.
 * @param {boolean} nuevo Link para actualizar un item.
 */
 export const AdminForm = ({
    data,
    labelAttr,
    updateLink,
    nuevo,
    mainTable
  }) => {
    function actualizarNuevo(event){
      event.preventDefault();
     
      if(nuevo){
        let newObject = {};
        Object.entries(labelAttr).forEach((element) => {
          let label = document.getElementById(element[1]["attr"]);
  
          if(label.type == "checkbox"){
            newObject[element[1]["attr"]] = label.checked;
          }else if(label.type == "time"){
            newObject[element[1]["attr"]] = (new Date()).setHours(label.value.split(':')[0], label.value.split(':')[1]);
          }
          else if(label.type == "date"){
            newObject[element[1]["attr"]] = new Date(label.value);
          }
          else{
            newObject[element[1]["attr"]] = label.value;
          }
          
        })
        console.log(newObject);
        console.log(updateLink);
        axios.post(updateLink, newObject, {
                    withCredentials: true,
                }).then(res => {
                    location.reload();
              }).catch(function (error) {
                  if (error.response) {
                    // Request made and server responded
                    setVerErrores(true);
                    setErrores(error.response.data.split(": ")[1]);
                  }
                });
      }else{
        let newObject = {};
        Object.entries(labelAttr).forEach((element) => {
          let label = document.getElementById(element[1]["attr"]);
          if(label.type == "checkbox"){
            newObject[element[1]["attr"]] == label.checked;
          }else{
          newObject[element[1]["attr"]] = label.value;
          }
        })
        console.log(updateLink);
        axios.put(updateLink, newObject, {
                    withCredentials: true,
                }).then(res => {
                    location.reload();
              }).catch(function (error) {
                  if (error.response) {
                    // Request made and server responded
                    setVerErrores(true);
                    setErrores(error.response.data.split(": ")[1]);
                  }
                });
      }
    }
      const [verErrores, setVerErrores] = useState(false);
      const [errores, setErrores] = useState();

      return (
          <div>
              <form className="w-full max-w-lg" onSubmit={actualizarNuevo} method="put">
                <header className="p-8 mb-5 flex justify-center items-center ">
                  <h1 className=" text-2xl md:text-3xl  text-center font-bold text-[#4aa7c0] ">Admin Form</h1>
                </header>
                {verErrores && <h3>{errores}</h3>}
                
                {label(labelAttr,data,nuevo)}
              </form>
              <button type="submit" onClick={actualizarNuevo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Update
              </button>
          </div>
      )
  };

  /**
 * Crea un label con su input
 *
 * @param {object} labelAttr Objeto con label como clave y nombre del atributo como valor para ver si se muestra o no.
 * @param {object} data Datos del elemento para cargar su formulario (debe estar vacio si es uno nuevo).
 */
function label(labelAttr,data,nuevo) {
  const res = [];
  Object.entries(labelAttr).forEach((element) => {
    res.push(
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-[#4aa7c0] text-xs font-bold mb-2">
        {element[0]}
      </label>
      {isSelect(element,data,nuevo)}
    </div>
    );
  });
  return (
    <div className="flex flex-wrap -mx-3 mb-6"> 
          {res}
    </div>
  );
}


function isSelect(text, text1,nuevo){
  if(nuevo){
    if (text[1]["type"] == "select")
      return(
      <select id={text[1]["attr"]} >
        {recSelect(text)}
      </select>
      );
    else if(text[1]["type"] == "date"){
        return(
          <input id={text[1]["attr"]} type={text[1]["type"]} ></input>
        )
    }
    else if(text[1]["type"] == "tags"){
      return(
      <select name={text[1]["attr"]} id={text[1]["attr"]} multiple>
        {recMultipleSelect(text)}
      </select>)
    }
    else{
        return(
          <input id={text[1]["attr"]} type={text[1]["type"]} ></input>
        );
    }
  }else{
    if (text[1]["type"] == "select")
      return(
      <select id={text[1]["attr"]} defaultValue={text1[text[1]["attr"]]}>
        {recSelect(text)}
      </select>
      );
    else if(text[1]["type"] == "date"){
        var date = text1[text[1]["attr"]].split("T")[0];
        return(
          <input id={text[1]["attr"]} type={text[1]["type"]} defaultValue={date}></input>
        )
    }
    else if(text[1]["type"] == "tags"){
      return(
        <select id={text[1]["attr"]} defaultValue={text1[text[1]["attr"]]} multiple>
          {recMultipleSelect(text)}
        </select>
        )
    }
    else{
        return(
          <input id={text[1]["attr"]} type={text[1]["type"]} defaultValue={text1[text[1]["attr"]]}></input>
        );
    }
  }
}

function recMultipleSelect(text){
  const options = [];
  Object.entries(text[1]["options"]).forEach((obj) => {
    options.push(
    <option value={obj[1].value}>{obj[1].label}</option>
    );
  });
  return options;
}

function recSelect(text){
  const options = [];
  Object.entries(text[1]["options"]).forEach((obj) => {
    options.push(
    <option value={obj[1]}>{obj[1]}</option>
    );
  });
  return options;
}

  
  