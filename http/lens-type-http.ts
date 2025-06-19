import { baseUrl } from "@/constants/Urls";
import { LensTypeModel } from "@/models/other-masters/LensTypeModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllLensTypes = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/lens_types`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: LensTypeModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new LensTypeModel({
          id: element.id,
          title: element.lensTypeName,
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
