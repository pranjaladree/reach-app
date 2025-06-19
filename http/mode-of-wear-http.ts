import { baseUrl } from "@/constants/Urls";
import { ModeOfWearModel } from "@/models/other-masters/ModeOfWearModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllModeOfwears = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/modeOfWears`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: ModeOfWearModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new ModeOfWearModel({
          id: element.id,
          title: element.modeOfWearName,
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
