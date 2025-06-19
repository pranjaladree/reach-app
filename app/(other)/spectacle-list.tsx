import SpecStudentItem from "@/components/list-items/SpecStudentItem";
import InputBox from "@/components/ui/InputBox";
import {
  getSpecStudentsBySchoolId,
  saveSpecBooking,
} from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { useSelector } from "react-redux";

const SpectacleList = () => {
  const router = useRouter();
  const db = useSQLiteContext();
  const { schoolId } = useLocalSearchParams();
  const [studentList, setStudentList] = useState<any[]>([]);
  const filteredStudents = useSelector(
    (state: RootState) => state.studentSlice.filteredStudents
  );
  console.log("Filter Students", filteredStudents.length);
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermChangeHandler = (val: string) => {
    setSearchTerm(val);
  };

  const [diaglogMessage, setDialogMessage] = useState("");

  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = (id: string) => {
    setSelectedStudentId(id);
    setVisible(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  const saveBookingHandler = async () => {
    setIsLoading(true);
    const response = await saveSpecBooking(db, selectedStudentId);
    console.log(response);
    if (response) {
      setVisible(false);
    }
    setIsLoading(false);
    getStudents();
  };

  const getStudents = async () => {
    console.log("GETTING Students....");
    if (schoolId) {
      const response: any = await getSpecStudentsBySchoolId(
        db,
        schoolId?.toString()
      );
      console.log("RESPONS", response);
      if (response) {
        setStudentList(response);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getStudents();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <View>
      <View>
        <View>
          <Text>Total Student:</Text>
          <Text>Done:</Text>
          <Text>Not Done :</Text>
        </View>
        <View>
          <InputBox
            value={searchTerm}
            placeholder="Search Student"
            onChangeText={searchTermChangeHandler}
          />
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <FlatList
          data={studentList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SpecStudentItem
              item={item}
              onPress={showDialog.bind(this, item.id)}
            />
          )}
        />
      </View>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
        >
          <Dialog.Title>{selectedStudentId}</Dialog.Title>
          <Dialog.Content>
            <Text>Book Spectacle</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={saveBookingHandler}
              loading={isLoading}
              mode="contained"
            >
              Book Now
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default SpectacleList;
