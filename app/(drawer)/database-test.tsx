import { findUserById } from "@/database/database";
import { dropTables } from "@/database/migrations-db";
import { getScreeningByIdFromDB } from "@/database/primary-screening-db";
import { findSchools } from "@/database/school-student-db";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, Button } from "react-native";

const DatabaseTest = () => {
  const db = useSQLiteContext();

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
    const response = await findUserById(db, "3");
    console.log("Schools", response);
  };

  return (
    <View>
      <Text>Local Database Testing</Text>
      <View>
        <Button title="Drop Tables" onPress={getSchoolData} />
      </View>
    </View>
  );
};

export default DatabaseTest;
