import { baseUrl } from "@/constants/Urls";
import { ReasonForReferralModel } from "@/models/other-masters/ReasonForReferral";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllReasonForReferrals = async (token: string) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/other_clinical_master/reason_for_referrals`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: ReasonForReferralModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new ReasonForReferralModel({
          id: element.id,
          reasonName: element.reasonForReferral,
          reasonDescription: element.referralReasonDesc,
          displayOrder: element.displayOrder,
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
