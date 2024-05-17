import { Loader } from "@components/Loader";
import { render } from "@testing-library/react-native";

describe("<Loader />", () => {
  it("should show loader", () => {
    const testID = "Loader";
    const { getByTestId } = render(<Loader testID={testID} />);
    const loader = getByTestId(testID);
    expect(loader.children.length).toBe(1);
  });
});
