import { memo } from "react";
import Tooltip from "../../components/Tooltip";
import { Field, Report } from "./types";

interface Props {
  field: Field;
  nestedField: Field;
  reports: Report[];
  removeNestedFieldHandler: (
    fieldName: string,
    nestedFieldName: string
  ) => void;
  updateFieldHandler: (field: Field) => void;
}

const NestedFieldRow = ({
  field,
  nestedField,
  reports,
  removeNestedFieldHandler,
  updateFieldHandler,
}: Props) => {
  return (
    <tr>
      <td
        style={{ backgroundColor: nestedField.color }}
        className="nested-field"
      >
        <Tooltip text="Click to remove">
          <button
            className="nested-field__button"
            onClick={() =>
              removeNestedFieldHandler(field.name, nestedField.name)
            }
          >
            X
          </button>
        </Tooltip>
        <p className="nested-field__label">{nestedField.name}</p>
      </td>
      {reports.map((report, reportIndex) => (
        <td
          key={`${nestedField.name}-report-${reportIndex}`}
          style={{ backgroundColor: nestedField.color }}
        >
          <input
            type="number"
            value={
              nestedField.reports ? nestedField.reports[report.name] || 0 : 0
            }
            onChange={(e) => {
              updateFieldHandler({
                ...field,
                nestedFields: field.nestedFields?.map((f) =>
                  f.name === nestedField.name
                    ? {
                        ...nestedField,
                        reports: {
                          ...nestedField.reports,
                          [report.name]: parseInt(e.target.value, 10),
                        },
                      }
                    : f
                ),
              });
            }}
          />
        </td>
      ))}
    </tr>
  );
};

export default memo(NestedFieldRow);
