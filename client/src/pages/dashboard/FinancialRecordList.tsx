import { useMemo, useState, useCallback } from "react";
import {
  FinancialRecord,
  useFinancialRecord,
} from "../../contexts/FinancialRecordContext";
import { useTable, Column, CellProps } from "react-table";

interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      className={`w-full ${editable ? "cursor-pointer" : "cursor-default"}`}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          className="w-full bg-slate-700 px-2 py-1 rounded border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
        />
      ) : typeof value === "string" ? (
        value
      ) : (
        value?.toString() ?? ""
      )}
    </div>
  );
};

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecord();

  const updateCellRecord = useCallback(
    (rowIndex: number, columnId: string, value: any) => {
      const record = records[rowIndex];
      if (!record || !record._id) return;
      updateRecord(record._id, { ...record, [columnId]: value });
    },
    [records, updateRecord]
  );

  const columns: Array<Column<FinancialRecord>> = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={false} />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }: CellProps<FinancialRecord>) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? "")}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-1 px-3 rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center text-sm"
          >
            Delete
          </button>
        ),
      },
    ],
    [updateCellRecord, deleteRecord]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<FinancialRecord>({
      columns,
      data: records,
    });

  return (
    <div className="bg-slate-800/95 rounded-2xl p-4 overflow-hidden shadow-xl shadow-slate-900/20 animate-fade-in-up">
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full border-collapse">
          <thead>
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()} key={hg.id} className="border-b-2 border-blue-500">
                {hg.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-left p-4 text-sm uppercase tracking-wider first:rounded-tl-lg last:rounded-tr-lg"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-slate-700">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className="hover:bg-slate-700/50 transition-all duration-200 hover:translate-x-1"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="p-4 text-gray-200"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};