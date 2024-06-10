import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import "../../styles/table.css";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { calculateCPM } from "../../logic";
import CpmGraph from "./CpmGraph";
import InfoHeader from "../../UI/InfoHeader";

const defaultData = [
    {
        activity: "",
        precedingActivities: "",
        durations: null,
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
    const [originalData, setOriginalData] = useState(() => [...defaultData]);
    const [editedRows, setEditedRows] = useState({});
    const [graphData, setGraphData] = useState(null);
    //const [criticalPath, setCriticalPath] = useState([]);
    const [solution, setSolution] = useState(null);

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

    const calculateSolution = () => {
        const formattedData = data.map(el => {
            let preActs = el.precedingActivities.split(",").map(ac => ac.trim());
            preActs = preActs.map(p => {
                if (p.trim() === "-" || p.trim() === "") {
                    return null;
                } else {
                    return p;
                }
            }).filter(Boolean);

            const durations = el.durations.split(",").map(d => d.trim()).filter(Boolean);

            const dependencies = preActs.map((act, index) => ({
                id: act,
                duration: durations[index]
            }));

            return {
                id: el.activity,
                dependencies
            };
        });


        const cpmResult = calculateCPM(formattedData);
        console.log(cpmResult)
        console.log("SOLUTION", cpmResult);
        setSolution({ ...cpmResult, formattedData });
    };

    return (
        <div className='flex flex-col py-10' style={{ margin: '0 auto', maxWidth: '1200px' }}>
            <div className='flex gap-5 '>
                <button
                    className='flex justify-center items-center font-bold size-10 text-center border-[#4bbd7f] border-solid border-2 p-2 hover:bg-[#4bbd7f] hover:text-white hover:scale-110 transition duration-200'
                    onClick={() => {
                        setData([...data, {
                            activity: "",
                            precedingActivities: "",
                            durations: null,
                        }]);
                    }}
                >+</button>
                <button
                    className='flex justify-center items-center size-10 font-bold text-center border-main-red border-solid border-2 p-2 hover:bg-main-red hover:text-white hover:scale-110 transition duration-200'
                    onClick={ () => setData(data.slice(0, data.length -1)) }
                >-</button>
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
            <div className="w-full flex justify-center">
                <button
                    className='flex justify-center items-center h-10 w-36 font-bold text-center border-[#4bbd7f] border-solid border-2 p-2 hover:bg-[#4bbd7f] hover:text-white hover:scale-105 transition duration-200'
                    onClick={calculateSolution}
                >
                    Calculate
                </button>
            </div>
            {solution && (<>
                <InfoHeader color="main-green">Solution</InfoHeader>
                <InfoHeader fontSize="1rem">Critical path value: {solution.criticalPathValue}</InfoHeader>
                <CpmGraph
                    data={solution.formattedData}
                    criticalPath={solution.criticalPath}
                    es={solution.es}
                    lf={solution.lf}
                    slack={solution.slack}
                />
            </>)}
        </div>
    );
};

export default CpmTable;
