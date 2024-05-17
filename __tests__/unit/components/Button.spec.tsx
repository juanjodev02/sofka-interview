import { BaseButton, Button } from "@components";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { ButtonVariant } from "@theme";

describe("<Button />", () => {
  it("should render primary button with default options", () => {
    const testID = "Button";
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button
        testID={testID}
        variant="primary"
        onPress={onPress}
        title="test"
      />,
    );

    const button = getByTestId(testID);

    expect(button.children.length).toBe(2);
  });

  it("should render secondary button with default options", () => {
    const testID = "Button";
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button
        testID={testID}
        variant="secondary"
        onPress={onPress}
        title="test"
      />,
    );

    const button = getByTestId(testID);

    expect(button.children.length).toBe(2);
  });

  it("should render danger button with default options", () => {
    const testID = "Button";
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button
        testID={testID}
        variant="danger"
        onPress={onPress}
        title="test"
      />,
    );

    const button = getByTestId(testID);

    expect(button.children.length).toBe(2);
  });

  it("should render default button with default options", () => {
    const testID = "Button";
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button
        testID={testID}
        variant={"" as ButtonVariant}
        onPress={onPress}
        title="test"
      />,
    );

    const button = getByTestId(testID);

    expect(button.children.length).toBe(2);
  });

  it("should call onPress when BaseButton is renderer", () => {
    const testID = "Button";
    const onPress = jest.fn();
    const { getByTestId } = render(
      <BaseButton
        testID={testID}
        variant="primary"
        colorName="primaryContent"
        onPress={onPress}
        title="test"
      />,
    );

    const button = getByTestId(testID);

    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("should call Haptic.notificationAsync when disabled and is pressed", () => {
    const testID = "Button";
    const onPress = jest.fn();
    const { getByTestId } = render(
      <BaseButton
        testID={testID}
        variant="primary"
        colorName="primaryContent"
        disabled
        onPress={onPress}
        title="test"
      />,
    );

    const button = getByTestId(testID);

    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(0);
  });

  it("should show loader when isLoading is true", () => {
    const testID = "Button";
    const onPress = jest.fn();
    const { getByTestId } = render(
      <BaseButton
        testID={testID}
        variant="primary"
        colorName="primaryContent"
        isLoading
        onPress={onPress}
        title="test"
      />,
    );

    getByTestId(testID);

    //check if ActivityIndicator is rendered
    const loader = screen.getByTestId("button:loader");

    expect(loader).toBeDefined();
  });
});
