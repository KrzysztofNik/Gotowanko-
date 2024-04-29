import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import "../styles/table.css";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

const defaultData= [
    {
        activity: "",
        preActivity: "",
        duration: null,
    },
];
const TableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    const onBlur = () => {
        tableMeta?.updateData(row.index, column.id, value);
    };
    const onSelectChange = (e) => {
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
    };
    return columnMeta?.type === "select" ? (
        <select onChange={onSelectChange} value={initialValue}>
            {columnMeta?.options?.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    ) : (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            type={columnMeta?.type || "text"}
        />
    );
};

const columnHelper = createColumnHelper();
export const columns = [
    columnHelper.accessor("activity", {
        header: "Activity",
        cell: TableCell,
        meta: {
            type: "text",
        },
    }),
    columnHelper.accessor("preActivity", {
        header: "Preceding Activity",
        cell: TableCell,
        meta: {
            type: "text",
        },
    }),
    columnHelper.accessor("duration", {
        header: "Duration",
        cell: TableCell,
        meta: {
            type: "number",
        },
    }),
];

export const CpmTable = () => {
    const [data, setData] = useState(() => [...defaultData]);
    const [originalData, setOriginalData] = useState(() => [...defaultData]);
    const [editedRows, setEditedRows] = useState({});
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            editedRows,
            setEditedRows,
            revertData: (rowIndex, revert) => {
                if (revert) {
                    setData((old) =>
                        old.map((row, index) =>
                            index === rowIndex ? originalData[rowIndex] : row
                        )
                    );
                } else {
                    setOriginalData((old) =>
                        old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
                    );
                }
            },
            updateData: (rowIndex, columnId, value) => {
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            },
        },
    });
    return (
        <div className='flex flex-col py-10'>
            <div className='flex gap-5 '>
                <button
                    className='size-10 text-center  border-[#4bbd7f] border-solid border-2'
                    onClick={() => {
                        setData([...data, {
                            activity: "",
                            preActivity: "",
                            duration: null,
                        }
                        ])
                    }}
                >+</button>
                <button
                    className='size-10 text-center border-rose-600 border-solid border-2'
                    onClick={ () => setData(data.slice(0, data.length -1)) }
                >-</button>
                <button
                    className='h-10 w-28 text-center border-[#4bbd7f] border-solid border-2'
                    onClick={() => {}}
                >
                    Calculate
                </button>
            </div>
            <table>
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {/*<pre>{JSON.stringify(data, null, "\t")}</pre>*/}

        </div>
    );
};

export default CpmTable;