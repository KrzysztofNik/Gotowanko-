import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import "../../styles/table.css";

const MatrixTable = ({ data, setData, suppliersNum, receiversNum, readOnly = false }) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor(row => row.supplierName, {
            id: 'supplierName',
            header: () => <span>Suppliers</span>,
            cell: info => <span>{info.getValue()}</span>
        })
    ];

    for (let r = 1; r <= receiversNum; r++) {
        columns.push(columnHelper.accessor(`receiver${r}`, {
            header: () => `Receiver ${r}`,
            cell: info => {
                const value = info.getValue() ?? 0;

                if (readOnly) {
                    return <span>{value}</span>;
                }

                const handleChange = (e) => {
                    const newValue = parseFloat(e.target.value);

                    if (newValue !== value) {
                        const newData = [...data];
                        newData[info.row.index][`receiver${r}`] = newValue;
                        setData(newData);
                    }
                };

                return (
                    <input
                        type="number"
                        value={value}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-1 w-full"
                    />
                );
            }
        }));
    }

    if (data.length === 0 || data[0].supplierName === undefined) {
        const newData = data.map((item, index) => ({
            ...item,
            supplierName: `Supplier ${index + 1}`
        }));
        setData(newData);
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table>
            <thead>
            <tr>
                {table.getHeaderGroups().map(headerGroup => (
                    headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))
                ))}
            </tr>
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default MatrixTable;