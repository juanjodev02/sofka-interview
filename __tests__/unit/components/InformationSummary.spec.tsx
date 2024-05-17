import { InformationSummary, InformationSummaryRowProps } from "@components";
import { render } from "@testing-library/react-native";

describe("<InformationSummary />", () => {
  const fields: InformationSummaryRowProps[] = [
    {
      label: "test",
      value: "test",
      type: "text",
    },
  ];

  const dateField: InformationSummaryRowProps = {
    label: "test",
    value: new Date(),
    type: "date",
  };

  const imageField: InformationSummaryRowProps = {
    label: "test",
    value: "https://test.com/test.png",
    type: "image",
  };

  const unknownField: InformationSummaryRowProps = {
    label: "test",
    value: "test",
    type: "unknown" as any,
  };

  it("should render with defined fields", () => {
    const testID = "InformationSummary";
    const { getByTestId } = render(
      <InformationSummary testID={testID} fields={fields} />,
    );

    const informationSummary = getByTestId(testID);

    expect(informationSummary.children.length).toBe(1);
  });

  it("should render date Row", () => {
    const testID = "InformationSummary";
    const { getByTestId } = render(
      <InformationSummary testID={testID} fields={[dateField]} />,
    );

    const informationSummary = getByTestId(testID);

    expect(informationSummary.children.length).toBe(1);
  });

  it("should render image Row", () => {
    const testID = "InformationSummary";
    const { getByTestId } = render(
      <InformationSummary testID={testID} fields={[imageField]} />,
    );

    const informationSummary = getByTestId(testID);

    expect(informationSummary.children.length).toBe(1);
  });

  it("should render null if type is unknown", () => {
    const testID = "InformationSummary";
    const { getByTestId } = render(
      <InformationSummary testID={testID} fields={[unknownField]} />,
    );

    const informationSummary = getByTestId(testID);

    expect(informationSummary.children.length).toBe(1);
  });
});
