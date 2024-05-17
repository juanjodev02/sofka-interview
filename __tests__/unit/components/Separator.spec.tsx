import { Separator } from "@components";
import { render } from "@testing-library/react-native";

describe("<Separator />", () => {
  it("should render a separator", () => {
    const testID = "Separator";
    const { getByTestId } = render(<Separator testID={testID} />);

    const separator = getByTestId(testID);

    expect(separator.children.length).toBe(0);
  });
});
