import { baseUrl } from "@/constants/Urls";
import { NvaModel } from "@/models/other-masters/NvaModel";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllNvas = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/nvas`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: NvaModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new NvaModel({
          id: element.id,
          title: element.nvaName,
          description: element.distanceDesc,
          displayOrder: element.display_order,
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
