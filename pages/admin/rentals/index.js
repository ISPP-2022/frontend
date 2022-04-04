import { Table } from "../../../components/Table";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import axios from "axios";
import Head from 'next/head';

export async function getServerSideProps(ctx) {
  // const cookies = ctx.req.cookies;
  // const user = jwt.decode(cookies.authToken);

  var data = await axios.get(`${process.env.DATA_API_URL}/api/v1/rentals`);
  return {
    props: {
      data: data.data,
      baseLink: process.env.DATA_API_URL_PUBLIC,
    },
  };
}

function Rentals(props) {
  var data = props.data;
  var labelAttr = {
    "Initial date": "initialDate",
    "Dinal date": "finalDate",
    Type: "type",
    Meters: "meters",
    "Space ID": "spaceId",
  };
  var summary = ["type", "spaceId"];
  return (
    <div>
      <Head>
        <title>Administration Page</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <div className="md:flex">
        <NavbarAdmin />
        <Table
          label="Rentals"
          className=""
          data={data}
          idAttr="id"
          labelAttr={labelAttr}
          attrSummary={summary}
        />
      </div>
    </div>
  );
}

export default Rentals;
