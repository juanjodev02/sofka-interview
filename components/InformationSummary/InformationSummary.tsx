import {
  InformationSummaryProps,
  InformationSummaryRow,
  View,
} from "@components";
import { FC } from "react";

export const InformationSummary: FC<InformationSummaryProps> = (props) => {
  return (
    <View style={{ gap: 20 }} testID={props.testID}>
      {props.fields.map((field) => {
        return <InformationSummaryRow key={field.label} {...field} />;
      })}
    </View>
  );
};
