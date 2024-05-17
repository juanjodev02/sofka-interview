import { DateGraterThanNowValidator } from "@core";

describe("DateGreaterThanNowValidator", () => {
  it("should return false if date is less than now", () => {
    const [valid, message] = DateGraterThanNowValidator.validate("error")(
      "22/10/1997",
      {},
    );

    expect(valid).toBeFalsy();
    expect(message).toBe("error");
  });

  it("should return true if date is greater than now", () => {
    const [valid, message] = DateGraterThanNowValidator.validate("error")(
      "22/10/2028",
      {},
    );

    expect(valid).toBeTruthy();
    expect(message).toBe("error");
  });

  it("should return false if date doesnt have a valid format", () => {
    const [valid, message] = DateGraterThanNowValidator.validate("error")(
      "22/10",
      {},
    );

    expect(valid).toBeFalsy();
    expect(message).toBe("error");
  });

  it("should return false if date throws an error", () => {
    jest.spyOn(require("luxon"), "DateTime").mockImplementation(() => ({
      fromFormat: () => {
        throw new Error();
      },
    }));

    const [valid, message] = DateGraterThanNowValidator.validate("error")(
      "22/10/2024",
      {},
    );

    expect(valid).toBeFalsy();
    expect(message).toBe("error");
  });
});
