import CustomDropdown from "@/components/utils/CustomDropdown";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_SCHOOL_MODEL,
} from "@/constants/BlankModels";
import { ACTIVITY_TYPE_ITEMS } from "@/constants/Data";
import { useState } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSchoolActivities } from "@/http/school-http";
import { useSQLiteContext } from "expo-sqlite";
import { insertBulkStudentsToDB, saveSchool } from "@/database/database";
import { setSchools } from "@/store/slices/school-slice";
import { getStudentBySchoolId } from "@/http/device-preparation-http";
import { StudentModel } from "@/models/school/StudentModel";
import { Button } from "react-native-paper";
import { Dialog, Portal, PaperProvider } from "react-native-paper";
import { DateSelector } from "@/components/new_UI/date-picker";

const DevicePreparation = () => {
  const token = useSelector((state: RootState) => state.userSlice.token);
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const schools = useSelector((state: RootState) => state.schoolSlice.schools);
  const [isSchoolLoading, setIsSchoolLoading] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(false);
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const schoolItems = useSelector(
    (state: RootState) => state.schoolSlice.schoolItems
  );
  const [selectedActivityType, setSelectedActivityType] =
    useState(BLANK_DROPDOWN_MODEL);

  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectActivityTypeHandler = (val?: string) => {
    if (val == "") {
      setSelectedActivityType(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = ACTIVITY_TYPE_ITEMS.find((item) => item.value == val);
      if (foundItem) {
        setSelectedActivityType(foundItem);
      }
    }
  };

  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);

  const selectSchoolHandler = (val?: string) => {
    if (val == "") {
      setSelectedSchool(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = schoolItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedSchool(foundItem);
      }
    }
  };

  const selectDateHandler = ({ date }: any) => {
    console.log(date);
    setSelected(date);
    setIsModalOpen(false);
  };

  const getSchoolListHandler = async () => {
    setIsSchoolLoading(true);
    const response = await getSchoolActivities(
      token,
      dayjs(selected).format("YYYY-MM-DD"),
      selectedActivityType.value
    );
    console.log("RESPOSNE", response);
    if (response) {
      dispatch(setSchools(response));
    }
    setIsSchoolLoading(false);
  };

  const [preparedSchool, setPreparedSchool] = useState(BLANK_SCHOOL_MODEL);
  const [students, setStudents] = useState<StudentModel[]>([]);

  const devicePreparationHandler = async () => {
    setIsStudentLoading(true);
    try {
      const response = await getStudentBySchoolId(token, selectedSchool.id);
      setStudents(response.students);

      const foundSchool = schools.find((item) => item.id == +selectedSchool.id);
      console.log("Found SCCCHHHOOL", foundSchool);
      if (foundSchool) {
        setPreparedSchool(foundSchool);
      }
    } catch (e) {
      console.log("Something went wrong", e);
    } finally {
      setIsStudentLoading(false);
    }
  };

  const saveStudentsHandler = async () => {
    setIsSavingLoading(true);
    const schoolResponse = await saveSchool(db, preparedSchool);
    console.log("SCHOOL", schoolResponse);

    const response = await insertBulkStudentsToDB(db, students);
    console.log("Response", response);
    setIsSavingLoading(false);
    if (response) {
      showDialog();
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>Device Preparation</Text>

      <View>
        <CustomDropdown
          label="Activity Type"
          items={[BLANK_DROPDOWN_MODEL, ...ACTIVITY_TYPE_ITEMS]}
          selectedItem={selectedActivityType}
          onChange={selectActivityTypeHandler}
        />
      </View>
      <View style={styles.row}>
        <DateSelector
          selected={selected}
          onOpen={() => {
            setIsModalOpen(true);
          }}
        />
        <View style={styles.rowItem}>
          <Button
            onPress={getSchoolListHandler}
            mode="contained"
            loading={isSchoolLoading}
            style={{ paddingVertical: 5, marginLeft: 10, borderRadius: 30 }}
          >
            Get School
          </Button>
        </View>
      </View>

      <View>
        <View style={styles.box}>
          <CustomDropdown
            label="School"
            items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
            selectedItem={selectedSchool}
            onChange={selectSchoolHandler}
          />
        </View>
        <View style={styles.box}>
          <Button
            onPress={devicePreparationHandler}
            mode="contained"
            loading={isStudentLoading}
            style={{
              paddingVertical: 5,
              marginHorizontal: 10,
              borderRadius: 30,
            }}
          >
            Get Student Data
          </Button>
        </View>
        <View style={{ paddingTop: 20 }}>
          <View style={styles.summary}>
            <View style={styles.card}>
              <Text
                style={{
                  marginTop: 5,
                  color: "#626161",
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                No of Students Record Found: {students.length}
              </Text>
            </View>

            <Button
              onPress={saveStudentsHandler}
              mode="contained"
              loading={isSavingLoading}
              style={{
                paddingVertical: 5,
                borderRadius: 30,
                marginTop: 20,
                width: "100%",
              }}
            >
              Save Records On Device
            </Button>
          </View>
        </View>
      </View>
      {/* Calendar View */}
      <Modal visible={isModalOpen}>
        <DateTimePicker
          mode="single"
          date={selected}
          onChange={selectDateHandler}
          styles={defaultStyles}
        />
      </Modal>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>Student Saved Successfully</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    padding: 5,
    paddingHorizontal: 12,
    fontWeight: "bold",
  },
  screen: {
    padding: 5,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
    margin: 5,
    paddingLeft: 10,
  },
  box: {
    marginTop: 10,
  },
  date: {
    borderWidth: 0.2,
    padding: 10,
  },
  summary: {
    borderWidth: 0.2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 30,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
  },
});

export default DevicePreparation;
