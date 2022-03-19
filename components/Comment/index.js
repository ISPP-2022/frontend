import { Button } from "../../components/Core/Button";
import { useState, useEffect } from "react";
import { Form } from "../../components/Core/Form";
import { TextArea } from "../../components/TextArea";
import { Rating } from "react-simple-star-rating";
import { DialogText } from "../../components/Core/Dialog";

export const Comment = ({ ratings, reviewers, loggedIn = false }) => {
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
    checkLogged(loggedIn)
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

  function loadComments(comments, reviewers) {

    const parsedComments = [];
    comments.forEach((comment) => {
      parsedComments.push(
        <div className="w-9/12 mr-4 md:mx-4 md:w-5/12">
          <TextArea
            placeholder="Escribe una valoración"
            className="shadow-lg h-24"
            label={reviewers[comment.rating] + " - " + comment.title} // CAMBIAR: añadir url del perfil del usuario
            value={comment.description}
            disabled
          ></TextArea>
          <div>
            <div className="flex justify-between">
              <Rating
                fillColorArray={fillColorArray}
                className="px-3 py-3"
                fullClassName="px-3 py-3"
                size={30}
                ratingValue={comment.rating * 20}
                readonly
              />
            </div>
          </div>
        </div>
      );
    });
    return parsedComments;
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
      {loadComments(ratings, reviewers)}
    </div>
  );
};
