import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../app/hooks";
import {
  addField,
  addReport,
  removeField,
  removeReport,
  updateField,
} from "../features/slices/financeSlice";
import { nestedFieldColors } from "../FinancialTable/utils/constants";
import { Field, ReportFields, Table } from "../FinancialTable/utils/types";

interface Props {
  table: Table;
}

export const useFinancialTable = ({ table }: Props) => {
  const { id, fields, reports } = table;
  const dispatch = useAppDispatch();
  const [error, setError] = useState<{ name: string; message: string } | null>(
    null
  );

  const handleError = useCallback((name: string, message: string) => {
    setError({ name, message });
  }, []);

  const addFieldHandler = useCallback(
    (field: Field) => {
      if (fields.some((f) => f.name === field.name)) {
        handleError("name", "Field already exists.");
        return;
      }
      dispatch(addField({ field, id }));
    },
    [dispatch, fields, id, handleError]
  );

  const updateFieldHandler = useCallback(
    (field: Field) => {
      dispatch(updateField({ field, id }));
    },
    [dispatch, id]
  );

  const removeFieldHandler = useCallback(
    (name: string) => {
      dispatch(removeField({ name, id }));
    },
    [dispatch, id]
  );

  const addNestedFieldHandler = useCallback(
    (fieldName: string) => {
      const nestedFieldName = prompt("Enter nested field name") || "";
      if (!nestedFieldName) {
        toast.error("Please enter a valid name.");
        return;
      }

      const currentField = fields.find((field) => field.name === fieldName);
      if (
        !currentField ||
        currentField.nestedFields?.some((f) => f.name === nestedFieldName)
      ) {
        toast.error("Field already exists.");
        return;
      }

      const nestedFieldColor =
        nestedFieldColors[currentField.color as keyof typeof nestedFieldColors];
      const newNestedField = {
        name: nestedFieldName,
        color: nestedFieldColor,
        verticalLevel: 0,
        reports: reports.reduce((acc, report) => {
          acc[report.name] = 0;
          return acc;
        }, {} as ReportFields),
      };

      dispatch(
        updateField({
          field: {
            ...currentField,
            nestedFields: [
              ...(currentField.nestedFields || []),
              newNestedField,
            ],
            isExpanded: true,
          },
          id,
        })
      );
    },
    [dispatch, fields, id, reports]
  );

  const removeNestedFieldHandler = useCallback(
    (fieldName: string, nestedFieldName: string) => {
      const fieldToUpdate = fields.find((field) => field.name === fieldName);
      if (!fieldToUpdate) return;

      const updatedNestedFields = fieldToUpdate.nestedFields?.filter(
        (field) => field.name !== nestedFieldName
      );
      if (!updatedNestedFields) return;

      dispatch(
        updateField({
          field: {
            ...fieldToUpdate,
            nestedFields: updatedNestedFields,
          },
          id,
        })
      );
    },
    [dispatch, fields, id]
  );

  const addReportHandler = useCallback(() => {
    const name = prompt("Enter report name") || "";
    if (!name) return;

    if (reports.some((report) => report.name === name)) {
      toast.error("Report already exists.");
      return;
    }

    dispatch(addReport({ report: { name }, id }));
  }, [dispatch, reports, id]);

  const deleteReportHandler = useCallback(
    (name: string) => {
      dispatch(removeReport({ id, name }));
    },
    [dispatch, id]
  );

  const toggleExpandField = useCallback(
    (fieldName: string) => {
      const fieldToUpdate = fields.find((field) => field.name === fieldName);
      if (!fieldToUpdate) return;

      dispatch(
        updateField({
          field: {
            ...fieldToUpdate,
            isExpanded: !fieldToUpdate.isExpanded,
          },
          id,
        })
      );
    },
    [dispatch, fields, id]
  );

  return {
    fields,
    reports,
    error,
    setError,
    addFieldHandler,
    removeFieldHandler,
    addNestedFieldHandler,
    removeNestedFieldHandler,
    addReportHandler,
    deleteReportHandler,
    toggleExpandField,
    updateFieldHandler,
  };
};
