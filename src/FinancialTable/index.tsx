import { useFinancialTable } from "../hooks/useFinancialTable";
import CreateFieldForm from "./utils/CreateFieldForm";
import FieldRow from "./utils/FieldRow";
import { Table } from "./utils/types";
import "./styles.css";
import { memo } from "react";

interface Props {
  table: Table;
  onClose: (id: number) => void;
}

const FinancialTable = ({ table, onClose }: Props) => {
  const { id, fields, reports } = table;
  const {
    error,
    setError,
    addFieldHandler,
    removeFieldHandler,
    toggleExpandField,
    addNestedFieldHandler,
    removeNestedFieldHandler,
    addReportHandler,
    deleteReportHandler,
    updateFieldHandler,
  } = useFinancialTable({ table });

  return (
    <section className="financial-table__wrapper">
      <header className="financial-table__header">
        <h1>Financial Table #{id}</h1>
        <button
          className="financial-table__close-btn"
          onClick={() => onClose(id)}
        >
          Close
        </button>
      </header>
      <CreateFieldForm
        error={error}
        onSubmit={addFieldHandler}
        setError={setError}
      />
      <table>
        <thead>
          <tr>
            <th className="financial-table__field-name">
              Field Name <button onClick={addReportHandler}>Add Report</button>
            </th>
            {reports.map((report, reportIndex) => (
              <th key={"report-index-" + reportIndex}>
                Report {report.name}{" "}
                <button
                  className="financial-table__button"
                  onClick={() => deleteReportHandler(report.name)}
                >
                  Delete
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <FieldRow
              key={field.name}
              field={field}
              reports={reports}
              removeFieldHandler={removeFieldHandler}
              toggleExpandField={toggleExpandField}
              addNestedFieldHandler={addNestedFieldHandler}
              updateFieldHandler={updateFieldHandler}
              removeNestedFieldHandler={removeNestedFieldHandler}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default memo(FinancialTable);
