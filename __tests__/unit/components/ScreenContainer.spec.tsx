import { ScreenContainer, Text } from "@components";
import { render } from "@testing-library/react-native";

describe("<ScreenContainer />", () => {
  it("should render with children", () => {
    const testID = "ScreenContainer";
    const { getByTestId } = render(
      <ScreenContainer testID={testID}>
        <Text>Hello World</Text>
      </ScreenContainer>,
    );

    const screenContainer = getByTestId(testID);

    expect(screenContainer.children.length).toBe(1);
  });

  it("should render screen container with default options", () => {
    const testID = "ScreenContainer";
    const { getByTestId } = render(
      <ScreenContainer testID={testID} scrollable>
        <Text>Hello World</Text>
      </ScreenContainer>,
    );

    const screenContainer = getByTestId(testID);

    expect(screenContainer.children.length).toBe(1);
  });
});
