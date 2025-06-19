import { TextInput, View, StyleSheet } from "react-native";

interface Props {
  value: string;
  placeholder?: string;
  onChangeText: (val: string) => void;
}

const InputBox = ({ value, placeholder, onChangeText }: Props) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},
  input: {
    borderWidth: 0.2,
    padding: 5,
    borderRadius: 3,
  },
});

export default InputBox;
