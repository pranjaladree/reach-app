import { createSlice } from "@reduxjs/toolkit";
import { SchoolModel } from "@/models/school/SchoolModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { StudentModel } from "@/models/school/StudentModel";
import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_FILTER_MODEL,
  BLANK_SCREENING_MODEL,
} from "@/constants/BlankModels";
import {
  NORMAL_ABNORMAL_DROPDOWN_ITEMS,
  YES_NO_DROPDOWN_ITEMS,
} from "@/constants/Data";
import { FilterModel } from "@/models/ui/FilterModel";

export interface StudentState {
  appliedFilters: FilterModel;
  students: StudentModel[];
  filteredStudents: StudentModel[];
  screeningItem: ScreeningModel;
}

const initialState: StudentState = {
  students: [],
  appliedFilters: BLANK_FILTER_MODEL,
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
    setFilter: (state, action) => {
      state.appliedFilters = action.payload;
    },
    setScreeningItem: (state, action) => {
      state.screeningItem = action.payload;
      let item = state.screeningItem;

      //check test visibility
      // Vision Test Visibility

      //Workflow
      if (item.usingSpectacle == "NO") {
        item.isVisionTestVisible = true;
      } else {
        if (item.haveSpecNow == "NO") {
          item.isVisionTestVisible = true;
        } else {
          if (item.specCondition != "") {
            item.isVisionTestVisible = true;
            if (item.specCondition == "BAD") {
              item.isNormal = false;
            }
          } else {
            item.isVisionTestVisible = false;
          }
        }
      }

      if (item.unableToPerformVisionTest == "YES") {
        item.isOcularComplaintVisible = false;
        item.isNormal = false;
      } else {
        if (
          item.canReadLogmarLE.value == "YES" &&
          item.canReadLogmarRE.value == "YES"
        ) {
          item.isOcularComplaintVisible = true;
        } else {
          item.isOcularComplaintVisible = false;
          item.isTorchlightVisible = false;
        }

        if (
          item.canReadLogmarLE.value == "NO" ||
          item.canReadLogmarRE.value == "NO"
        ) {
          item.isNormal = false;
        }
      }

      if (item.isOcularComplaintVisible) {
        if (item.ocularComplaint == "YES") {
          item.isNormal = false;
        }

        if (item.ocularComplaint == "NO") {
          item.isTorchlightVisible = true;
        }
      }
      if (item.isTorchlightVisible) {
        if (
          item.torchlightCheckLE.value == "ABNORMAL" ||
          item.torchlightCheckRE.value == "ABNORMAL"
        ) {
          item.isNormal = false;
        }
      }

      if (item.isBinucularTestVisible) {
        if (
          item.coverTest.value == "NORMAL" &&
          item.npcTest.value == "NORMAL" &&
          item.plus2DTestLE.value == "NO" &&
          item.plus2DTestRE.value == "NO"
        ) {
          item.isTorchlightVisible = true;
        } else {
          item.isTorchlightVisible = false;
        }
      }
      state.screeningItem = item;
    },
    setNormalCheck: (state) => {
      const item = state.screeningItem;
      item.isNormal = true;
      item.unableToPerformVisionTest = "NO";
      item.canReadLogmarLE = YES_NO_DROPDOWN_ITEMS[0];
      item.canReadLogmarRE = YES_NO_DROPDOWN_ITEMS[0];
      item.isOcularComplaintVisible = true;
      if (item.haveSpecNow == "YES") {
        item.specCondition = "GOOD";
      }
      item.ocularComplaint = "NO";
      item.isVisionTestVisible = true;
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
  setFilter,
  setScreeningItem,
  setNormalCheck,
  setNormalUncheck,
} = studentSlice.actions;

export default studentSlice.reducer;
