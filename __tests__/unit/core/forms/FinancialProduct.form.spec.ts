import { FinancialProductForm } from "@core";

describe("FinancialProductForm", () => {
  it("should return form template in not editing mode", () => {
    const fields = FinancialProductForm.getFields({
      initValues: {},
      t: jest.fn() as any,
      isEditing: false,
    });

    expect(fields.length).toBe(6);
  });
});
