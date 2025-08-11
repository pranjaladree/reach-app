import { getProfile } from "@/http/profile-http";
import { setLoggedIn, setLoggedInUser } from "@/store/slices/user-slice";
import { RootState } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = () => {
  const [loading, setLoading] = useState(true);
  const db = useSQLiteContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isAuthenticated
  );
  const isTempAuthenticated = useSelector(
    (state: RootState) => state.userSlice.isTempAuthenticated
  );
  const userId = useSelector((state: RootState) => state.userSlice.userId);
  console.log("User Id", userId);
  const dispatch = useDispatch();
  const isMFARegistered = useSelector(
    (state: RootState) => state.userSlice.isMFARegistered
  );

  const getProfileHandler = async (token: string, userId: string) => {
    if (token == "OFFLINE_TOKEN") {
      console.log("Autologin OFFLINE ....", userId);
      const response: any = await db.getFirstAsync(
        `SELECT * FROM users WHERE id="${userId}"`
      );
      console.log("res AAA", response);
      if (response) {
        let fullName;
        if (response.firstName) {
          fullName = response.firstName;
        }
        if (response.middleName) {
          fullName += " " + response.middleName;
        }
        if (response.lastName) {
          fullName += " " + response.lastName;
        }
        console.log("FULL NAME &&&&&&&&&&&", fullName);

        dispatch(
          setLoggedInUser({
            userId: response.id,
            fullName: fullName,
            partnerId: "",
            userType: "PARTNER_USER",
            partnerName: "",
            isUserAgreement: response.isUserAgreement,
            isPartnerAgreement: response.isPartnerAgreement,
            designation: response.designation,
          })
        );
      }
    } else {
      console.log("Autologin ONLINE ....");
      try {
        const response = await getProfile(token);
        console.log("RESPONSE", response);
        dispatch(
          setLoggedInUser({
            userId: response.data.id,
            fullName: response.data.fullName,
            partnerId: response.data.partnerId,
            userType: response.data.userType,
            partnerName: response.data.partnerName,
            isUserAgreement: response.data.isUserAgreement,
            isPartnerAgreement: response.data.isPartnerAgreement,
            designation: response.data.designation,
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  const autoLoginHandler = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const expiry = await AsyncStorage.getItem("expiry");
      const userId = await AsyncStorage.getItem("userId");
      if (token !== null && expiry !== null && userId) {
        // value previously stored
        if (new Date().getTime() < +expiry) {
          dispatch(setLoggedIn(token));
          await getProfileHandler(token, userId);
        }
      }
    } catch (e) {
      console.log(e);
      // error reading value
    } finally {
      setLoading(false);
      console.log(loading, "loading");
    }
  };

  useFocusEffect(
    useCallback(() => {
      autoLoginHandler();
      return () => {};
    }, [])
  );

  if (loading) {
    return null;
  }

  if (!isAuthenticated && !isTempAuthenticated) {
    return <Redirect href="/login" />;
  }

  // if (isTempAuthenticated && !isMFARegistered) {
  //   return <Redirect href="/(auth)/register-mfa" />;
  // }

  return <Redirect href="/(drawer)" />;
};

export default AuthContext;
