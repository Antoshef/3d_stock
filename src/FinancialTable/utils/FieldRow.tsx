import { Fragment } from "react/jsx-runtime";
import Tooltip from "../../components/Tooltip";
import NestedFieldRow from "./NestedFieldRow";
import { Field, Report } from "./types";
import { memo } from "react";

interface Props {
  field: Field;
  reports: Report[];
  removeFieldHandler: (name: string) => void;
  toggleExpandField: (name: string) => void;
  addNestedFieldHandler: (fieldName: string) => void;
  updateFieldHandler: (field: Field) => void;
  removeNestedFieldHandler: (
    fieldName: string,
    nestedFieldName: string
  ) => void;
}

const FieldRow = ({
  field,
  reports,
  removeFieldHandler,
  toggleExpandField,
  addNestedFieldHandler,
  updateFieldHandler,
  removeNestedFieldHandler,
}: Props) => {
  return (
    <Fragment key={field.name}>
      <tr style={{ backgroundColor: field.color }}>
        <td className="financial-table__field">
          <Tooltip text="Click to remove">
            <button
              className="financial-table__button"
              onClick={() => removeFieldHandler(field.name)}
            >
              X
            </button>
          </Tooltip>
          <p
            className={`financial-table__field-label ${
              field.nestedFields ? "financial-table__field-label--expanded" : ""
            }`}
            onClick={() => toggleExpandField(field.name)}
          >
            {field.name}
          </p>
          <Tooltip text="Add nested field">
            <button
              className="financial-table__button"
              onClick={() => addNestedFieldHandler(field.name)}
            >
              +
            </button>
          </Tooltip>
        </td>
        {reports.map((report, reportIndex) => (
          <td
            key={`${field.name}-report-${reportIndex}`}
            style={{ backgroundColor: field.color }}
          >
            <input
              type="number"
              value={field.reports ? field.reports[report.name] || 0 : 0}
              onChange={(e) => {
                updateFieldHandler({
                  ...field,
                  reports: {
                    ...field.reports,
                    [report.name]: parseInt(e.target.value, 10),
                  },
                });
              }}
            />
          </td>
        ))}
      </tr>
      {field.isExpanded &&
        field.nestedFields &&
        field.nestedFields.map((nestedField) => (
          <NestedFieldRow
            key={`${field.name}-${nestedField.name}`}
            field={field}
            nestedField={nestedField}
            reports={reports}
            removeNestedFieldHandler={removeNestedFieldHandler}
            updateFieldHandler={updateFieldHandler}
          />
        ))}
    </Fragment>
  );
};

export default memo(FieldRow);
