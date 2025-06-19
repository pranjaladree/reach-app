import { baseUrl } from "@/constants/Urls";
import { DistanceDvaModel } from "@/models/other-masters/DistanceDvaModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllDistanceDvas = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/dvas`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: DistanceDvaModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new DistanceDvaModel({
          id: element.id,
          title: element.distanceName,
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
