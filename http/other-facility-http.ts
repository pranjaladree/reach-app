import { baseUrl } from "@/constants/Urls";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getOtherFacilities = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/v2/hospital?active=active`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: DropdownModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new DropdownModel({
          id: element.id.toString(),
          label: element.facilityName,
          value: element.facilityName,
        })
      );
    });

    return new ResponseModel({
      data: arr,
    });
  } catch (err) {
    return new ResponseModel({
      isError: true,
      data: err,
    });
  }
};
