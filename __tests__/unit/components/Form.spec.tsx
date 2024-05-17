import { FieldType, Form } from "@components";
import {
  FinancialProductForm,
  FormField,
  MaxLengthValidator,
  MinLengthValidator,
  RequiredValidator,
} from "@core";
import { render, fireEvent } from "@testing-library/react-native";

describe("<Form />", () => {
  it("should mount form with 1 text field", () => {
    const fields: FormField[] = [
      {
        name: "test",
        label: "test",
        type: "text",
      },
    ];

    const testID = "Form";
    const { getByTestId } = render(
      <Form testID={testID} fields={fields}>
        {(fields: any) => <></>}
      </Form>,
    );

    const form = getByTestId(testID);

    expect(form.children.length).toBe(1);
  });

  it("should mount form with 1 date field", () => {
    const fields: FormField[] = [
      {
        name: "test",
        label: "test",
        initialValue: new Date().toLocaleDateString(),
        caption: "test",
        type: "date",
      },
    ];

    const testID = "Form";
    const { getByTestId } = render(
      <Form testID={testID} fields={fields}>
        {(fields: any) => <></>}
      </Form>,
    );

    const form = getByTestId(testID);

    expect(form.children.length).toBe(1);
  });

  it("should mount form with 1 text field and validator", () => {
    const fields: FormField[] = [
      {
        name: "test",
        label: "test",
        validators: [
          RequiredValidator.validate("error"),
          MinLengthValidator.validate("error", 5),
          MaxLengthValidator.validate("error", 10),
        ],
        type: "text",
        placeholder: "test",
      },
    ];

    const testID = "Form";
    const { getByTestId } = render(
      <Form testID={testID} fields={fields}>
        {(fields: any) => <></>}
      </Form>,
    );

    const form = getByTestId(testID);

    expect(form.children.length).toBe(1);
  });

  it("should render from with 1 computed field", () => {
    const fields: FormField[] = [
      {
        name: "original",
        label: "original",
        type: "text",
        initialValue: "test",
      },
      {
        name: "test",
        label: "test",
        type: "text",
        computedValue: {
          field: "original",
          compute: (value: string) => value,
        },
      },
      {
        name: "test2",
        label: "test2",
        type: "" as FieldType,
      },
    ];

    const testID = "Form";
    const { getByTestId } = render(
      <Form testID={testID} fields={fields}>
        {(fields: any) => <></>}
      </Form>,
    );

    const form = getByTestId(testID);

    expect(form.children.length).toBe(2);
  });

  it("should render from with 1 async validator", () => {
    const fields: FormField[] = [
      {
        name: "test",
        label: "test",
        type: "text",
        disabled: true,
        asyncValidators: [
          async (value: string) => {
            await new Promise((resolve) =>
              setTimeout(() => {
                resolve(true);
              }, 1000),
            );
            return [true, "error"];
          },
        ],
      },
    ];

    const testID = "Form";
    const { getByTestId } = render(
      <Form testID={testID} fields={fields}>
        {(fields: any) => <></>}
      </Form>,
    );

    const form = getByTestId(testID);

    const input = getByTestId("input-text");

    fireEvent(input, "onFocus");
    fireEvent(input, "onChangeText", "test");
    fireEvent(input, "onBlur");

    expect(form.children.length).toBe(1);
  });

  it("should render many fields", () => {
    const fields = FinancialProductForm.getFields({
      initValues: {},
      t: jest.fn() as any,
      isEditing: false,
    });

    const testID = "Form";
    const { getByTestId } = render(
      <Form testID={testID} fields={fields}>
        {(fields: any) => <></>}
      </Form>,
    );

    const form = getByTestId(testID);

    expect(form.children.length).toBe(6);
  });
});
