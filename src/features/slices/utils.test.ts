import { Field } from "../../FinancialTable/utils/types";
import { findTableById, updateReportsForFields } from "./utils";

describe("findTableById", () => {
  it("should return the table with the given id", () => {
    const tables = [
      { id: 1, fields: [], reports: [] },
      { id: 2, fields: [], reports: [] },
    ];
    const id = 2;
    const result = findTableById(tables, id);
    expect(result).toEqual(tables[1]);
  });
});

describe("updateReportsForFields", () => {
  it("should update the reports for all fields and nested fields", () => {
    const fields: Field[] = [
      {
        name: "Field 1",
        reports: { "Report 1": 10, "Report 2": 20 },
        color: "red",
        verticalLevel: 0,
        nestedFields: [
          {
            name: "Nested Field 1",
            reports: { "Report 1": 30, "Report 2": 40 },
            color: "red",
            verticalLevel: 1,
          },
        ],
      },
      {
        name: "Field 2",
        reports: { "Report 1": 50, "Report 2": 60 },
        color: "green",
        verticalLevel: 0,
        nestedFields: [
          {
            name: "Nested Field 2",
            reports: { "Report 1": 70, "Report 2": 80 },
            color: "blue",
            verticalLevel: 1,
          },
        ],
      },
    ];
    const reportName = "Report 1";
    const value = 100;
    const result = updateReportsForFields(fields, reportName, value);
    const expected: Field[] = [
      {
        name: "Field 1",
        reports: { "Report 1": 100, "Report 2": 20 },
        color: "red",
        verticalLevel: 0,
        nestedFields: [
          {
            name: "Nested Field 1",
            reports: { "Report 1": 100, "Report 2": 40 },
            color: "red",
            verticalLevel: 1,
          },
        ],
      },
      {
        name: "Field 2",
        reports: { "Report 1": 100, "Report 2": 60 },
        color: "green",
        verticalLevel: 0,
        nestedFields: [
          {
            name: "Nested Field 2",
            reports: { "Report 1": 100, "Report 2": 80 },
            color: "blue",
            verticalLevel: 1,
          },
        ],
      },
    ];
    expect(result).toEqual(expected);
  });
});
