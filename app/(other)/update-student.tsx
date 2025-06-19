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
} from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { nanoid } from "nanoid/non-secure";

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
    try {
      const response = db.getFirstSync(
        "SELECT  * FROM students WHERE rollNo = ? AND classId = ? AND section = ?;",
        [rollNo, selectedClass.id, section]
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
    console.log("RESSSSPOO", response);
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
      setGender(studentItem.gender);
      setRollNo(studentItem.rollNo);
      setSection(studentItem.section);
      setNextOfKin(studentItem.nextOfKin);
      setContactNo(studentItem.contactNo);
    }
  }, [studentItem]);

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
          <View style={{ paddingBottom: 30 }}>
            <View>
              <View>
                <CustomDropdown
                  label="School"
                  items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
                  selectedItem={selectedSchool}
                  onChange={selectSchoolHandler}
                />
              </View>
            </View>
            <View>
              <TextInput
                label="First Name"
                value={firstName}
                onChangeText={firstNameChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <TextInput
                label="Middle Name"
                value={middleName}
                onChangeText={middleNameChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <TextInput
                label="Last Name"
                value={lastName}
                onChangeText={lastNameChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <CustomDropdown
                label="Class"
                items={[BLANK_DROPDOWN_MODEL, ...classItems]}
                selectedItem={selectedClass}
                onChange={selectClassHandler}
              />
            </View>
            <View>
              <TextInput
                label="Section"
                value={section}
                onChangeText={sectionChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <CustomRadioGroup
                label="Gender"
                items={GENDER_RADIO_ITEMS}
                selectedOption={gender}
                onChange={genderChangeHandler}
              />
            </View>
            <View>
              <TextInput
                label="Age"
                value={age}
                onChangeText={ageChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <TextInput
                label="Roll No"
                value={rollNo}
                onChangeText={rollNoChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <CustomDropdown
                label="Relation"
                items={[BLANK_DROPDOWN_MODEL, ...RELATIONS_DROPDOWN_ITEMS]}
                selectedItem={relation}
                onChange={selectRelationHandler}
              />
            </View>
            <View>
              <TextInput
                label="Next Of KIN"
                value={nextOfKin}
                onChangeText={nextOfKinChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <TextInput
                label="Contact No"
                value={contactNo}
                onChangeText={contactNoChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <TextInput
                label="Relationship With Student"
                value={relationshipWithStudent}
                onChangeText={relationshipWithStudentChangeHandler}
                mode="outlined"
              />
            </View>
            <View>
              <CustomDropdown
                label="Special Need"
                items={[BLANK_DROPDOWN_MODEL, ...specialNeedItems]}
                selectedItem={specialNeed}
                onChange={selectSpecialNeedHandler}
              />
            </View>
            <View>
              <Button
                onPress={addStudentHandler}
                mode="contained"
                loading={isLoading}
              >
                Update Student
              </Button>
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

export default updateStudentScreen;
