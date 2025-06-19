import { baseUrl } from "@/constants/Urls";
import { SpecialInstructionModel } from "@/models/other-masters/SpecialInstructionModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllSpecialInstructions = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/specialInses`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: SpecialInstructionModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new SpecialInstructionModel({
          id: element.id,
          title: element.specialInstruction,
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
