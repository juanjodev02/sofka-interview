import { ButtonProps, BaseButton } from "@components";

export const Button = ({ variant, ...props }: ButtonProps) => {
  switch (variant) {
    case "primary":
      return <BaseButton variant={variant} {...props} />;
    case "secondary":
      return (
        <BaseButton
          variant={variant}
          backgroundColorName="secondary"
          colorName="secondaryContent"
          {...props}
        />
      );
    case "danger":
      return (
        <BaseButton
          variant={variant}
          backgroundColorName="danger"
          colorName="dangerContent"
          {...props}
        />
      );
    default:
      return <BaseButton variant={variant} {...props} />;
  }
};
