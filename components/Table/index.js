import axios from "axios";
import { useState } from "react";
import { DialogText } from "../Core/Dialog";
/**
 * Crea una tabla. Pensado para la vista de administración en la que se van a mostrar, buscar y editar datos.
 *
 * @param {list} data Datos que se van a mostrar en la tabla.
 * @param {string} idAttr El nombre del atributo identificador.
 * @param {object} labelAttr Objeto con label como clave y nombre del atributo. Sirve para especificar si se muestra o no.
 * @param {string} editLink Link para editar un item, se remplazara "${id}" por el valor del atributo especificado en 'idAttr'. Si no está no se muestra el botón de editar.
 * @param {string} createLink Link para crear un item. Si no está no se muestra el botón de añadir.
 * @param {string} deleteLink Link para borrar un item, se remplazara "${id}" por el valor del atributo especificado en 'idAttr'. Si no está no se muestra el botón de borrar.
 * @param {list} attrSummary Lista con los atributos que resumen el objeto, se mostrarán como aviso antes de borrar.
 */
export const Table = ({
  data,
  idAttr,
  labelAttr,
  editLink = "",
  createLink = "",
  deleteLink = "",
  attrSummary,
  className,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showNoItemsDialog, setShowNoItemsDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  /**
   * Guarda en 'selectedItems' el id del objeto para luego poder borrarlo.
   *
   * @param {*} element
   * @param {number} id
   */
  function addRemoveItem(element, id) {
    if (element.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      var index = selectedItems.indexOf(id);
      selectedItems.splice(index, 1);
    }
  }

  function confirmDelete() {
    if (selectedItems.length === 0) {
      setShowNoItemsDialog(true);
    } else {
      setShowDialog(true);
    }
  }

  /**
   * Realiza la petición de borrado a la api.
   */
  function deleteElements() {
    setShowDialog(false);
    selectedItems.forEach(async (value) => {
      var parsedLink = deleteLink.replace("${id}", value);
      try {
        await axios.delete(parsedLink);
      } catch (error) {
        console.error();
      }
    });
    location.reload();
  }

  /**
   * Devuelve el icono de añadir
   * @param {string} createLink
   * @returns
   */
  function addIcon(createLink) {
    var addLayout =
      "h-12 w-8 mb-1 text-center flex items-center shadow-lg cursor-pointer";
    return createLink === "" ? (
      <div className={addLayout.replace(" shadow-lg cursor-pointer", "")}></div>
    ) : (
      <a
        className={addLayout}
        style={{ backgroundColor: "#69F0AE" }}
        href={createLink}
      >
        <div className="w-4" style={{ margin: "auto" }}>
          <svg className="fill-white" viewBox="0 0 24 24">
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
        </div>
      </a>
    );
  }

  /**
   * Devuelve el icono de editar.
   * @param {string} editLink
   * @returns
   */
  function editIcon(editLink) {
    var editLayout = "h-12 w-8 mb-1 ml-4 text-center flex items-center";
    return editLink === "" ? (
      <div></div>
    ) : (
      <a
        className={editLayout}
        style={{ backgroundColor: "#69F0AE" }}
        href={editLink}
      >
        <div className="w-4" style={{ margin: "auto" }}>
          <svg className="fill-white" viewBox="0 0 528.899 528.899">
            <g>
              <path
                d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
  c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
  C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
  L27.473,390.597L0.3,512.69z"
              />
            </g>
          </svg>
        </div>
      </a>
    );
  }

  /**
   * Devuelve el icono de borrar.
   * @returns
   */
  function deleteIcon() {
    var deleteLayout =
      "h-12 w-8 mb-0 ml-3 text-center flex items-center shadow-lg cursor-pointer";
    return deleteLink === "" ? (
      <div></div>
    ) : (
      <a
        className={deleteLayout}
        style={{ backgroundColor: "#EF5350" }}
        onClick={confirmDelete}
      >
        <div className="w-4" style={{ margin: "auto" }}>
          <svg className="fill-white" viewBox="0 0 24 24">
            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
          </svg>
        </div>
      </a>
    );
  }

  /**
   * Crea la cabecera de la tabla
   *
   * @param {object} labelAttr Objeto con label como clave y nombre del atributo como valor para ver si se muestra o no.
   * @param {string} createLink Link para crear un item.
   */
  function header(labelAttr, createLink) {
    const header = [];
    var layout =
      "bg-blue-bondi/[0.6] h-12 w-44 mb-0 text-center flex items-center justify-center shadow-lg";

    Object.keys(labelAttr).forEach((value, index) => {
      header.push(
        <div>
          <h2 className={layout}>{value}</h2>
        </div>
      );
      // Si está en móvil solo se muestra la primera columna
      if (index === 0) {
        layout += " hidden md:flex";
      }
    });
    return (
      <div className="flex ml-1.5 mb-0">
        {addIcon(createLink)}
        <div className="divide-x flex pb-1">{header}</div>
        {deleteIcon()}
      </div>
    );
  }

  /**
   * Crea una fila de la tabla.
   *
   * @param {number} rowId Identifica la fila.
   * @param {object} element Elemento de 'data'.
   * @param {object} labelAttr Objeto con label como clave y nombre del atributo como valor para ver si se muestra o no.
   * @param {string} editLink Link para acceder un item, se remplazara "{id}" por el valor del atributo especificado en 'idAttr'.
   * @param {string} idAttr El atributo identificador.
   */
  function row(rowId, element, labelAttr, editLink, idAttr) {
    var elementId = element[idAttr];
    var parsedLink = editLink.replace("${id}", elementId);

    const row = [];
    var bgColor = rowId % 2 === 0 ? "bg-gray-200" : "bg-gray-100";
    var layout =
      bgColor + " h-12 w-44 mb-1 text-center flex items-center justify-center";

    Object.entries(labelAttr).forEach((value, index) => {
      var attrName = value[1];
      row.push(
        <div className={layout}>
          <p>{element[attrName]}</p>
        </div>
      );
      // Si está en móvil solo se muestra la primera columna
      if (index === 0) {
        layout += " hidden md:flex";
      }
    });
    var inputLayout =
      "border-gray-500 focus:ring-transparent focus:ring-offset-0 checked:bg-blue-bondi-dark ";
    var inputDivLayout = layout
      .replace("w-44", "w-8")
      .replace(" hidden md:flex", "");
    return (
      <div className="flex ml-1">
        {placeRowData(inputDivLayout, inputLayout, rowId, row)}
        {editIcon(parsedLink)}
      </div>
    );
  }

  /**
   * Añade los datos a la fila dependiendo de si es seleccionable o no.
   * @param {string} inputDivLayout
   * @param {string} inputLayout
   * @param {string} rowId
   * @param {*} row
   * @returns
   */
  function placeRowData(inputDivLayout, inputLayout, rowId, row) {
    return deleteLink === "" ? (
      <div className="flex divide-x ml-8">{row}</div>
    ) : (
      <div className="flex divide-x  hover:cursor-pointer">
        <div
          className={inputDivLayout}
          onClick={() => {
            checkRow(rowId);
          }}
        >
          <input
            id={"check-" + rowId}
            className={inputLayout}
            type="checkbox"
            style={{ outline: "none" }}
          />
        </div>
        <div
          className="flex divide-x"
          onClick={() => {
            checkRow(rowId);
          }}
        >
          {row}
        </div>
      </div>
    );
  }

  /**
   * Activa o desactiva la selección de la fila y lo guarda en un array
   * @param {number} rowId
   */
  function checkRow(rowId) {
    const baseId = "check-";
    var id = baseId + rowId;
    if (typeof window !== "undefined") {
      var checkbox = document.getElementById(id);
      checkbox.checked = !checkbox.checked;
      addRemoveItem(checkbox, rowId);
    }
  }

  /**
   * Obtiene el mensaje que se mostrará en el modal para confirmar el borrado.
   *
   * @returns
   */
  function getSummary() {
    const elementsToDelete = data.filter((value) => {
      return selectedItems.includes(value[idAttr]);
    });
    const res = [];
    var summary = "";
    elementsToDelete.forEach((element) => {
      attrSummary.forEach((summAttr) => {
        summary += element[summAttr] + ", ";
      });
      summary = summary.substring(0, summary.length - 2);
      res.push(
        <div>
          {summary}
          <br></br>
        </div>
      );
      summary = "";
    });
    return res;
  }

  return (
    <div className={className}>
      {header(labelAttr, createLink)}
      {data.map((item) => {
        return row(item[idAttr], item, labelAttr, editLink, idAttr);
      })}
      {showDialog && (
        <DialogText
          title="Confirmar borrado"
          onClickClose={() => setShowDialog(false)}
          onClickCancel={() => setShowDialog(false)}
          onClickAccept={() => deleteElements()}
          textAccept="Borrar"
        >
          {getSummary()}
        </DialogText>
      )}
      {showNoItemsDialog && (
        <DialogText
          title="No has seleccionado los datos"
          onClickClose={() => setShowNoItemsDialog(false)}
          onClickCancel={() => setShowNoItemsDialog(false)}
          onClickAccept={() => setShowNoItemsDialog(false)}
          textAccept="Aceptar"
        >
          Para poder borrar filas debes de seleccionarlas.
        </DialogText>
      )}
    </div>
  );
};
