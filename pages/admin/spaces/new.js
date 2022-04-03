import { Table } from "../../../components/Table";
import { NavbarAdmin } from "../../../components/NavbarAdmin";
import { AdminForm } from "../../../components/forms/AdminForm";
import axios from "axios";
import {optionTags} from '../../../components/Filter/options';

async function sendRequest(url) {
  try {
    return await axios.get(url);
  } catch (error) {
    return { data: [] };
  }
}

function NewSpaces() {

  var labelAttr={
    "Name*": {"attr": "name", "type": "text"},
    "Description*": {"attr": "description", "type": "text"},
    "Initial Date*": {"attr": "initialDate", "type": "date"},
    "Final Date": {"attr": "finalDate", "type": "date"},
    "Start Hour*": {"attr": "startHour", "type": "time"},
    "End Hour": {"attr": "endHour", "type": "time"},
    "Location*": {"attr": "location", "type": "text"},
    "City*": {"attr": "city", "type": "text"},
    "Province*": {"attr": "province", "type": "text"},
    "Country*": {"attr": "country", "type": "text"},
    "Dimensions*": {"attr": "dimensions", "type": "text"},
    "Price Hour": {"attr": "priceHour", "type": "number"},
    "Price Day": {"attr": "priceDay", "type": "number"},
    "Price Month": {"attr": "priceMonth", "type": "number"},
    "Shared*": {"attr": "shared", "type": "checkbox"},
    "OwnerId*": {"attr": "ownerId", "type": "number"},
    "Tags*": {"attr": "tags", "type": "tags", "options":optionTags},
    "Images*": {"attr": "images", "type": "options"}
  }


  return (
    <div className="md:flex">
      <NavbarAdmin />
      <div>
      <div className="md:bg-gray-100 flex justify-center">
        <main className="md:bg-white mb-4 p-4 md:w-2/3 md:mt-3 md:rounded-xl md:border-2 md:border-[#4aa7c0] ">
          <div className="grid grid-cols-1 justify-items-center">
            <AdminForm 
            mainTable="spaces" 
            labelAttr={labelAttr} 
            updateLink={`${process.env.NEXT_PUBLIC_DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/`} 
            nuevo={true}/>
          </div>
        </main>
      </div>
    </div>
  </div>
  );
}

export default NewSpaces;
