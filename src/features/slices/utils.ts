import { Table, Field } from "../../FinancialTable/utils/types";

export const findTableById = (tables: Table[], id: number) =>
  tables.find((table) => table.id === id);

export const updateReportsForFields = (
  fields: Field[],
  reportName: string,
  value: number
) =>
  fields.map((field) => ({
    ...field,
    reports: { ...field.reports, [reportName]: value },
    nestedFields: field.nestedFields?.map((nestedField) => ({
      ...nestedField,
      reports: { ...nestedField.reports, [reportName]: value },
    })),
  }));
