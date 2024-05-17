import { View } from "@components";
import { DateInput } from "@components/Form/DateInput";
import { TextInput } from "@components/Form/TextInput";
import { FormProps } from "@components/Form/types";
import { FormField } from "@core";
import { FC, useCallback, useEffect, useState } from "react";

const getFieldByType = (
  field: FormField,
  formState: Record<string, string>,
  errors: Record<string, string>,
  onChange: (name: string, value: string) => void,
  asyncValidatorsLoaders: Record<string, boolean>,
) => {
  switch (field.type) {
    case "text":
      return (
        <TextInput
          key={field.name}
          error={errors[field.name]}
          value={formState[field.name]}
          onChange={(value) => onChange(field.name, value)}
          isLoading={asyncValidatorsLoaders[field.name]}
          {...field}
        />
      );
    case "date":
      return (
        <DateInput
          key={field.name}
          error={errors[field.name]}
          value={formState[field.name]}
          onChange={(value) => onChange(field.name, value)}
          {...field}
        />
      );
    default:
      return null;
  }
};

const parseInitialValue = (fields: FormField[]) => ({
  ...fields.reduce(
    (acc, field) => {
      if (!field.initialValue) return acc;
      acc[field.name] = field.initialValue || "";
      return acc;
    },
    {} as Record<string, string>,
  ),
});

export const Form: FC<FormProps> = ({ fields, children, testID }) => {
  const [formState, setFormState] = useState<Record<string, string>>(() =>
    parseInitialValue(fields.filter((field) => !field.computedValue)),
  );
  const [prevFormState, setPrevFormState] = useState<Record<string, string>>(
    {},
  );
  const [computedFieldsState, setComputedFieldsState] = useState<
    Record<string, string>
  >(() => parseInitialValue(fields.filter((field) => !!field.computedValue)));

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [asyncValidatorsLoaders, setAsyncValidatorsLoaders] = useState<
    Record<string, boolean>
  >({});

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setPrevFormState(formState);
  }, [formState]);

  useEffect(() => {
    const fullState = { ...formState, ...computedFieldsState };

    const changedKeys = Object.keys(formState).filter(
      (key) => fullState[key] !== prevFormState[key],
    );

    if (
      !fullState ||
      Object.keys(formState).length === 0 ||
      !changedKeys.length
    )
      return;

    const computedKeys = fields
      .filter((f) => !!f.computedValue)
      .filter((f) => changedKeys.includes(String(f.computedValue?.field)))
      .map((f) => f.name);

    const validateKeys = [...changedKeys, ...computedKeys];

    validateKeys.forEach((key) => {
      const field = fields.find((f) => f.name === key);

      if (!field) return;

      validateInputChange(field.name, fullState[field.name] || "");
    });
  }, [formState, prevFormState]);

  useEffect(() => {
    // validate that full form state has decalred all fields (even if they are empty, but they should be declared as empty string)
    const fullState = { ...formState, ...computedFieldsState };
    const declaredFields = fields.map((field) => field.name);
    const fullStateKeys = Object.keys(fullState);
    const missingFields = declaredFields.filter(
      (field) => !fullStateKeys.includes(field),
    );

    if (missingFields.length) {
      const missingFieldsValues = missingFields.reduce(
        (acc, field) => ({ ...acc, [field]: "" }),
        {},
      );
      setFormState((prev) => ({ ...prev, ...missingFieldsValues }));
    }
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const hasValidationsPending = Object.values(asyncValidatorsLoaders).some(
      (isLoading) => isLoading,
    );
    setIsFormValid(!hasErrors && !hasValidationsPending);
  }, [errors, asyncValidatorsLoaders]);

  const validateInputChange = (name: string, value: string) => {
    const field = fields.find((field) => field.name === name);
    if (!field) return;

    if (field.computedValue) {
      const originValue = formState[field.computedValue.field];
      const computedValue = field.computedValue.compute(originValue);
      setComputedFieldsState((prev) => ({ ...prev, [name]: computedValue }));
    }

    if (field.disabled) return;

    let hasPreviousError = false;

    for (const validator of field.validators ?? []) {
      const [valid, error] = validator(value, formState);
      setErrors((prev) => {
        return { ...prev, [name]: valid ? "" : error };
      });
      if (!valid) {
        setIsFormValid(false);
        hasPreviousError = true;
        break;
      }
    }

    if (hasPreviousError) return;

    for (const asyncValidator of field.asyncValidators ?? []) {
      setAsyncValidatorsLoaders((prev) => ({ ...prev, [name]: true }));
      asyncValidator(value, formState)
        .then(([valid, error]) => {
          setErrors((prev) => ({ ...prev, [name]: valid ? "" : error }));
        })
        .finally(() => {
          setAsyncValidatorsLoaders((prev) => ({ ...prev, [name]: false }));
        });
    }
  };

  const handleChange = (name: string, value: string) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const Input = useCallback(
    (field: FormField) =>
      getFieldByType(
        field,
        { ...formState, ...computedFieldsState },
        errors,
        handleChange,
        asyncValidatorsLoaders,
      ),
    [formState, computedFieldsState, errors, asyncValidatorsLoaders],
  );

  const reset = () => {
    setFormState(
      parseInitialValue(fields.filter((field) => !field.computedValue)),
    );
    setComputedFieldsState(
      parseInitialValue(fields.filter((field) => !!field.computedValue)),
    );
  };

  return (
    <View testID={testID}>
      {fields.map((field) => Input(field))}
      {children({
        fields,
        formState: { ...formState, ...computedFieldsState },
        isValid: isFormValid,
        reset,
      })}
    </View>
  );
};
