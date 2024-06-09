import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { addTable, removeTable } from "./features/slices/financeSlice";
import FinancialTable from "./FinancialTable";
import "./app.css";

function App() {
  const tables = useAppSelector((state) => state.finance.tables);
  const dispatch = useAppDispatch();

  const addTableHandler = useCallback(() => {
    dispatch(addTable());
    toast.success("Table added successfully!");
  }, [dispatch]);

  const removeTableHandler = useCallback(
    (id: number) => {
      dispatch(removeTable(id));
    },
    [dispatch]
  );

  return (
    <div className="app">
      <div>
        <Toaster />
      </div>
      <header className="app__header">
        <button className="app__button" onClick={addTableHandler}>
          Add Table
        </button>
      </header>
      <div className="app__tables">
        {tables.length
          ? tables.map((table) => (
              <FinancialTable
                key={table.id}
                table={table}
                onClose={removeTableHandler}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
