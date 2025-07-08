import { getProfile } from "@/http/profile-http";
import { setLoggedInUser } from "@/store/slices/user-slice";
import { RootState } from "@/store/store";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isAuthenticated
  );
  console.log("Is Auth", isAuthenticated);
  const isTempAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isTempAuthenticated
  );
  console.log("Is Temp Auth", isTempAuthenticated);
  const isMFARegistered = useSelector(
    (state: RootState) => state.userSlice.isMFARegistered
  );
  console.log("Is MFARegister", isAuthenticated);

  if (!isAuthenticated && !isTempAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (isTempAuthenticated && !isMFARegistered) {
    return <Redirect href="/(auth)/register-mfa" />;
  }

  return <Redirect href="/(drawer)" />;
};

export default AuthContext;
