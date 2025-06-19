import { createSlice } from "@reduxjs/toolkit";
import { OcularModel } from "@/models/other-masters/OcularModel";
import { DropdownModel } from "@/models/ui/DropdownModel";

export interface OcularState {
  ocularTypes: OcularModel[];
  ocularTypeItems: DropdownModel[];
  filteredOculars: OcularModel[];
  paginatedOculars: OcularModel[];
}

const initialState: OcularState = {
  ocularTypes: [],
  ocularTypeItems: [],
  filteredOculars: [],
  paginatedOculars: [],
};

export const ocularSlice = createSlice({
  name: "ocular-slice",
  initialState,
  reducers: {
    setAllOculars: (state, action) => {
      state.ocularTypes = action.payload;
      let arr: DropdownModel[] = [];
      state.ocularTypes.map((item) => {
        arr.push(
          new DropdownModel({
            id: item.id.toString(),
            value: item.ocularName,
            label: item.ocularName,
          })
        );
      });
      state.ocularTypeItems = arr;
    },
    setOcularPage: (state, action) => {
      state.filteredOculars = action.payload;
      state.paginatedOculars = action.payload;
    },
    searchOcularBottom: (state, action) => {
      const arr = state.filteredOculars.filter((item) => {
        if (
          item.ocularName.toLowerCase().includes(action.payload.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
      state.paginatedOculars = arr;
    },
    uncheckAllOculars: (state) => {
      let arr = state.ocularTypes.map((item) => {
        return { ...item, isSelected: false };
      });
      state.ocularTypes = arr;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllOculars,
  setOcularPage,
  searchOcularBottom,
  uncheckAllOculars,
} = ocularSlice.actions;

export default ocularSlice.reducer;
