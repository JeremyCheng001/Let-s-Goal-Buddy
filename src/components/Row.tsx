import * as React from "react";
import { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";
import styled from "styled-components";
interface RowProps {
  style?: ViewStyle;
  children?: any;
}

const Row: FunctionComponent<RowProps> = (props: RowProps) => {
  return (
    <RowWrap
      style={{
        ...props.style,
      }}
    >
      {props.children}
    </RowWrap>
  );
};

export default Row;

const RowWrap = styled(View)`
  flex-direction: row;
  align-items: center;
`;
