/**
 * Crea una tabla. Pensado para la vista de administración en la que se van a mostrar, buscar y editar datos.
 *
 * @param {list} data Datos que se van a mostrar en la tabla.
 * @param {string} idAttr El atributo identificador.
 * @param {object} labelAttr Objeto con label como clave y nombre del atributo como valor para ver si se muestra o no.
 * @param {string} itemLink Link para acceder un item, se remplazara "{id}" por el valor del atributo especificado en 'idAttr'.
 * @param {string} createLink Link para crear un item.
 * @param {string} deleteLink Link para borrar un item, se remplazara "{id}" por el valor del atributo especificado en 'idAttr'.
 * @param {list} attrSummary Lista con los atributos que resumen el objeto, se mostrarán antes de borrar.
 */
export const Table = ({
  data,
  idAttr,
  labelAttr,
  itemLink,
  createLink,
  deleteLink,
  attrSummary
}) => {
    return (
        <div>
            {row(1, data[0], labelAttr, itemLink, idAttr)}
            {row(2, data[0], labelAttr, itemLink, idAttr)}
        </div>
    )
};

/**
 * Crea una fila de la tabla.
 *
 * @param {number} rowId Identifica la fila.
 * @param {object} element Elemento de 'data'.
 * @param {object} labelAttr Objeto con label como clave y nombre del atributo como valor para ver si se muestra o no.
 * @param {string} itemLink Link para acceder un item, se remplazara "{id}" por el valor del atributo especificado en 'idAttr'.
 * @param {string} idAttr El atributo identificador.
 */
function row(rowId, element, labelAttr, itemLink, idAttr) {
  var elementId = element[idAttr];
  var parsedLink = itemLink.replace("{id}", elementId);
  const res = [];
  var bgColor = rowId%2 === 0 ? "bg-gray-200" : "bg-gray-100"
  var layout = bgColor + " h-12 w-44 my-1 text-center flex items-center justify-center"
  Object.entries(labelAttr).forEach((element) => {
    res.push(<div className={layout}><p>e</p></div>);
  });
  return (
      <div className="flex divide-x">
          {res}
      </div>
  );
}
