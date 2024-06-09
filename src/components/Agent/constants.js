import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";

export const TableCell = ({ getValue, row, column, table }) => {
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
export const createSupplyColumns = (num) => {
    return new Array(parseInt(num)).map((val, index) => {
        const colName = "supplier " + index;
        return columnHelper.accessor(colName, {
            header: colName,
            cell: TableCell,
            meta: {
                type: "text",
            },
        })
    })
}

export const createDemandColumns = (num) => {
    return new Array(parseInt(num)).map((val, index) => {
        const colName = "demand " + index;
        return columnHelper.accessor(colName, {
            header: colName,
            cell: TableCell,
            meta: {
                type: "text",
            },
        })
    })
}