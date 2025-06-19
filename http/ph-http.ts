import { baseUrl } from "@/constants/Urls";
import { PHModel } from "@/models/other-masters/PHModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllPhs = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/phs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: PHModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new PHModel({
          id: element.id,
          title: element.phName,
          description: element.phDesc,
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
