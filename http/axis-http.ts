import { baseUrl } from "@/constants/Urls";
import { AxisModel } from "@/models/other-masters/AxisModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllAxises = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/axises`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: AxisModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new AxisModel({
          id: element.id,
          title: element.axisName,
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
