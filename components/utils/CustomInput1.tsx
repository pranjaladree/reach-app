import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  id?: string;
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  maxLength?: number;
  isError?: boolean;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string
}
const CustomInput1 = ({
  id,
  label,
  value,
  onChangeText,
  maxLength,
  isError,
  errorMessage,
  required,
  placeholder,
}: Props) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required ? (
            <Text style={{ color: "red", fontWeight: "bold", }}>*</Text>
          ) : null}
        </Text>
      )}
      <TextInput
        id={id}
        // label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        // mode="outlined"
        maxLength={maxLength}
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

export default CustomInput1;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 20
    // flex: 1,
  },
});
