// import CustomDropdown from "@/components/utils/CustomDropdown";
// import {
//   BLANK_DROPDOWN_MODEL,
//   BLANK_SCHOOL_MODEL,
// } from "@/constants/BlankModels";
// import { ACTIVITY_TYPE_ITEMS } from "@/constants/Data";
// import { useState } from "react";
// import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
// import DateTimePicker, {
//   DateType,
//   useDefaultStyles,
// } from "react-native-ui-datepicker";
// import dayjs from "dayjs";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { getSchoolActivities } from "@/http/school-http";
// import { useSQLiteContext } from "expo-sqlite";
// import { insertBulkStudentsToDB, saveSchool } from "@/database/database";
// import { setSchools } from "@/store/slices/school-slice";
// import { getStudentBySchoolId } from "@/http/device-preparation-http";
// import { StudentModel } from "@/models/school/StudentModel";
// import { Button } from "react-native-paper";
// import { Dialog, Portal, PaperProvider } from "react-native-paper";
// import { DateSelector } from "@/components/new_UI/date-picker";

// const DevicePreparation = () => {
//   const token = useSelector((state: RootState) => state.userSlice.token);
//   const db = useSQLiteContext();
//   const dispatch = useDispatch();
//   const schools = useSelector((state: RootState) => state.schoolSlice.schools);
//   const [isSchoolLoading, setIsSchoolLoading] = useState(false);
//   const [isStudentLoading, setIsStudentLoading] = useState(false);
//   const [isSavingLoading, setIsSavingLoading] = useState(false);
//   const [visible, setVisible] = useState(false);

//   const showDialog = () => setVisible(true);

//   const hideDialog = () => setVisible(false);
//   const schoolItems = useSelector(
//     (state: RootState) => state.schoolSlice.schoolItems
//   );
//   const [selectedActivityType, setSelectedActivityType] =
//     useState(BLANK_DROPDOWN_MODEL);

