import { baseUrl } from "@/constants/Urls";
import { AddModel } from "@/models/other-masters/AddModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllAdds = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/refraction/add_masters`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: AddModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new AddModel({
          id: element.id,
          title: element.addName,
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
