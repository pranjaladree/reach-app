import { baseUrl } from "@/constants/Urls";
import { LensTintModel } from "@/models/other-masters/LensTintModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllLensTint = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/lensTints`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: LensTintModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new LensTintModel({
          id: element.id,
          title: element.lensTintName,
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
