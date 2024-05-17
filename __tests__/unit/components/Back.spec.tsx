import { Back } from "@components";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

describe("<Back />", () => {
  it("should render body text with default options", () => {
    const testID = "Back";
    const { getByTestId } = render(<Back testID={testID} />);

    const backButton = getByTestId(testID);

    expect(backButton.children.length).toBe(2);
  });

  it("should call router.back when pressed", () => {
    const mock = jest
      .spyOn(require("expo-router"), "useRouter")
      .mockReturnValue({
        back: jest.fn(),
      });
    const testID = "Back";

    const { getByTestId } = render(<Back testID={testID} />);

    const backButton = getByTestId(testID);

    fireEvent.press(backButton);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
