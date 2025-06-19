import { baseUrl } from "@/constants/Urls";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getVisionCenters = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/v2/vision-center?active=active`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();
    console.log("Vision Centers", resData);

    let arr: DropdownModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new DropdownModel({
          id: element.id,
          label: element.visionCenterName,
          value: element.visionCenterName,
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
