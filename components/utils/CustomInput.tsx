// import { TextInput } from "react-native-paper";
// import { View, Text } from "react-native";

// interface Props {
//   id: string;
//   label: string;
//   value: string;
//   onChangeText: (val: string) => void;
//   isError?: boolean;
//   errorMessage?: string;
// }
// const CustomInput = ({
//   id,
//   label,
//   value,
//   onChangeText,
//   isError,
//   errorMessage,
// }: Props) => {
//   return (
//     <View>
//       <TextInput
//         id={id}
//         label={label}
//         value={value}
//         onChangeText={onChangeText}
//         mode="outlined"
//       />
//       {isError && (
//         <View>
//           <Text style={{ color: "red" }}>{errorMessage}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CustomInput;

import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  id?: string;
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  isError?: boolean;
  errorMessage?: string;
}
const CustomInput = ({
  id,
  label,
  value,
  onChangeText,
  isError,
  errorMessage,
}: Props) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        id={id}
        // label={label}
        placeholder={`Enter ${label}`}
        value={value}
        onChangeText={onChangeText}
        // mode="outlined"
        style={styles.input}
      />

      {/* <TextInput style={styles.input} placeholder="Middle Name" /> */}
      {isError && (
        <View>
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    // backgroundColor: "#f7f7f7",
    flex: 1,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#004aad",
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: "#fff",
    // flex: 1,
  },
});
