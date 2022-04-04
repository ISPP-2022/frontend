import { Table } from "../../../components/Table";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import axios from "axios";
import Head from 'next/head';

export async function getServerSideProps(ctx) {
  // const cookies = ctx.req.cookies;
  // const user = jwt.decode(cookies.authToken);

  var data = await axios.get(`${process.env.DATA_API_URL}/api/v1/users`);
  return {
    props: {
      data: data.data,
      baseLink: process.env.DATA_API_URL_PUBLIC,
    },
  };
}

function Users(props) {
  var data = props.data;
  var labelAttr = {
    Name: "name",
    Surname: "surname",
    Sex: "sex",
    IdCard: "idCard",
    PhoneNumber: "phoneNumber",
  };
  var summary = ["idCard", "name"];
  return (
    <div className="md:flex">
      <Head>
        <title>Administration Page</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <NavbarAdmin />
      <Table
        label="Users"
        className=""
        data={data}
        idAttr="id"
        labelAttr={labelAttr}
        editLink="users/${id}"
        // De momento no existen endpoints para estas acciones
        //   createLink="user/new"
        //   deleteLink={props.baseLink + "/api/v1/users/${id}"}
        attrSummary={summary}
      />
    </div>
  );
}

export default Users;
