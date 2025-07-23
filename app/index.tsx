import { getProfile } from "@/http/profile-http";
import { setLoggedIn, setLoggedInUser } from "@/store/slices/user-slice";
import { RootState } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isAuthenticated
  );
  const isTempAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isTempAuthenticated
  );
  const dispatch = useDispatch();
  const isMFARegistered = useSelector(
    (state: RootState) => state.userSlice.isMFARegistered
  );
  console.log("Is MFARegister", isAuthenticated);

  const getProfileHandler = async (token: string) => {
    const response = await getProfile(token);
    dispatch(
      setLoggedInUser({
        userId: response.data.id,
        fullName: response.data.fullName,
        partnerId: response.data.partnerId,
        userType: response.data.userType,
        partnerName: response.data.partnerName,
        isUserAgreement: response.data.isUserAgreement,
        isPartnerAgreement: response.data.isPartnerAgreement,
      })
    );
  };

  const autoLoginHandler = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const expiry = await AsyncStorage.getItem("expiry");
      console.log("Token &&&&&&&&&&&&&&&&&&&&&& :", token);
      console.log("Expiry &&&&&&&&&&&&&&&&&&&&& :", expiry);
      console.log(new Date().getTime());
      if (token !== null && expiry !== null) {
        // value previously stored
        if (new Date().getTime() < +expiry) {
          console.log("Loading....");
          dispatch(setLoggedIn(token));
          getProfileHandler(token);
        }
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  console.log("IS Authericated", isAuthenticated);
  console.log("IS MFA", isMFARegistered);

  useFocusEffect(
    useCallback(() => {
      autoLoginHandler();
      return () => {};
    }, [])
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
