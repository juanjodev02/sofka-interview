import {
  DateGraterThanNowValidator,
  DateUtils,
  FinancialProductsService,
  Form,
  FormField,
  GetFormFieldsOptions,
  MaxLengthValidator,
  MinLengthValidator,
  RequiredValidator,
} from "@/core";

class _FinancialProductForm implements Form {
  getFields({
    initValues: initialValues,
    isEditing,
    t,
  }: GetFormFieldsOptions): FormField[] {
    return [
      {
        name: "id",
        label: t("form.idLabel"),
        type: "text",
        required: true,
        disabled: isEditing,
        initialValue: initialValues?.id?.toString(),
        validators: [
          RequiredValidator.validate(t("form.idRequired")),
          MinLengthValidator.validate(t("form.idMinLength"), 3),
          MaxLengthValidator.validate(t("form.idMaxLength"), 10),
        ],
        asyncValidators: [
          async (value: string) => {
            const idExists =
              await FinancialProductsService.verifyFinancialProduct(value);
            return [!idExists, t("form.idAsyncError")];
          },
        ],
      },
      {
        name: "name",
        label: t("form.nameLabel"),
        type: "text",
        required: true,
        initialValue: initialValues?.name?.toString(),
        validators: [
          RequiredValidator.validate(t("form.nameRequired")),
          MinLengthValidator.validate(t("form.nameMinLength"), 5),
          MaxLengthValidator.validate(t("form.nameMaxLength"), 100),
        ],
      },
      {
        name: "description",
        label: t("form.descriptionLabel"),
        type: "text",
        initialValue: initialValues?.description?.toString(),
        validators: [
          RequiredValidator.validate(t("form.descriptionRequired")),
          MinLengthValidator.validate(t("form.descriptionMinLength"), 10),
          MaxLengthValidator.validate(t("form.descriptionMaxLength"), 200),
        ],
      },
      {
        name: "logo",
        label: t("form.logoLabel"),
        type: "text",
        initialValue: initialValues?.logo?.toString(),
        validators: [RequiredValidator.validate(t("form.logoRequired"))],
      },
      {
        name: "dateRelease",
        label: t("form.releaseDateLabel"),
        type: "date",
        initialValue: DateUtils.parseDate(
          initialValues?.dateRelease?.toString(),
        ),
        validators: [
          RequiredValidator.validate(t("form.dateReleaseRequired")),
          DateGraterThanNowValidator.validate(t("form.dateGraterThanNow")),
        ],
        caption: t("form.dateFormatCaption"),
      },
      {
        name: "dateRevision",
        label: t("form.revisionDateLabel"),
        type: "date",
        disabled: true,
        computedValue: {
          field: "dateRelease",
          compute: (value: string) => DateUtils.addYears(value, 1),
        },
        initialValue: DateUtils.parseDate(
          initialValues?.dateRevision?.toString(),
        ),
      },
    ];
  }
}

export const FinancialProductForm = new _FinancialProductForm();
