import { baseUrl } from "@/constants/Urls";
import { FrameMaterialModel } from "@/models/other-masters/FrameMaterialModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllFrameMaterials = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/frameMaterials`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: FrameMaterialModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new FrameMaterialModel({
          id: element.id,
          title: element.frameMaterialName,
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
