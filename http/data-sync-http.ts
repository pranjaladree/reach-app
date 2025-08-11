import { baseUrl } from "@/constants/Urls";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const syncPSData = async (token: string, requestBody: any) => {
  console.log("Syncing Data ....");
  console.log(JSON.stringify(requestBody));
  const res = await fetch(`${baseUrl}/api/v2/school/sync`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(requestBody),
  });
  const resData = await res.json();
  if (res.status == 200) {
    return new ResponseModel({
      data: "Data Synced Successfully",
    });
  }
  return new ResponseModel({
    isError: true,
    data: "Failed to Data Sync",
  });
};

export const syncMRTagData = async (token: string, requestBody: any) => {
  console.log("Syncing Data ....");
  console.log(JSON.stringify(requestBody));
  const res = await fetch(`${baseUrl}/api/v2/school/sync/mrTag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(requestBody),
  });
  const resData = await res.json();
  console.log("MR RESPONSE ***********************", resData);
  if (res.status == 200) {
    return new ResponseModel({
      data: "Data Synced Successfully",
    });
  } else {
    if (resData.error) {
      return new ResponseModel({
        isError: true,
        data: resData.error,
      });
    } else {
      return new ResponseModel({
        isError: true,
        data: "Failed to do sync data !",
      });
    }
  }
};
