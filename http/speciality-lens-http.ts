import { baseUrl } from "@/constants/Urls";
import { SpecialityLensModel } from "@/models/other-masters/SpecialityLensModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllSpecialityLens = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/specialityLenses`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: SpecialityLensModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new SpecialityLensModel({
          id: element.id,
          title: element.specialityLensName,
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
