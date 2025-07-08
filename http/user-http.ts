import { baseUrl } from "@/constants/Urls";
import { UserModel } from "@/models/user/UserModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/users/partner/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const resData = await res.json();

    //   Converting Fetched Api data to frontend model object
    let arr: UserModel[] = [];
    resData.forEach((element: any) => {
      arr.push(
        new UserModel({
          id: element.id,
          userName: element.userName,
          password: element.password,
          firstName: element.firstName,
          middleName: element.middleName,
          lastName: element.lastName,
          designation: element.designation,
          isPartnerAgreement: element.acceptPartnerAgreement,
          isUserAgreement: element.acceptedUserAgreement,
          isPIIAgreement: element.hasPiiAgreement,
          isDevicePreparation: element.hasDevicePreparationAccess,
          isDataSync: element.hasDataSyncAccess,
          isQualityCheck: element.hasQualityCheckAccess,
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
