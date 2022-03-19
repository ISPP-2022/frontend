import { Button } from "../Core/Button";
import { useState } from "react";
import { Form } from "../Core/Form";
import { TextArea } from "../TextArea";
import { Rating } from "react-simple-star-rating";
import { DialogText } from "../Core/Dialog";

export const Comments = ({ ratings, reviewers, loggedIn = false }) => {
  const [showDialog, setShowDialog] = useState(false);

  const [dataForm, setDataForm] = useState({
    text: "",
    rating: 0,
  });

  const handleRating = async (rate) => {
    setDataForm({
      ...dataForm,
      rating: Math.floor(rate / 20),
    });
  };

  const handleInputChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = (event) => {
    event.preventDefault();
    checkLogged(loggedIn);
    // CAMBIAR: No puede estar vacío
    console.log(dataForm);
  };

  const fillColorArray = [
    "#f17a45",
    "#f19745",
    "#f1a545",
    "#f1b345",
    "#f1d045",
  ];

  function checkLogged(loggedIn) {
    if (!loggedIn) {
      setShowDialog(true);
    }
  }

  /** A partir de los parámetros obligatorios del componente se genera el html
   * de las reseñas
   *
   * @param {array} ratings
   * @param {object} reviewers
   * @returns {array} parsedRatings
   */
  function loadRatings(ratings, reviewers) {
    const parsedRatings = [];
    ratings.forEach((rating) => {
      parsedRatings.push(
        <div className="w-9/12 mr-4 md:mx-4 md:w-5/12">
          <TextArea
            placeholder="Escribe una valoración"
            className="shadow-lg h-24"
            label={reviewers[rating.rating] + " - " + rating.title} // CAMBIAR: añadir link al perfil del usuario
            value={rating.description}
            disabled
          ></TextArea>
          <div>
            <div className="flex justify-between">
              <Rating
                fillColorArray={fillColorArray}
                className="px-3 py-3"
                fullClassName="px-3 py-3"
                size={30}
                ratingValue={rating.rating * 20}
                readonly
              />
            </div>
          </div>
        </div>
      );
    });
    return parsedRatings;
  }

  return (
    <div className="divide-y-2">
      <div className="mr-4 md:mx-4 md:w-1/2">
        <Form onSubmit={(event) => sendData(event)}>
          <TextArea
            placeholder="Escribe una valoración"
            className="shadow-lg h-24"
            name="text"
            label="Añadir valoración"
            onChange={(event) => handleInputChange(event)}
            onClick={() => checkLogged(loggedIn)}
          ></TextArea>
          {showDialog && (
            <DialogText
              title="Inicia sesión"
              onClickClose={() => setShowDialog(false)}
              onClickCancel={() => setShowDialog(false)}
              onClickAccept={() => {}} //CAMBIAR: redirigir a login
              textAccept="Iniciar sesión"
            >
              Para poder comentar debes iniciar sesión
            </DialogText>
          )}
          <div>
            <div className="flex justify-between">
              <Rating
                fillColorArray={fillColorArray}
                className="px-3 py-3"
                fullClassName="px-3 py-3"
                size={30}
                onClick={(rate) => handleRating(rate)}
                ratingValue={dataForm.rating * 20}
                transition
              />
              <Button className="shadow-lg rounded-lg" type="submit">
                Enviar valoración
              </Button>
            </div>
          </div>
        </Form>
      </div>
      {loadRatings(ratings, reviewers)}
    </div>
  );
}
