import { SearchInput } from "@components";
import { render, fireEvent } from "@testing-library/react-native";

describe("<SearchInput />", () => {
  it("should render search input with default options", () => {
    const testID = "SearchInput";
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <SearchInput testID={testID} onSearch={onSearch} placeholder="Search" />,
    );

    const searchInput = getByTestId(testID);

    expect(searchInput.children.length).toBe(0);
  });

  it("should call onSearch when text is entered", () => {
    const testID = "SearchInput";
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <SearchInput testID={testID} onSearch={onSearch} placeholder="Search" />,
    );

    const searchInput = getByTestId(testID);

    fireEvent.changeText(searchInput, "test");

    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
