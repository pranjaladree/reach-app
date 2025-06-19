import { baseUrl } from "@/constants/Urls";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllSphs = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/sphs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: GridDropdownModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new GridDropdownModel({
          id: element.id,
          title: element.sphName,
          description: element.distanceDesc,
          displayOrder: element.displayOrder,
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
