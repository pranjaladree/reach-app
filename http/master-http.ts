import { GridDropdownModel } from "@/models/ui/GridDropdownModel";

export const getMasterData = async (token: string, url: string) => {
  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  const resData = await res.json();

  //   Converting Fetched Api data to frontend model object
  let arr: GridDropdownModel[] = [];
  resData.forEach((element: any) => {
    arr.push(
      new GridDropdownModel({
        id: element.id,
        title: element.distanceName,
        description: element.distanceDesc,
        displayOrder: element.display_order,
      })
    );
  });

  return arr;
};
