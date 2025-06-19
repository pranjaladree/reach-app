import { baseUrl } from "@/constants/Urls";
import { OcularModel } from "@/models/other-masters/OcularModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllOculars = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/oculars`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: OcularModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new OcularModel({
          id: element.id,
          ocularName: element.ocularName,
          displayOrder: element.displayOrder,
          isReferCase: element.referCase,
          ocularType: element.ocularCategory,
          isSelected: false,
          isBinacular: element.binacularTest,
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
