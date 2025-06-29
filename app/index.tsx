import ScreeningTabs from "@/components/new_UI/mrtag";
import { RootState } from "@/store/store";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

const AuthContext = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isAuthenticated
  );
  const isTempAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isTempAuthenticated
  );
  const isMFARegistered = useSelector(
    (state: RootState) => state.userSlice.isMFARegistered
  );

  if (!isAuthenticated && !isTempAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (isTempAuthenticated && !isMFARegistered) {
    return <Redirect href="/(auth)/register-mfa" />;
  }

  return <Redirect href="/(drawer)" />;
  

};

export default AuthContext;
