import { createSlice } from "@reduxjs/toolkit";
import { SchoolModel } from "@/models/school/SchoolModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { BLANK_SCHOOL_MODEL } from "@/constants/BlankModels";

export interface SchoolState {
  schools: SchoolModel[];
  schoolItems: DropdownModel[];
  filteredSchools: SchoolModel[];
  choosenSchool: SchoolModel;
}

const initialState: SchoolState = {
  schools: [],
  schoolItems: [],
  filteredSchools: [],
  choosenSchool: BLANK_SCHOOL_MODEL,
};

export const schoolSlice = createSlice({
  name: "school-slice",
  initialState,
  reducers: {
    setSchools: (state, action) => {
      state.schools = action.payload;
      let arr: DropdownModel[] = [];
      state.schools.map((item) => {
        arr.push(
          new DropdownModel({
            id: item.id.toString(),
            value: item.schoolName,
            label: item.schoolName,
          })
        );
      });
      state.schoolItems = arr;
    },
    setChoosenSchool: (state, action) => {
      state.choosenSchool = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSchools, setChoosenSchool } = schoolSlice.actions;

export default schoolSlice.reducer;
