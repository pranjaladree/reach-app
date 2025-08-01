import CustomButton from "@/components/utils/CustomButton";
import { saveQRData } from "@/database/database";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ViewQRStudent = () => {
  const { data } = useLocalSearchParams();
  const db = useSQLiteContext();
  const router = useRouter();

  const [studentData, setStudentData] = useState<any>();

  const saveStudentHandler = async () => {
    const response: any = await saveQRData(db, data);
    if (response) {
      router.push({
        pathname: "/mr-tag-detail",
        params: {
          studentId: studentData?.id,
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      setStudentData(JSON.parse(data.toString()));
    }
  }, [data]);

  return (
    <View style={styles.screen}>
      <View>
        <View style={{ padding: 5 }}>
          <Text>Student ID : {studentData?.studentId}</Text>
        </View>
        <View style={{ padding: 5 }}>
          <Text>
            Student Name : {studentData?.firstName} {studentData?.lastName}
          </Text>
        </View>
        <View style={{ padding: 5 }}>
          <Text>Class : {studentData?.class}</Text>
        </View>
        <View style={{ padding: 5 }}>
          <Text>PS Status : {studentData?.psStatus}</Text>
        </View>
        <View style={{ padding: 5 }}>
          <Text>Referral Reason : {studentData?.referralReason}</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <CustomButton
          title="Detailed Evaluation"
          onPress={saveStudentHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
});

export default ViewQRStudent;
