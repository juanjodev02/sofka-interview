import { List, ListEmptyContent, ListFinancialProductItem } from "@components";
import { FinancialProduct } from "@core";
import { fireEvent, render } from "@testing-library/react-native";

describe("<List />", () => {
  it("should render a list", () => {
    const testID = "List";
    const { getByTestId } = render(
      <List
        testID={testID}
        renderItem={() => null}
        data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
      />,
    );

    const list = getByTestId(testID);

    expect(list.children.length).toBe(1);
  });

  it("should render empty list with emptyContent component with description", () => {
    const testID = "List";
    const { getByTestId } = render(
      <List
        testID={testID}
        renderItem={() => null}
        data={[]}
        ListEmptyComponent={
          <ListEmptyContent message="test" description="test" />
        }
      />,
    );

    const list = getByTestId(testID);

    expect(list.children.length).toBe(1);
  });

  it("should render empty list with emptyContent component without description", () => {
    const testID = "List";
    const { getByTestId } = render(
      <List
        testID={testID}
        renderItem={() => null}
        data={[]}
        ListEmptyComponent={<ListEmptyContent message="test" />}
      />,
    );

    const list = getByTestId(testID);

    expect(list.children.length).toBe(1);
  });

  it("should render FinancialProductItem", () => {
    const testID = "List";

    const { getByTestId } = render(
      <List
        testID={testID}
        renderItem={(item) => (
          <ListFinancialProductItem item={item as any} testID="listItem" />
        )}
        data={
          [
            {
              id: "1",
              name: "test",
              description: "test",
              logo: "test",
              dateRelease: new Date().toLocaleDateString(),
              dateRevision: new Date().toLocaleDateString(),
            },
            {
              id: "2",
              name: "test",
              description: "test",
              logo: "test",
              dateRelease: new Date().toLocaleDateString(),
              dateRevision: new Date().toLocaleDateString(),
            },
            {
              id: "3",
              name: "test",
              description: "test",
              logo: "test",
              dateRelease: new Date().toLocaleDateString(),
              dateRevision: new Date().toLocaleDateString(),
            },
          ] as FinancialProduct[]
        }
      />,
    );

    const list = getByTestId(testID);

    expect(list.children.length).toBe(1);
  });

  it("should call navigate when list item is pressed", () => {
    const testID = "List";
    const mock = jest
      .spyOn(require("expo-router"), "useRouter")
      .mockReturnValue({
        push: jest.fn(),
      });

    const { getByTestId } = render(
      <List
        testID={testID}
        renderItem={(item) => (
          <ListFinancialProductItem item={item as any} testID="listItem" />
        )}
        data={
          [
            {
              id: "1",
              name: "test",
              description: "test",
              logo: "test",
              dateRelease: new Date().toLocaleDateString(),
              dateRevision: new Date().toLocaleDateString(),
            },
          ] as FinancialProduct[]
        }
      />,
    );

    const listItem = getByTestId("listItem");

    fireEvent.press(listItem);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
