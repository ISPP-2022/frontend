import { Button } from "../Core/Button";
import { useState } from "react";
import { Form } from "../Core/Form";
import { TextArea } from "../TextArea";
import { Rating } from "react-simple-star-rating";
import { DialogText } from "../Core/Dialog";
import { Link } from "@mui/material";
import { Loading } from "../Core/Loading";
import axios from "axios";

export default function Comments({
  userId,
  loggedUserId,
  ratings,
  reviewers,
  userUrl,
  loggedIn = false,
}) {

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
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
    if (loggedIn) {
      var errors = checkForm(dataForm);
      if (Object.values(errors).length !== 0) {
        var errorsInput = document.getElementById("errors");
        errorsInput.className = errorsInput.className.replace(
          "hidden",
          "border-2 border-[#E57373] rounded-md"
        );
        var elements = Object.values(errors).map((value) => {
          return value + "</br>";
        });
        errorsInput.innerHTML = elements.join("");

        setLoading(false);
      } else {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_DATA_API_URL || "http://localhost:4100"
            }/api/v1/users/${userId}/rate`,
            dataForm,
            { withCredentials: true }
          )
          .then((res) => {
            location.reload();
          })
          .catch((err) => {
            var errorsInput = document.getElementById("errors");
            errorsInput.className = errorsInput.className.replace(
              "hidden",
              "border-2 border-[#E57373] rounded-md"
            );
            errorsInput.innerHTML =
              err.response.data === "Can not rate yourself"
                ? "¡No puedes valorarte a ti mismo!"
                : err.response.data;

            setLoading(false);
          });
      }
    } else {
      setLoading(false);
    }
  };

  function checkForm(data) {
    var title = data.title;
    var description = data.description;
    var rating = data.rating;

    var errorsInput = document.getElementById("errors");
    errorsInput.className = errorsInput.className.replace(
      "border-2 border-[#E57373] rounded-md",
      "hidden"
    );

    const errors = {};

    if (title.trim().length <= 2 || 50 < title.trim().length) {
      errors.title = "El título tiene que medir entre 3 y 50 carácteres";
    }

    if (description.trim().length <= 2 || 100 < description.trim().length) {
      errors.description =
        "La descripción tiene que medir entre 3 y 100 carácteres";
    }

    if (rating <= 0 || 5 < rating) {
      errors.rating = "La valoración tiene que ser entre 1 y 5";
    }

    return errors;
  }

  const fillColorArray = [
    "#f17a45",
    "#f19745",
    "#f1a545",
    "#f1b345",
    "#f1d045",
  ];

  function checkLogged(loggedIn) {
    if (!loggedIn) {
      alert("¡Debes estar conectado para poder valorar!")
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
            label={
              <Link
                className="no-underline text-black"
                href={userUrl.replace("${id}", reviewers[rating.reviewerId].userId)}
              >
                {reviewers[rating.reviewerId].userName + " - " + rating.title}
              </Link>
            }
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
      {parseInt(loggedUserId) === parseInt(userId) ? (
        <div className="mr-4 md:mx-4 md:w-1/2 mt-2"></div>
      ) : (
        <div className="mr-4 md:mx-4 md:w-1/2 mt-2">
          <Form
            onSubmit={(event) => {
              setLoading(true);
              sendData(event);
            }}
          >
            <TextArea
              id="description"
              placeholder="Escribe una valoración"
              className="shadow-lg h-24"
              name="description"
              label={
                <input
                  id="title"
                  placeholder="Título"
                  name="title"
                  required
                  className="pl-2 ml-2 bg-gray-200 shadow-sm rounded-md"
                  onChange={(event) => handleInputChange(event)}
                />
              }
              onChange={(event) => handleInputChange(event)}
            ></TextArea>
            {showDialog && (
              <DialogText
                title="Inicia sesión"
                onClickClose={() => setShowDialog(false)}
                onClickCancel={() => setShowDialog(false)}
                onClickAccept={() => {
                  setShowDialog(false);
                }}
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
                  {!loading && "Enviar valoración"}
                  {loading && <Loading size="small" />}
                </Button>
              </div>
            </div>
          </Form>

          <div
            id="errors"
            className="grid content-center align-center text-[#E57373] pl-2 hidden"
          ></div>
        </div>
      )}
      {loadRatings(ratings, reviewers)}
    </div>
  );
};
