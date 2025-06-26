import {
  dropTables,
  getSchoolsFromDB,
  getScreeningByIdFromDB,
} from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, Button } from "react-native";

const DatabaseTest = () => {
  const db = useSQLiteContext();

  const dropTablesHandler = () => {
    // const response = db.runSync(`DROP TABLE spectacleBooking`);
    // console.log("REDF", response);
    dropTables(db);
  };
  const getStudentData = async () => {
    const response = await getScreeningByIdFromDB(db, 523);
    console.log("Response", response);
  };

  const getSchoolData = async () => {
    const response = await getSchoolsFromDB(db);
    console.log("Schools", response);
  };

  return (
    <View>
      <Text>Local Database Testing</Text>
      <View>
        <Button title="Drop Tables" onPress={dropTablesHandler} />
      </View>
    </View>
  );
};

export default DatabaseTest;
