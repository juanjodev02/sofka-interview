import { Text } from "@components";
import { render, screen } from "@testing-library/react-native";
import React from "react";

describe("<Text />", () => {
  it("should render body text with default options", () => {
    const testID = "text";
    render(
      <Text testID={testID} variant="body">
        Hello World
      </Text>,
    );
    expect(screen.getByTestId(testID).children.length).toBe(1);
  });

  it("should render caption text with default options", () => {
    const testID = "text";
    render(
      <Text testID={testID} variant="caption">
        Hello World
      </Text>,
    );
    expect(screen.getByTestId(testID).children.length).toBe(1);
  });

  it("should render title text with default options", () => {
    const testID = "text";
    render(
      <Text testID={testID} variant="title">
        Hello World
      </Text>,
    );
    expect(screen.getByTestId(testID).children.length).toBe(1);
  });
});
