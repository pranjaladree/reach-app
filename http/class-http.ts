import { baseUrl } from "@/constants/Urls";
import { ClassModel } from "@/models/other-masters/ClassModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllClasses = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/class-masters`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: ClassModel[] = [];
    resData.content.forEach((element: any) => {
      arr.push(
        new ClassModel({
          id: element.id,
          title: element.className,
          minAge: element.minAge,
          maxAge: element.maxAge,
          displayOrder: element.displayOrder,
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
