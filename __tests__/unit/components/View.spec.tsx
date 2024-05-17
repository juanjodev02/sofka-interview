import { View } from "@components/View";
import { render, screen } from "@testing-library/react-native";
import React from "react";

describe("<View />", () => {
  it("has 1 child", () => {
    const testID = "view";
    render(<View testID={testID}>Hello World</View>);
    expect(screen.getByTestId(testID).children.length).toBe(1);
  });
});
