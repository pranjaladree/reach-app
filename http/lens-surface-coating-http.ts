import { baseUrl } from "@/constants/Urls";
import { LensSurfaceCoatingModel } from "@/models/other-masters/LensSurfaceCoatingModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllLensSurfaceCoating = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/lensCoatings`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: LensSurfaceCoatingModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new LensSurfaceCoatingModel({
          id: element.id,
          title: element.lensSurfaceCoatingName,
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
