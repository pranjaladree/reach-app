import CustomButton from "@/components/utils/CustomButton";
import { baseUrl } from "@/constants/Urls";
import { getProfile } from "@/http/profile-http";
import {
  setLoggedIn,
  setLoggedInUser,
  setMFARegister,
  setMFARequired,
  setTempAuthenticate,
  setTempToken,
} from "@/store/slices/user-slice";
import NetInfo from "@react-native-community/netinfo";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import bcrypt from "react-native-bcrypt";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import CustomNotification from "@/components/utils/CustomNotification";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isNotification, setIsNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const openNotificationHandler = () => {
    setIsNotification(true);
  };

  const closeNotificationHandler = () => {
    setIsNotification(false);
  };

  const userNameChangeHandler = (val: string) => {
    setUserName(val);
  };

  const passwordChangeHandler = (val: string) => {
    setPassword(val);
  };

  const getProfileHandler = async (token: string) => {
    const response = await getProfile(token);
    console.log("PROFILE RESPONSE **************************", response);
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
  };

  const [isOnline, setIsOnline] = useState(false);

  const saveSessionData = async (token: string, expiry: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("expiry", expiry);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  const loginOfflineHandler = async () => {
    setIsLoading(true);
    try {
      const response: any = await db.getFirstAsync(
        `SELECT * FROM users WHERE userName="${userName}" COLLATE NOCASE`
      );
      console.log(userName);
      if (response) {
        const isLoggedIn = bcrypt.compareSync(password, response.password);
        if (isLoggedIn) {
          dispatch(setLoggedIn("OFFLINE_TOKEN"));
          setLoggedInUser({
            userId: response.id,
            fullName: response.firstName,
            partnerId: "",
            userType: "PARTNER_USER",
            partnerName: "",
            isUserAgreement: response.isUserAgreement,
            isPartnerAgreement: response.isPartnerAgreement,
          });
          let epochTime = new Date().getTime() + 86400000;
          saveSessionData("OFFLINE_TOKEN", epochTime?.toString());
          router.navigate("/");
          //Login Success
        } else {
          // Login Failed
          setIsNotification(true);
          setNotificationMessage("Invalid Password !");
          setVariant("error");
        }
      } else {
        setIsNotification(true);
        setNotificationMessage("User Not Found !");
        setVariant("error");
      }
    } catch (err) {
      setIsNotification(true);
      setNotificationMessage("Failed to Login !");
      setVariant("error");
      console.log(err);
    }
    setIsLoading(false);
  };

  const loginOnlineHandler = async () => {
    setIsLoading(true);
    console.log("Login online ...");
    const requestBody = {
      userId: userName,
      password: password,
    };
    try {
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
      if (res.status == 200) {
        const token = res.headers.get("Authorization");
        console.log("Token", token);
        if (!resData.isTotpRequired) {
          dispatch(setLoggedIn(token));
          if (token) {
            let epochTime = new Date().getTime() + 86400000;
            saveSessionData(token, epochTime?.toString());
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
      } else {
        if (resData.error) {
          setIsNotification(true);
          setNotificationMessage("User Not Found !");
          setVariant("error");
        } else {
          setIsNotification(true);
          setNotificationMessage("Invalid Password !");
          setVariant("error");
        }
        console.log("Failed to login");
      }
    } catch (err) {
      setIsNotification(true);
      setNotificationMessage(`ERROR ! ${err}`);
      setVariant("error");
    }
    setIsLoading(false);
  };

  const loginHandler = async () => {
    console.log("LOGIN ************");
    if (isOnline) {
      loginOnlineHandler();
    } else {
      loginOfflineHandler();
    }
  };

  const checkInternetHandler = async () => {
    NetInfo.fetch().then((state) => {
      console.log("Is connected?", state.isConnected);
      if (state.isConnected) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      checkInternetHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={0}
    >
      <View style={styles.screen}>
        <View style={styles.imageBox}>
          <Image
            source={require("../../assets/images/reach_logo.png")}
            style={{
              width: 230,
              height: 130,
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
            <CustomButton
              title="LOGIN"
              onPress={loginHandler}
              isLoading={isLoading}
              disabled={isLoading}
              icon={
                <Ionicons name="lock-open-outline" size={20} color="#ffffff" />
              }
            />
          </View>
        </View>
      </View>
      {/* Notification */}
      <CustomNotification
        visible={isNotification}
        onClose={closeNotificationHandler}
        message={notificationMessage}
        variant={variant}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
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
    fontWeight: "bold",
    color: Colors.primary,
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
