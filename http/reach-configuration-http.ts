import { baseUrl } from "@/constants/Urls";
import { ReachConfigurationModel } from "@/models/other-masters/ReachConfigurationModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getReachConfiguration = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/reach/configs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();
    let data;
    //   Converting Fetched Api data to frontend model object
    if (resData) {
      data = new ReachConfigurationModel({
        id: resData.id,
        partnerName: "",
        partnerId: "",
        isPlus2DTest: resData["2DTestEnabled"],
        isCoverTest: resData.coverTestEnabled,
        isNpcTest: resData.npctestEnabled,
        isActive: "Yes",
      });
    }

    return new ResponseModel({
      data: data,
    });
  } catch (err) {
    return new ResponseModel({
      isError: true,
      data: err,
    });
  }
};
