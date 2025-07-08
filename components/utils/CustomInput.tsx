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
}
const CustomInput = ({
  id,
  label,
  value,
  onChangeText,
  maxLength,
  isError,
  errorMessage,
  required,
}: Props) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required ? (
            <Text style={{ color: "red", fontWeight: "bold" }}>*</Text>
          ) : null}
        </Text>
      )}
      <TextInput
        id={id}
        // label={label}
        placeholder={`Enter ${label}`}
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

export default CustomInput;

const styles = StyleSheet.create({
  container: {},
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
