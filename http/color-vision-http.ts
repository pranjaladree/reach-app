import { baseUrl } from "@/constants/Urls";
import { ColorConfigModel } from "@/models/other-masters/ColorConfigModel";
import { ResponseModel } from "@/models/utils/ResponseModel";
// import { PaginationModel } from "../../models/ui/PaginationModel";

export const getAllColorVisionConfigs = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/color-vision/mobile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: ColorConfigModel[] = [];
    let count = 0;
    resData.forEach((item: any) => {
      count++;
      arr.push(
        new ColorConfigModel({
          id: count,
          classId: item.id,
          gender: "MALE",
          isRequired: item.male,
        })
      );
      count++;
      arr.push(
        new ColorConfigModel({
          id: count,
          classId: item.id,
          gender: "FEMALE",
          isRequired: item.female,
        })
      );
      count++;
      arr.push(
        new ColorConfigModel({
          id: count,
          classId: item.id,
          gender: "TRANSGENDER",
          isRequired: item.transgender,
        })
      );
    });

    console.log("CONFIGS", arr);
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
