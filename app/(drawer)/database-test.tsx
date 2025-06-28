import AppButton from "@/components/new_UI/AppButton";
import { Colors } from "@/constants/Colors";
import {
  dropTables,
  getSchoolsFromDB,
  getScreeningByIdFromDB,
} from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Text, View } from "react-native";

const DatabaseTest = () => {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = useState(false);

  const dropTablesHandler = async () => {
    // const response = db.runSync(`DROP TABLE spectacleBooking`);
    // console.log("REDF", response);

    try {
      await dropTables(db);

    } catch (error) {
      console.error("Error dropping tables:", error);
    } finally {
      console.log("Tables dropped successfully");
      setIsLoading(true);
    }
  };
  const getStudentData = async () => {
    try {
      const response = await getScreeningByIdFromDB(db, 523);
      console.log("Response", response);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const getSchoolData = async () => {
    try {
      const response = await getSchoolsFromDB(db);
      console.log("Schools", response);
    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  };

  return (
    <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
      <Text>Local Database Testing</Text>
      <View style={{ marginVertical: 10 }}>
        {/* <Button title="Drop Tables" onPress={dropTablesHandler} /> */}
        <AppButton
          title="Drop Tables"
          onPress={dropTablesHandler}
          loading={isLoading}
          disabled={isLoading}
          style={{
            borderRadius: 0,
            backgroundColor: isLoading ? "#ccc" : Colors.primary,
          }}
        />
      </View>
    </View>
  );
};

export default DatabaseTest;
