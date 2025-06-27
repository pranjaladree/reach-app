import { baseUrl } from "@/constants/Urls";
import { CYLModel } from "@/models/other-masters/CYLModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllCyls = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/cyls`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: CYLModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new CYLModel({
          id: element.id,
          title: element.cylName,
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
