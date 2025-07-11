import CustomDropdown from "@/components/utils/CustomDropdown";
import CustomRadioGroup from "@/components/utils/CustomRadioGroup";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_STUDENT_MODEL,
} from "@/constants/BlankModels";
import { GENDER_RADIO_ITEMS, RELATIONS_DROPDOWN_ITEMS } from "@/constants/Data";
import {
  findAllClasses,
  findStudentById,
  getSchoolsDropdownFromDB,
  saveNewStudent,
  updateStudent,
} from "@/database/database";
import { ClassModel } from "@/models/other-masters/ClassModel";
import { StudentModel } from "@/models/school/StudentModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { nanoid } from "nanoid/non-secure";
import CustomInput from "@/components/utils/CustomInput";
import CustomButton from "@/components/utils/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import StyledDropdown from "@/components/new_UI/StyledDropdown";

const updateStudentScreen = () => {
  const db = useSQLiteContext();
  const { studentId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const [classItems, setClassItems] = useState<DropdownModel[]>([]);
  const [specialNeedItems, setSpecialNeedItems] = useState<DropdownModel[]>([]);
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);
  const [schoolHasError, setSchoolHasError] = useState(false);
  const [schoolErrorMessage, setSchoolErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedClass, setSelectedClass] = useState(BLANK_DROPDOWN_MODEL);
  const [section, setSection] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [relation, setRelation] = useState(BLANK_DROPDOWN_MODEL);
  const [nextOfKin, setNextOfKin] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [relationshipWithStudent, setRelationshipWithStudent] = useState("");
  const [specialNeed, setSpecialNeed] = useState(BLANK_DROPDOWN_MODEL);

  const [firstNameHasError, setFirstNameHasError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

  const [classHasError, setClassHasError] = useState(false);
  const [classErrorMessage, setClassErrorMessage] = useState("");

  const [genderHasError, setGenderHasError] = useState(false);
  const [genderErrorMessage, setGenderErrorMessage] = useState("");
  const [ageHasError, setAgeHasError] = useState(false);
  const [ageErrorMessage, setAgeErrorMessage] = useState("");

  const [rollNoHasError, setRollNoHasError] = useState(false);
  const [rollNoErrorMessage, setRollNoErrorMessage] = useState("");

  const selectSchoolHandler = (val?: string) => {
    if (val == "SELECT") {
      setSelectedSchool(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = schoolItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedSchool(foundItem);
      }
    }
  };

  const firstNameChangeHandler = (val: string) => {
    setFirstName(val);
  };

  const middleNameChangeHandler = (val: string) => {
    setMiddleName(val);
  };

  const lastNameChangeHandler = (val: string) => {
    setLastName(val);
  };

  const selectClassHandler = (val?: string) => {
    if (val == "SELECT") {
      setSelectedClass(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = classItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedClass(foundItem);
      }
    }
  };

  const sectionChangeHandler = (val: string) => {
    setSection(val);
  };

  const genderChangeHandler = (val: string) => {
    setGender(val);
  };

  const ageChangeHandler = (val: string) => {
    setAge(val);
  };

  const rollNoChangeHandler = (val: string) => {
    setRollNo(val);
  };

  const selectRelationHandler = (val?: string) => {
    if (val == "SELECT") {
      setRelation(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = RELATIONS_DROPDOWN_ITEMS.find(
        (item) => item.value == val
      );
      if (foundItem) {
        setRelation(foundItem);
      }
    }
  };

  const nextOfKinChangeHandler = (val: string) => {
    setNextOfKin(val);
  };

  const contactNoChangeHandler = (val: string) => {
    setContactNo(val);
  };

  const relationshipWithStudentChangeHandler = (val: string) => {
    setRelationshipWithStudent(val);
  };

  const selectSpecialNeedHandler = (val?: string) => {
    if (val == "SELECT") {
      setSpecialNeed(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = specialNeedItems.find((item) => item.value == val);
      if (foundItem) {
        setSpecialNeed(foundItem);
      }
    }
  };

  const getSchoolsHandler = async () => {
    const response = await getSchoolsDropdownFromDB(db);
    if (response) {
      setSchoolItems(response);
    }
  };

  const getClassesHandler = async () => {
    const response = await findAllClasses(db);
    if (response) {
      setClasses(response);
    }
  };

  const fieldValidator = () => {
    // check if duplicate
    let isValid = true;
    if (selectedSchool.value == "SELECT") {
      isValid = false;
      setSchoolHasError(true);
      setSchoolErrorMessage("Please select school !");
    }
    if (firstName == "") {
      isValid = false;
      setFirstNameHasError(true);
      setFirstNameErrorMessage("Please enter first name !");
    }
    if (rollNo == "") {
      isValid = false;
      setRollNoHasError(true);
      setRollNoErrorMessage("Please enter roll No !");
    }
    if (selectedClass.id == "0") {
      isValid = false;
      setClassHasError(true);
      setClassErrorMessage("Please select a class");
    }
    if (gender == "") {
      isValid = false;
      setGenderHasError(true);
      setGenderErrorMessage("Please select a gender !");
    }
    if (age == "") {
      isValid = false;
      setGenderHasError(true);
      setGenderErrorMessage("Please select gender");
    }
    try {
      const response = db.getFirstSync(
        "SELECT  * FROM students WHERE schoolId=? rollNo = ? AND classId = ? AND section = ?;",
        [selectedSchool.id, rollNo, selectedClass.id, section]
      );
      console.log("RS", response);
      if (response) {
        setDialogMessage("Failed to add student! Duplicate Student");
        showDialog();
        isValid = false;
      }
    } catch (err) {
      console.log(err);
    }
    return isValid;
  };

  const addStudentHandler = async () => {
    if (!fieldValidator()) {
      return;
    }
    const response = await updateStudent(
      db,
      new StudentModel({
        id: studentId.toString(),
        studentId: studentId.toString(),
        tempId: studentId.toString(),
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        classId: selectedClass.id,
        classTitle: selectedClass.value,
        section: section,
        rollNo: rollNo,
        gender: gender,
        age: age,
        dob: "",
        relation: relation.id == "0" ? "" : relation.value,
        nextOfKin: nextOfKin,
        specialNeed: specialNeed.id == "0" ? "" : specialNeed.value,
        session: "",
        contactPersonName: "",
        contactPersonMobileNo: "",
        relationshipWithStudent: "",
        schoolId: +selectedSchool.id,
        schoolName: selectedSchool.value,
        isActive: "",
        psStatus: "",
        isMarkForQC: false,
        mrNo: "",
        facilityType: "",
        facilityName: "",
        isUpdated: true,
        targetGroup: "",
        lastPSStatus: "",
        lastReasonForReferral: "",
        lastReportDate: "",
        lastSpectacleStatus: "",
        lastAnySurgeryDone: "",
      })
    );
    if (response) {
      setDialogMessage("Student Updated !");
      showDialog();
    }
  };

  useEffect(() => {
    if (classes) {
      let arr: DropdownModel[] = [];
      classes.map((item) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
          })
        );
      });
      setClassItems(arr);
    }
  }, [classes]);

  const [studentItem, setStudentItem] = useState<any>();

  const getExistingData = async () => {
    const response = await findStudentById(db, studentId.toString());
    console.log("RESSSSPOO  *******", response);
    if (response) {
      setStudentItem(response);
    }
  };

  useEffect(() => {
    if (studentItem) {
      setFirstName(studentItem.firstName);
      setMiddleName(studentItem.middleName);
      setLastName(studentItem.lastName);
      setAge(studentItem.age);
      setGender(studentItem.gender?.toUpperCase());
      setRollNo(studentItem.rollNo);
      setSection(studentItem.section);
      setNextOfKin(studentItem.nextOfKin);
      setContactNo(studentItem.contactNo);
    }
  }, [studentItem]);

  useEffect(() => {
    const foundSchool = schoolItems.find(
      (item) => item.id == studentItem.schoolId
    );
    if (foundSchool) {
      setSelectedSchool(foundSchool);
    }
  }, [schoolItems, studentItem]);

  useEffect(() => {
    const foundClass = classItems.find(
      (item) => item.id == studentItem.classId
    );
    if (foundClass) {
      setSelectedClass(foundClass);
    }
  }, [classItems, studentItem]);

  useFocusEffect(
    useCallback(() => {
      getSchoolsHandler();
      getClassesHandler();
      getExistingData();
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View
            style={{ paddingBottom: 30, paddingHorizontal: 10, paddingTop: 20 }}
          >
            <View>
              <View>
                <CustomInput
                  label="School"
                  value={selectedSchool.value}
                  required={true}
                  onChangeText={() => {}}
                />
              </View>
            </View>
            <View>
              <CustomInput
                id="firstName"
                label="First Name"
                value={firstName}
                onChangeText={firstNameChangeHandler}
                isError={firstNameHasError}
                errorMessage={firstNameErrorMessage}
                required={true}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <CustomInput
                  id="middleName"
                  label="Middle Name"
                  value={middleName}
                  onChangeText={middleNameChangeHandler}
                />
              </View>
              <View style={styles.rowItem}>
                <CustomInput
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChangeText={lastNameChangeHandler}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <StyledDropdown
                  label="Class"
                  items={[BLANK_DROPDOWN_MODEL, ...classItems]}
                  selectedItem={selectedClass}
                  onChange={selectClassHandler}
                  isError={classHasError}
                  errorMessage={classErrorMessage}
                  required={true}
                />
              </View>
              <View style={styles.rowItem}>
                <CustomInput
                  id="section"
                  label="Section"
                  value={section}
                  onChangeText={sectionChangeHandler}
                />
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text>Gender</Text>
                <Text style={{ color: "red", fontWeight: "bold" }}>*</Text>
              </View>
              <CustomRadioGroup
                label="Gender"
                items={GENDER_RADIO_ITEMS}
                selectedOption={gender}
                onChange={genderChangeHandler}
                isError={genderHasError}
                errorMessage={genderErrorMessage}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <CustomInput
                  id="age"
                  label="Age"
                  value={age}
                  onChangeText={ageChangeHandler}
                  isError={ageHasError}
                  errorMessage={ageErrorMessage}
                  required={true}
                />
              </View>
              <View style={styles.rowItem}>
                <CustomInput
                  id="rollNo"
                  label="Roll No"
                  value={rollNo}
                  onChangeText={rollNoChangeHandler}
                  isError={rollNoHasError}
                  errorMessage={rollNoErrorMessage}
                  required={true}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <StyledDropdown
                  label="Relation"
                  items={[BLANK_DROPDOWN_MODEL, ...RELATIONS_DROPDOWN_ITEMS]}
                  selectedItem={relation}
                  onChange={selectRelationHandler}
                />
              </View>
              <View style={styles.rowItem}>
                <CustomInput
                  label="Next Of KIN"
                  value={nextOfKin}
                  onChangeText={nextOfKinChangeHandler}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <CustomInput
                  label="Contact No"
                  value={contactNo}
                  onChangeText={contactNoChangeHandler}
                />
              </View>
              <View style={styles.rowItem}>
                <CustomInput
                  label="Relationship With Student"
                  value={relationshipWithStudent}
                  onChangeText={relationshipWithStudentChangeHandler}
                />
              </View>
            </View>
            <View>
              <StyledDropdown
                label="Special Need"
                items={[BLANK_DROPDOWN_MODEL, ...specialNeedItems]}
                selectedItem={specialNeed}
                onChange={selectSpecialNeedHandler}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomButton
                title="Save"
                onPress={addStudentHandler}
                icon={
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="white"
                  />
                }
              />
            </View>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Text>{dialogMessage}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog} loading={isLoading}>
                    Done
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  rowItem: {
    padding: 5,
    flexGrow: 1,
    flexBasis: 1,
  },
});

export default updateStudentScreen;
