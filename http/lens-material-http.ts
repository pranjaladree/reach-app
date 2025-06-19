import { baseUrl } from "@/constants/Urls";
import { LensMaterialModel } from "@/models/other-masters/LensMaterialModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllLensMaterials = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/lens_materials`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: LensMaterialModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new LensMaterialModel({
          id: element.id,
          title: element.lensMaterialName,
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
