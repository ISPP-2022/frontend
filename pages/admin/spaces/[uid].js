import { Table } from "../../../components/Table";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import { AdminForm } from "../../../components/forms/AdminForm";
import axios from "axios";

async function sendRequest(url) {
  try {
    return await axios.get(url);
  } catch (error) {
    return { data: [] };
  }
}

export async function getServerSideProps({ query }) {
  var user = await sendRequest(
    `${process.env.DATA_API_URL}/api/v1/users/${query.uid}`
  );
  var items = await sendRequest(
    `${process.env.DATA_API_URL}/api/v1/users/${query.uid}/items`
  );
  var ratings = await sendRequest(
    `${process.env.DATA_API_URL}/api/v1/users/${query.uid}/ratings`
  );
  var spaces = await sendRequest(
    `${process.env.DATA_API_URL}/api/v1/users/${query.uid}/spaces`
  );
  var rentals = await sendRequest(
    `${process.env.DATA_API_URL}/api/v1/users/${query.uid}/rentals`
  );
  var avatar = await sendRequest(
    `${process.env.DATA_API_URL}/api/v1/users/${query.uid}/avatar`
  );

  return {
    props: {
      user: user.data,
      items: items.data,
      ratings: ratings.data,
      spaces: spaces.data,
      rentals: rentals.data,
      avatar: avatar.data,
      baseLink: process.env.DATA_API_URL_PUBLIC,
    },
  };
}
function User({ user, items, ratings, spaces, rentals, avatar, baseLink }) {

  var labelAttr={
    "Name*": {"attr": "name", "type": "text"},
    "Surname*": {"attr": "surname", "type": "text"},
    "BirthDate": {"attr": "birthDate", "type": "date"},
    "Sex": {"attr": "sex", "type": "select", "options":["MALE", "FEMALE", "OTHER"]},
    "Id Card": {"attr": "idCard", "type": "text"},
    "Phone Number": {"attr": "phoneNumber", "type": "text"},
    "Location": {"attr": "location", "type": "text"}
  }

  var itemLabelAttr = {
    Id: "id",
    Tipo: "type",
    Dimensiones: "dimensions",
  };
  var itemSummary = ["type", "dimensions"];

  var ratingsLabelAttr = {
    Titulo: "title",
    Descripcion: "description",
    Valoracion: "rating",
  };
  var ratingsSummary = ["title", "description"];

  var spacesLabelAttr = {
    Nombre: "name",
    Descripcion: "description",
    Pais: "country",
  };
  var spacesSummary = ["name", "description"];

  var rentalsLabelAttr = {
    Coste: "cost",
    Tipo: "type",
    Metros: "meters",
  };
  var rentalsSummary = ["cost", "type"];

  var avatarLabelAttr = {
    mimetype: "mimetype",
  };
  var avatarSummary = ["mimetype"];
  return (
    <div className="md:flex">
      <NavbarAdmin />
      <div>
      <div className="h-screenC md:bg-gray-100 flex justify-center items-center">
        <main className="md:bg-white mb-4 p-4 w-80vh md:w-2/3 md:mt-3 md:rounded-xl md:border-2 md:border-[#4aa7c0] ">
          <div className="grid grid-cols-1 justify-items-center">
            <AdminForm 
            data={user} 
            mainTable="users" 
            labelAttr={labelAttr} 
            updateLink={`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${user["id"]}`} 
            nuevo={false}/>
          </div>
      </main>
    </div>
        <Table
          tableId="items"
          label="Items"
          data={items}
          idAttr="id"
          labelAttr={itemLabelAttr}
          editLink="user/${id}"
          createLink="user/new"
          deleteLink={baseLink + "/api/v1/users/${id}"}
          attrSummary={itemSummary}
        />
        <Table
          tableId="ratings"
          label="Valoraciones"
          data={ratings}
          idAttr="id"
          labelAttr={ratingsLabelAttr}
          editLink="user/${id}"
          createLink="user/new"
          deleteLink={baseLink + "/api/v1/users/${id}"}
          attrSummary={ratingsSummary}
        />
        <Table
          tableId="spaces"
          label="Espacios"
          data={spaces}
          idAttr="id"
          labelAttr={spacesLabelAttr}
          editLink="user/${id}"
          createLink="user/new"
          deleteLink={baseLink + "/api/v1/users/${id}"}
          attrSummary={spacesSummary}
        />
        <Table
          tableId="rentals"
          label="Precios"
          data={rentals}
          idAttr="id"
          labelAttr={rentalsLabelAttr}
          editLink="user/${id}"
          createLink="user/new"
          deleteLink={baseLink + "/api/v1/users/${id}"}
          attrSummary={rentalsSummary}
        />
        <Table
          tableId="avatar"
          label="Avatar"
          data={avatar}
          idAttr="id"
          labelAttr={avatarLabelAttr}
          editLink="user/${id}"
          createLink="user/new"
          deleteLink={baseLink + "/api/v1/users/${id}"}
          attrSummary={avatarSummary}
        />
      </div>
    </div>
  );
}

export default User;
