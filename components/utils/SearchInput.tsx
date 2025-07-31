import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  id?: string;
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  maxLength?: number;
  isError?: boolean;
  errorMessage?: string;
  required?: boolean;
}
const SearchInput = ({
  id,
  placeholder,
  value,
  onChangeText,
  maxLength,
  isError,
  errorMessage,
  required,
}: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} />
      <TextInput
        id={id}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        style={styles.input}
      />
      {isError && (
        <View>
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#004aad",
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
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
    paddingHorizontal: 10,
  },
});
