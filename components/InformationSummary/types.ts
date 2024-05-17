import { ViewProps } from "react-native";

export interface InformationSummaryProps extends ViewProps {
  fields: InformationSummaryRowProps[];
}

export interface InformationSummaryRowProps extends ViewProps {
  label: string;
  value: string | number | Date;
  type: "text" | "date" | "image";
}