//   const defaultStyles = useDefaultStyles();
//   const [selected, setSelected] = useState<DateType>();

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const selectActivityTypeHandler = (val?: string) => {
//     if (val == "") {
//       setSelectedActivityType(BLANK_DROPDOWN_MODEL);
//     } else {
//       const foundItem = ACTIVITY_TYPE_ITEMS.find((item) => item.value == val);
//       if (foundItem) {
//         setSelectedActivityType(foundItem);
//       }
//     }
//   };

//   const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);

//   const selectSchoolHandler = (val?: string) => {
//     if (val == "") {
//       setSelectedSchool(BLANK_DROPDOWN_MODEL);
//     } else {
//       const foundItem = schoolItems.find((item) => item.value == val);
//       if (foundItem) {
//         setSelectedSchool(foundItem);
//       }
//     }
//   };

//   const selectDateHandler = ({ date }: any) => {
//     console.log(date);
//     setSelected(date);
//     setIsModalOpen(false);
//   };

//   const getSchoolListHandler = async () => {
//     setIsSchoolLoading(true);
//     const response = await getSchoolActivities(
//       token,
//       dayjs(selected).format("YYYY-MM-DD"),
//       selectedActivityType.value
//     );
//     console.log("RESPOSNE", response);
//     if (response) {
//       dispatch(setSchools(response));
//     }
//     setIsSchoolLoading(false);
//   };

//   const [preparedSchool, setPreparedSchool] = useState(BLANK_SCHOOL_MODEL);
//   const [students, setStudents] = useState<StudentModel[]>([]);

//   const devicePreparationHandler = async () => {
//     setIsStudentLoading(true);
//     try {
//       const response = await getStudentBySchoolId(token, selectedSchool.id);
//       setStudents(response.students);

//       const foundSchool = schools.find((item) => item.id == +selectedSchool.id);
//       console.log("Found SCCCHHHOOL", foundSchool);
//       if (foundSchool) {
//         setPreparedSchool(foundSchool);
//       }
//     } catch (e) {
//       console.log("Something went wrong", e);
//     } finally {
//       setIsStudentLoading(false);
//     }
//   };

//   const saveStudentsHandler = async () => {
//     setIsSavingLoading(true);
//     const schoolResponse = await saveSchool(db, preparedSchool);
//     console.log("SCHOOL", schoolResponse);

//     const response = await insertBulkStudentsToDB(db, students);
//     console.log("Response", response);
//     setIsSavingLoading(false);
//     if (response) {
//       showDialog();
//     }
//   };

//   return (
//     <View style={styles.screen}>
//       <Text style={styles.headerTitle}>Device Preparation</Text>

//       <View>
//         <CustomDropdown
//           label="Activity Type"
//           items={[BLANK_DROPDOWN_MODEL, ...ACTIVITY_TYPE_ITEMS]}
//           selectedItem={selectedActivityType}
//           onChange={selectActivityTypeHandler}
//         />
//       </View>
//       <View style={styles.row}>
//         <DateSelector
//           selected={selected}
//           onOpen={() => {
//             setIsModalOpen(true);
//           }}
//         />
//         <View style={styles.rowItem}>
//           <Button
//             onPress={getSchoolListHandler}
//             mode="contained"
//             loading={isSchoolLoading}
//             style={{ paddingVertical: 5, marginLeft: 10, borderRadius: 30 }}
//           >
//             Get School
//           </Button>
//         </View>
//       </View>

//       <View>
//         <View style={styles.box}>
//           <CustomDropdown
//             label="School"
//             items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
//             selectedItem={selectedSchool}
//             onChange={selectSchoolHandler}
//           />
//         </View>
//         <View style={styles.box}>
//           <Button
//             onPress={devicePreparationHandler}
//             mode="contained"
//             loading={isStudentLoading}
//             style={{
//               paddingVertical: 5,
//               marginHorizontal: 10,
//               borderRadius: 30,
//             }}
//           >
//             Get Student Data
//           </Button>
//         </View>
//         <View style={{ paddingTop: 20 }}>
//           <View style={styles.summary}>
//             <View style={styles.card}>
//               <Text
//                 style={{
//                   marginTop: 5,
//                   color: "#626161",
//                   fontSize: 16,
//                   fontWeight: 400,
//                 }}
//               >
//                 No of Students Record Found: {students.length}
//               </Text>
//             </View>

//             <Button
//               onPress={saveStudentsHandler}
//               mode="contained"
//               loading={isSavingLoading}
//               style={{
//                 paddingVertical: 5,
//                 borderRadius: 30,
//                 marginTop: 20,
//                 width: "100%",
//               }}
//             >
//               Save Records On Device
//             </Button>
//           </View>
//         </View>
//       </View>
//       {/* Calendar View */}
//       <Modal visible={isModalOpen}>
//         <DateTimePicker
//           mode="single"
//           date={selected}
//           onChange={selectDateHandler}
//           styles={defaultStyles}
//         />
//       </Modal>
//       <Portal>
//         <Dialog visible={visible} onDismiss={hideDialog}>
//           <Dialog.Title>Alert</Dialog.Title>
//           <Dialog.Content>
//             <Text>Student Saved Successfully</Text>
//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button onPress={hideDialog}>Done</Button>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerTitle: {
//     fontSize: 18,
//     padding: 5,
//     paddingHorizontal: 12,
//     fontWeight: "bold",
//   },
//   screen: {
//     padding: 5,
//   },
//   row: {
//     flexDirection: "row",
//     width: "100%",
//     alignItems: "center",
//     marginTop: 10,
//     paddingHorizontal: 15,
//     justifyContent: "space-between",
//   },
//   rowItem: {
//     flexBasis: 1,
//     flexGrow: 1,
//     margin: 5,
//     paddingLeft: 10,
//   },
//   box: {
//     marginTop: 10,
//   },
//   date: {
//     borderWidth: 0.2,
//     padding: 10,
//   },
//   summary: {
//     borderWidth: 0.2,
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   count: {
//     fontSize: 30,
//     fontWeight: "bold",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     width: "100%",
//   },
// });

// export default DevicePreparation;

import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import {
  BLANK_DROPDOWN_MODEL,
  BLANK_SCHOOL_MODEL,
} from "@/constants/BlankModels";
import { ACTIVITY_TYPE_ITEMS } from "@/constants/Data";
import { insertBulkStudentsToDB, saveSchool } from "@/database/database";
import { getStudentBySchoolId } from "@/http/device-preparation-http";
import { getSchoolActivities } from "@/http/school-http";
import { StudentModel } from "@/models/school/StudentModel";
import { setSchools } from "@/store/slices/school-slice";
import { RootState } from "@/store/store";
import { useSQLiteContext } from "expo-sqlite";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import StyledDropdown from "@/components/new_UI/StyledDropdown";

const DevicePreparation = () => {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  const token = useSelector((state: RootState) => state.userSlice.token);
  const schoolItems = useSelector(
    (state: RootState) => state.schoolSlice.schoolItems
  );
  const schools = useSelector((state: RootState) => state.schoolSlice.schools);

  const [selectedActivityType, setSelectedActivityType] =
    useState(BLANK_DROPDOWN_MODEL);
  const [selected, setSelected] = useState<DateType>();
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);
  const [preparedSchool, setPreparedSchool] = useState(BLANK_SCHOOL_MODEL);
  const [students, setStudents] = useState<StudentModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSchoolLoading, setIsSchoolLoading] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(false);
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const defaultStyles = useDefaultStyles();
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const selectActivityTypeHandler = (val?: string) => {
    if (!val) return setSelectedActivityType(BLANK_DROPDOWN_MODEL);
    const found = ACTIVITY_TYPE_ITEMS.find((item) => item.value === val);
    if (found) setSelectedActivityType(found);
  };

  const selectSchoolHandler = (val?: string) => {
    if (!val) return setSelectedSchool(BLANK_DROPDOWN_MODEL);
    const found = schoolItems.find((item) => item.value === val);
    if (found) setSelectedSchool(found);
  };

  const selectDateHandler = ({ date }: any) => {
    setSelected(date);
    setIsModalOpen(false);
  };

  const getSchoolListHandler = async () => {
    if (!selected || !selectedActivityType.value) return;
    setIsSchoolLoading(true);
    const res = await getSchoolActivities(
      token,
      dayjs(selected).format("YYYY-MM-DD"),
      selectedActivityType.value
    );
    if (res) dispatch(setSchools(res));
    setIsSchoolLoading(false);
  };

  const devicePreparationHandler = async () => {
    setIsStudentLoading(true);
    try {
      const res = await getStudentBySchoolId(token, selectedSchool.id);
      setStudents(res.students);
      const foundSchool = schools.find((s) => s.id === +selectedSchool.id);
      if (foundSchool) setPreparedSchool(foundSchool);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsStudentLoading(false);
    }
  };

  const saveStudentsHandler = async () => {
    setIsSavingLoading(true);
    await saveSchool(db, preparedSchool);
    const res = await insertBulkStudentsToDB(db, students);
    setIsSavingLoading(false);
    if (res) showDialog();
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {/* <Text style={styles.title}>Device Preparation</Text> */}

      {/* Activity Type Dropdown */}
      <StyledDropdown
        label="Activity Type"
        items={[BLANK_DROPDOWN_MODEL, ...ACTIVITY_TYPE_ITEMS]}
        selectedItem={selectedActivityType}
        onChange={selectActivityTypeHandler}
      />

      {/* Date + Get School Row */}
      <View style={styles.row}>
        <View style={styles.dateBox}>
          <Pressable
            onPress={() => setIsModalOpen(true)}
            style={styles.dateField}
          >
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>
              {selected ? dayjs(selected).format("DD-MM-YYYY") : "Select Date"}
            </Text>
          </Pressable>
        </View>
        <Button
          onPress={getSchoolListHandler}
          mode="contained"
          icon="check-circle"
          loading={isSchoolLoading}
          style={styles.getSchoolButton}
          contentStyle={styles.iconRight}
        >
          Get School
        </Button>
      </View>

      {/* Boxed Section for School to Save */}
      <View style={styles.cardBox}>
        {/* School Dropdown */}
        <StyledDropdown
          label="Select School"
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
        />
        {/* Get Student Button */}
        <Button
          onPress={devicePreparationHandler}
          mode="contained"
          icon="check-circle"
          loading={isStudentLoading}
          style={styles.fullButton}
          contentStyle={styles.iconRight}
        >
          Get Student Data
        </Button>

        {/* Student Count Text */}
        <Text style={styles.studentText}>
          No of Students Record Found : {students.length}
        </Text>

        {/* Save Button */}
        <Button
          onPress={saveStudentsHandler}
          mode="contained"
          icon="download"
          loading={isSavingLoading}
          style={styles.fullButton}
          contentStyle={styles.iconRight}
        >
          Save Data on Device
        </Button>
      </View>

      {/* Date Picker Modal */}
      <Modal visible={isModalOpen}>
        <DateTimePicker
          mode="single"
          date={selected}
          onChange={selectDateHandler}
          styles={defaultStyles}
        />
      </Modal>

      {/* Success Dialog */}
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
    </ScrollView>
  );
};

export default DevicePreparation;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003087",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dateBox: {
    flex: 1,
    marginRight: 10,
  },
  dateField: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#004aad",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dateIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
  },
  getSchoolButton: {
    borderRadius: 6,
    backgroundColor: "#004aad",
    height: 48,
    justifyContent: "center",
  },
  cardBox: {
    borderColor: "#004aad",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 15,
  },
  fullButton: {
    backgroundColor: "#005BBB",
    borderRadius: 6,
    height: 48,
    marginTop: 15,
    justifyContent: "center",
  },
  studentText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
    color: "#003087",
    paddingVertical: 10,
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  iconRight: {
    flexDirection: "row-reverse",
  },
});
