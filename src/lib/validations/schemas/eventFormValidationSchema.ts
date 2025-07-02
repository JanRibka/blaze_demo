import { date, InferType, object, string } from "yup";

import TErrorGeneral from "@/lib/types/TErrorGeneral";

const eventFormValidationSchema = object().shape({
  title: string()
    .required("Nadpis je povinný")
    .max(50, "Nadpis může obsahovat maximálně 50 znaků"),
  description: string()
    .required("Popis je povinný")
    .max(255, "Popis může obsahovat maximálně 255 znaků"),
  startAt: date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable()
    .required("Začátek je povinný"),
  endAt: date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable()
    .required("Konec je povinný"),
  location: string()
    .optional()
    .nullable()
    .max(100, "Umístění může obsahovat maximálně 255 znaků"),
});

export default eventFormValidationSchema;

export type TEventForm = InferType<typeof eventFormValidationSchema>;
export type TEventFormError = {
  [K in keyof TEventForm | TErrorGeneral]?: string;
};
