import { createSlice } from "@reduxjs/toolkit";
import { BLANK_VISUAL_ACUITY_MODEL } from "@/constants/BlankModels";
import { VisualAcuityModel } from "@/models/patient-at-fixed-facilty/VisualAcuityModel";

export interface VisualAcuityState {
  visualAcuityItem: VisualAcuityModel;
}

const initialState: VisualAcuityState = {
  visualAcuityItem: BLANK_VISUAL_ACUITY_MODEL,
};

export const visualAcuitySlice = createSlice({
  name: "visual-acuity-slice",
  initialState,
  reducers: {
    setVisualAcuity: (state, action) => {
      state.visualAcuityItem = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVisualAcuity } = visualAcuitySlice.actions;

export default visualAcuitySlice.reducer;
