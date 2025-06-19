import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode;
}

const Row = ({ children }: Props) => {
  <View style={{ display: "flex" }}>{children}</View>;
};

export default Row;
