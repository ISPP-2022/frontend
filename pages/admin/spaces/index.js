import { Table } from "../../../components/Table";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import axios from "axios";

export async function getServerSideProps(ctx) {
  // const cookies = ctx.req.cookies;
  // const user = jwt.decode(cookies.authToken);

  var data = await axios.get(`${process.env.DATA_API_URL}/api/v1/spaces`);
  return {
    props: {
      data: data.data,
      baseLink: process.env.DATA_API_URL_PUBLIC,
    },
  };
}

function Spaces(props) {
  var data = props.data;
  var labelAttr = {
    Name: "name",
    City: "city",
    Dimensions: "dimensions",
    StartHour: "startHour",
    EndHour: "endHour"
  };
  var summary = ["city", "name"];
  return (
    <div className="md:flex">
      <NavbarAdmin />
      <Table
        label="Spaces"
        className=""
        data={data}
        idAttr="id"
        labelAttr={labelAttr}
        editLink="spaces/${id}"
        createLink="spaces/new"
        deleteLink={props.baseLink + "/api/v1/spaces/${id}"}
        attrSummary={summary}
      />
    </div>
  );
}

export default Spaces;
