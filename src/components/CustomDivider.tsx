import { Divider } from "@ui-kitten/components";
import * as React from "react";
import { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

interface CustomDividerProps {
  style?: ViewStyle;
}

const CustomDivider: FunctionComponent<CustomDividerProps> = (props:CustomDividerProps) => {
  return (
    <Divider
      style={{
        width: "100%",
        height: 1,
        backgroundColor: "#9f9f9f",
        ...props.style
      }}
    />
  );
};

export default CustomDivider;
