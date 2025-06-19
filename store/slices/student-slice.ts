import { createSlice } from "@reduxjs/toolkit";
import { SchoolModel } from "@/models/school/SchoolModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { StudentModel } from "@/models/school/StudentModel";
import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_SCREENING_MODEL,
} from "@/constants/BlankModels";
import { NORMAL_ABNORMAL_DROPDOWN_ITEMS } from "@/constants/Data";

export interface StudentState {
  students: StudentModel[];
  filteredStudents: StudentModel[];
  screeningItem: ScreeningModel;
}

const initialState: StudentState = {
  students: [],
  filteredStudents: [],
  screeningItem: BLANK_SCREENING_MODEL,
};

export const studentSlice = createSlice({
  name: "student-slice",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
      state.filteredStudents = action.payload;
    },
    setScreeningItem: (state, action) => {
      state.screeningItem = action.payload;

      // Check Test Visibility
      let item = state.screeningItem;
      if (
        item.canReadLogmarLE.value == "YES" &&
        item.canReadLogmarRE.value == "YES"
      ) {
        item.isOcularComplaintVisible = true;
      } else {
        item.isOcularComplaintVisible = false;
      }

      if (
        item.plus2DTestLE.value == "NO" &&
        item.plus2DTestRE.value == "NO" &&
        item.npcTest.value !== "ABNORMAL" &&
        item.coverTest.value != "ABNORMAL"
      ) {
        item.isTorchlightVisible = true;
      }

      if (item.ocularComplaint == "NO") {
        item.isTorchlightVisible = true;
      }

      //Update Screening Item
      state.screeningItem = item;
    },
    setNormalCheck: (state) => {
      const item = state.screeningItem;
      item.unableToPerformVisionTest = "NO";
      item.canReadLogmarLE = NORMAL_ABNORMAL_DROPDOWN_ITEMS[0];
      item.canReadLogmarRE = NORMAL_ABNORMAL_DROPDOWN_ITEMS[0];
      item.isOcularComplaintVisible = true;
      item.ocularComplaint = "NO";
      item.isTorchlightVisible = true;
      item.torchlightCheckLE = NORMAL_ABNORMAL_DROPDOWN_ITEMS[0];
      item.torchlightCheckRE = NORMAL_ABNORMAL_DROPDOWN_ITEMS[0];
      state.screeningItem = item;
    },
    setNormalUncheck: (state) => {
      const item = state.screeningItem;
      item.unableToPerformVisionTest == "";
      item.canReadLogmarLE = BLANK_DROPDOWN_MODEL;
      item.canReadLogmarRE = BLANK_DROPDOWN_MODEL;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStudents,
  setScreeningItem,
  setNormalCheck,
  setNormalUncheck,
} = studentSlice.actions;

export default studentSlice.reducer;
