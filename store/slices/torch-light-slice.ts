import { createSlice } from "@reduxjs/toolkit";
import { TorchLightModel } from "@/models/other-masters/TorchLightModel";
import { DropdownModel } from "@/models/ui/DropdownModel";

export interface TorchLightState {
  torchlightFindings: TorchLightModel[];
  torchLightFindingItems: DropdownModel[];
  filteredTorchLightFindings: TorchLightModel[];
  paginatedTorchLightFindings: TorchLightModel[];
}

const initialState: TorchLightState = {
  torchlightFindings: [],
  torchLightFindingItems: [],
  filteredTorchLightFindings: [],
  paginatedTorchLightFindings: [],
};

export const torchLightSlice = createSlice({
  name: "torch-light-slice",
  initialState,
  reducers: {
    setAllTorchLights: (state, action) => {
      state.torchlightFindings = action.payload;
      let arr: DropdownModel[] = [];
      state.torchlightFindings.map((item) => {
        arr.push(
          new DropdownModel({
            id: item.id.toString(),
            value: item.finding,
            label: item.action,
          })
        );
      });
      state.torchLightFindingItems = arr;
    },
    setTorchLightPage: (state, action) => {
      state.filteredTorchLightFindings = action.payload;
      state.paginatedTorchLightFindings = action.payload;
    },
    searchTorchLightBottom: (state, action) => {
      const arr = state.filteredTorchLightFindings.filter((item) => {
        if (item.finding.toLowerCase().includes(action.payload.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      state.paginatedTorchLightFindings = arr;
    },
    uncheckAllTles: (state) => {
      let arr = state.torchlightFindings.map((item) => {
        return { ...item, isSelected: false };
      });
      state.torchlightFindings = arr;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllTorchLights,
  setTorchLightPage,
  searchTorchLightBottom,
  uncheckAllTles,
} = torchLightSlice.actions;

export default torchLightSlice.reducer;
