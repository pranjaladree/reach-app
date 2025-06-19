import { configureStore } from "@reduxjs/toolkit";
import schoolSlice from "./slices/school-slice";
import userSlice from "./slices/user-slice";
import studentSlice from "./slices/student-slice";
import visualAcuitySlice from "./slices/visual-acuity-slice";
import torchLightSlice from "./slices/torch-light-slice";
import ocularSlice from "./slices/ocular-slice";

export const store = configureStore({
  reducer: {
    schoolSlice: schoolSlice,
    studentSlice: studentSlice,
    userSlice: userSlice,
    visualAcuitySlice: visualAcuitySlice,
    torchLightSlice: torchLightSlice,
    ocularSlice: ocularSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
