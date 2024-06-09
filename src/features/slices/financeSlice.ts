import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Field, Report, Table } from "../../FinancialTable/utils/types";
import { findTableById, updateReportsForFields } from "./utils";

interface FinanceSlice {
  tables: Table[];
}

const initialState: FinanceSlice = {
  tables: [],
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addTable: (state) => {
      const newId = state.tables.length
        ? Math.max(...state.tables.map((table) => table.id)) + 1
        : 1;
      state.tables.push({ id: newId, fields: [], reports: [] });
      state.tables.sort((a, b) => a.id - b.id);
    },
    removeTable: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.filter(
        (table) => table.id !== action.payload
      );
    },
    addField: (state, action: PayloadAction<{ field: Field; id: number }>) => {
      const table = findTableById(state.tables, action.payload.id);
      if (table) {
        table.fields.push(action.payload.field);
        table.fields.sort((a, b) => a.verticalLevel - b.verticalLevel);
      }
    },
    removeField: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const table = findTableById(state.tables, action.payload.id);
      if (table) {
        table.fields = table.fields.filter(
          (field) => field.name !== action.payload.name
        );
      }
    },
    updateField: (
      state,
      action: PayloadAction<{ field: Field; id: number }>
    ) => {
      const table = findTableById(state.tables, action.payload.id);
      if (table) {
        table.fields = table.fields.map((field) =>
          field.name === action.payload.field.name
            ? action.payload.field
            : field
        );
      }
    },
    addReport: (
      state,
      action: PayloadAction<{ report: Report; id: number }>
    ) => {
      const table = findTableById(state.tables, action.payload.id);
      if (table) {
        table.reports.push(action.payload.report);
        table.fields = updateReportsForFields(
          table.fields,
          action.payload.report.name,
          0
        );
      }
    },
    removeReport: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const table = findTableById(state.tables, action.payload.id);
      if (table) {
        table.reports = table.reports.filter(
          (report) => report.name !== action.payload.name
        );
        table.fields = table.fields.map((field) => {
          const updatedReports = { ...field.reports };
          delete updatedReports[action.payload.name];
          return {
            ...field,
            reports: updatedReports,
            nestedFields: field.nestedFields?.map((nestedField) => {
              const updatedNestedReports = { ...nestedField.reports };
              delete updatedNestedReports[action.payload.name];
              return { ...nestedField, reports: updatedNestedReports };
            }),
          };
        });
      }
    },
  },
});

export const {
  addTable,
  removeTable,
  addField,
  addReport,
  removeField,
  removeReport,
  updateField,
} = financeSlice.actions;

export default financeSlice.reducer;
