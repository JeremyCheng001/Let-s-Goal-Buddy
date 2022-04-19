import * as React from "react";
import { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";
import styled from "styled-components";
interface ColumnProps {
  style?: ViewStyle;
  children?: any;
}

const Column: FunctionComponent<ColumnProps> = (props: ColumnProps) => {
  return (
    <ColumnWrap
      style={{
        flex: 1,
        flexDirection: "column",

        ...props.style,
      }}
    >
      {props.children}
    </ColumnWrap>
  );
};

const ColumnWrap = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export default Column;
