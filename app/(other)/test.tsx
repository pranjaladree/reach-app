import StyledDropdown, { DropdownItem } from "@/components/new_UI/StyledDropdown";
import React, { useState } from "react";
import { View } from "react-native";

export default function Test() {
  const sectionOptions: DropdownItem[] = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
  ];

  const [selectedSchool, setSelectedSchool] = useState<DropdownItem>(
    sectionOptions[0]
  );
  return (
    <View style={{ flex: 1 }}>
      <StyledDropdown
        label="Section"
        items={sectionOptions}
        selectedItem={selectedSchool || { label: "", value: "" }}
        onChange={(val) => {
          const item = sectionOptions.find((i) => i.value === val);
          if (item) setSelectedSchool(item);
        }}
      />
    </View>
  );
}
