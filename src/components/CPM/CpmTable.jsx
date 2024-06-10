    import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
    import "../../styles/table.css";
    import {
        createColumnHelper,
        flexRender,
        getCoreRowModel,
        useReactTable,
    } from "@tanstack/react-table";
    import {calculateCPM} from "../../logic";
    import {TableCell} from "../Agent/constants";

    const defaultData= [
        {
            activity: "",
            precedingActivities: "",
            durations: null,
        },
    ];

    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("activity", {
            header: "Activity",
            cell: TableCell,
            meta: {
                type: "text",
            },
        }),
        columnHelper.accessor("precedingActivities", {
            header: "Preceding Activities",
            cell: TableCell,
            meta: {
                type: "text",
            },
        }),
        columnHelper.accessor("durations", {
            header: "Durations",
            cell: TableCell,
            meta: {
                type: "text",
            },
        }),
    ];

    export const CpmTable = () => {
        const [data, setData] = useState(() => [...defaultData]);
        const [editedRows, setEditedRows] = useState({});

        const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            meta: {
                editedRows,
                setEditedRows,
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

        const calculateSolution = () => {
            console.log(data);
            const formattedData = data.map(el => {
                console.log(el);
                let preActs = el.precedingActivities.split(",").map(ac => ac.trim());
                preActs = preActs.map(p => {
                    if (p.trim() == false || p.trim() === "-") {
                        return null
                    } else {
                        return p;
                    }
                })

                // Trzeba sprawdzić czy to jest git
                const preActNumber = preActs.length;

                let durations = el.durations.split(",").map(ac => ac.trim());
                durations = durations.map(d => {
                    if (d.trim() == false || d.trim() === "-") {
                        return null
                    } else {
                        return d;
                    }
                })

                const dependencies = new Array(preActNumber);
                for (let i = 0; i < preActNumber; i++) {
                    dependencies[i] = {
                        id: preActs[i],
                        duration: durations[i]
                    }
                }

                return {
                    id: el.activity,
                    dependencies
                }
            });
            console.log(formattedData);
        }

        return (
            <div className='flex flex-col py-10'>
                <div className='flex gap-5 '>
                    <button
                        className='size-10 text-center border-[#4bbd7f] border-solid border-2 p-2 hover:bg-[#4bbd7f] hover:text-white hover:scale-110 transition duration-200'
                        onClick={() => {
                            setData([...data, {
                                activity: "",
                                preActivity: "",
                                duration: null,
                            }]);
                        }}
                    >+</button>
                    <button
                        className='size-10 text-center border-main-red border-solid border-2 p-2 hover:bg-main-red hover:text-white hover:scale-110 transition duration-200'
                        onClick={ () => setData(data.slice(0, data.length -1)) }
                    >-</button>
                    <button
                        className='h-10 w-28 text-center border-[#4bbd7f] border-solid border-2 p-2 hover:bg-[#4bbd7f] hover:text-white hover:scale-105 transition duration-200'
                        onClick={calculateSolution}
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