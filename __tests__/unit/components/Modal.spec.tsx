import { Modal, Text } from "@components";
import { render } from "@testing-library/react-native";

describe("<Modal />", () => {
  it("should render modal", () => {
    const testID = "Modal";
    const { getByTestId } = render(
      <Modal testID={testID} visible>
        <Text testID="content">Hello World</Text>
      </Modal>,
    );
    const modal = getByTestId(testID);
    expect(modal.children.length).toBe(2);
  });

  it("should render modal with title and children", () => {
    const testID = "Modal";
    const { getByTestId } = render(
      <Modal testID={testID} visible>
        <Text testID="content">Hello World</Text>
      </Modal>,
    );
    const content = getByTestId("content");
    expect(content).toBeDefined();
  });
});
