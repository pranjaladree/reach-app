import { baseUrl } from "@/constants/Urls";
import { DiagnosisModel } from "@/models/other-masters/DiagnosisModel";
import { ResponseModel } from "@/models/utils/ResponseModel";
// import { PaginationModel } from "../../models/ui/PaginationModel";

export const getAllDiagnosis = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/diagnosises`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: DiagnosisModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new DiagnosisModel({
          id: element.id,
          title: element.diagnosisName,
          category: element.diagnosisCategory,
          displayOrder: element.displayOrder,
          isActive: "Yes",
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
