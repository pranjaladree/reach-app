import { findUserById } from "@/database/database";
import { dropTables } from "@/database/migrations-db";
import { getScreeningByIdFromDB } from "@/database/primary-screening-db";
import { findSchools } from "@/database/school-student-db";
import { getProfile } from "@/http/profile-http";
import { RootState } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";

const DatabaseTest = () => {
  const db = useSQLiteContext();
  const userId = useSelector((state: RootState) => state.userSlice.userId);

  const dropTablesHandler = () => {
    try {
      const response = db.getAllSync(`SELECT * FROM colorVisionConfigs`);
      console.log("RESSSS *******", response);
    } catch (err) {
      console.log(err);
    }
    // console.log("REDF", response);
    // dropTables(db);
  };
  const getStudentData = async () => {
    const response = await getScreeningByIdFromDB(db, 523);
    console.log("Response", response);
  };

  const getSchoolData = async () => {
    const resToken = await AsyncStorage.getItem("token");
    // const response = await findSchools(db);
    const response = await findUserById(db, userId);
    console.log("Schools", response);
  };

  return (
    <View>
      <Text>Local Database Testing</Text>
      <View>
        <Button title="Profile data" onPress={getSchoolData} />
      </View>
    </View>
  );
};

export default DatabaseTest;
