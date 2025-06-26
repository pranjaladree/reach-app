import { TextInput } from "react-native-paper";
import { View, Text } from "react-native";

interface Props {
  id: string;
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
    <View>
      <TextInput
        id={id}
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
      />
      {isError && (
        <View>
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomInput;
