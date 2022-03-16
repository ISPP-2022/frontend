import { Button } from "../../components/Core/Button";
import { useState } from "react";
import { Form } from "../../components/Core/Form";
import { TextArea } from "../../components/TextArea";
import { Rating } from "react-simple-star-rating";
import { DialogText } from "../../components/Core/Dialog";

export const Comment = ({ userID, loggedIn = false }) => {
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

  function getUserName(userID) {
    if (userID === -1) {
      return "Usuario prueba";
    } else {
      //CAMBIAR: axios
    }
  }

  function loadComments(userID) {
    const data = [];
    if (userID === undefined) {
      data[0] = {
        title: "Título 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut ipsum sem. Vivamus at mollis elit. Quisque condimentum, libero et consectetur molestie, arcu nunc congue dolor, eget hendrerit enim lacus sit amet metus. Etiam ullamcorper porttitor placerat. Nulla lacinia viverra placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec at vestibulum arcu. Nam pulvinar elit ex, a aliquam erat aliquam scelerisque. Maecenas eu venenatis massa, vitae pretium ipsum. Etiam a luctus lorem, maximus tempor leo.",
        rating: 1,
        reviewerId: -1,
        receiverId: -1,
      };
      data[1] = {
        title: "Título 2",
        description: "Descripción 2",
        rating: 3,
        reviewerId: -1,
        receiverId: -1,
      };
      data[2] = {
        title: "Título 3",
        description:
          "Suspendisse porta ante sem, sed feugiat tellus ultrices at. Donec vestibulum orci nec dui aliquet eleifend. Cras lobortis magna id sapien consectetur, nec vestibulum enim varius. Phasellus accumsan turpis nunc, vel lacinia ante iaculis ut. Mauris nec eleifend ante. Sed pellentesque interdum tempus. Aliquam condimentum nisi risus, et vehicula nibh egestas sit amet. Vestibulum ornare id nunc et maximus. Cras semper nibh quis nunc lobortis, vitae condimentum magna tempor. Nam placerat arcu nec lorem iaculis, ac sodales justo aliquet. Curabitur blandit euismod lectus id posuere. Donec at sollicitudin tortor, quis dictum neque. Vivamus ac enim libero. Mauris a sodales odio.",
        rating: 5,
        reviewerId: -1,
        receiverId: -1,
      };
    } else {
      // CAMBIAR: Implementar el get con axios
    }

    const comments = [];

    data.forEach((value) => {
      comments.push(
        <div className="w-9/12 mr-4 md:mx-4 md:w-5/12">
          <TextArea
            placeholder="Escribe una valoración"
            className="shadow-lg h-24"
            label={getUserName(value.reviewerId) + " - " + value.title}
            value={value.description}
            disabled
          ></TextArea>
          <div>
            <div className="flex justify-between">
              <Rating
                fillColorArray={fillColorArray}
                className="px-3 py-3"
                fullClassName="px-3 py-3"
                size={30}
                ratingValue={value.rating * 20}
                readonly
              />
            </div>
          </div>
        </div>
      );
    });

    return comments;
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
      {loadComments(userID)}
    </div>
  );
};
