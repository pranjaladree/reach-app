import { TextInput } from "react-native-paper";

interface Props {
  id: string;
  label: string;
  value: string;
  onChangeText: (val: string) => void;
}
const CustomInput = ({ id, label, value, onChangeText }: Props) => {
  return (
    <TextInput
      id={id}
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
    />
  );
};

export default CustomInput;
