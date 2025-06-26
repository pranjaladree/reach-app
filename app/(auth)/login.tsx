import { baseUrl } from "@/constants/Urls";
import {
  setLoggedIn,
  setLoggedInUser,
  setMFARegister,
  setMFARequired,
  setTempAuthenticate,
  setTempToken,
} from "@/store/slices/user-slice";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { getProfile } from "@/http/profile-http";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userName, setUserName] = useState("GEH@admin");
  const [password, setPassword] = useState("Orbis@123");
  const [showPassword, setShowPassword] = useState(true);

  const userNameChangeHandler = (val: string) => {
    setUserName(val);
  };

  const passwordChangeHandler = (val: string) => {
    setPassword(val);
  };

  const getProfileHandler = async (token: string) => {
    const response = await getProfile(token);
    console.log("PROfile", response);
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

  const loginHandler = async () => {
    console.log("Login ...");
    const requestBody = {
      userId: userName,
      password: password,
    };
    console.log("Req", requestBody);
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestBody),
    });
    const resData = await res.json();
    console.log(resData);
    console.log("Status", res.status);
    if (res.status == 200) {
      const token = res.headers.get("Authorization");
      console.log("Token", token);
      if (!resData.isTotpRequired) {
        dispatch(setLoggedIn(token));
        if (token) {
          getProfileHandler(token);
        }
      } else {
        dispatch(setTempAuthenticate(true));
        if (!resData.isMfaSetUp) {
          dispatch(setMFARegister(false));
          dispatch(setTempToken(token));
        } else {
          dispatch(setMFARequired(true));
          dispatch(setMFARegister(true));
          dispatch(setTempToken(token));
        }
      }
      router.navigate("/");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={0}
    >
      <View style={styles.screen}>
        <View style={styles.imageBox}>
          <Image
            source={require("../../assets/images/reach_soft.png")}
            style={{
              width: 180,
              height: 120,
            }}
          />
        </View>
        <View style={styles.divider}></View>
        <View style={styles.headerBox}>
          <Text style={styles.loginTitle}>LOGIN</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={{ padding: 20 }}>
          <View style={styles.box}>
            <TextInput
              label="User Name"
              left={<TextInput.Icon icon="account" />}
              value={userName}
              onChangeText={userNameChangeHandler}
              mode="outlined"
            />
          </View>
          <View style={styles.box}>
            <TextInput
              label="Password"
              value={password}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              onChangeText={passwordChangeHandler}
              mode="outlined"
              secureTextEntry={showPassword}
            />
          </View>
          <View style={styles.actions}>
            <Button mode="contained" onPress={loginHandler}>
              LOGIN
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerBox: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginTitle: {
    fontSize: 22,
  },
  box: {
    marginTop: 10,
  },
  actions: {
    marginTop: 20,
  },
  divider: {
    marginTop: 20,
  },
});

export default LoginScreen;
