import { baseUrl } from "@/constants/Urls";
import { TorchLightModel } from "@/models/other-masters/TorchLightModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllTorchLights = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/torch-lights`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: TorchLightModel[] = [];
    resData.content.forEach((element: any) => {
      arr.push(
        new TorchLightModel({
          id: element.id,
          finding: element.torchLightFinding,
          displayOrder: element.displayOrder,
          action: element.action,
          isSelected: false,
          isActive: element.isActive,
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
