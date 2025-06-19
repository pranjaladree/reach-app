import { baseUrl } from "@/constants/Urls";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getProfile = async (token: string) => {
  const res = await fetch(`${baseUrl}/api/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  const response = await res.json();
  if (response) {
    return new ResponseModel({
      data: {
        fullName: response.fullName,
        partnerId: response.partnerId,
        userType: response.userType,
        partnerName: response.partnerName,
        isUserAgreement: response.isUserAgreement,
        isPartnerAgreement: response.isPartnerAgreement,
      },
    });
  } else {
    return new ResponseModel({
      isError: true,
      data: "Failed",
    });
  }
};
