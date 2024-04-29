// import DataTable from "react-data-table-component";
// import { CpmTableStyles } from "../styles/CpmTableStyles";
// import { useState } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { IoMdAdd } from "react-icons/io";
// import { columns, mockData } from "../constants/dataTableColumns";
//
// const CpmTable = () => {
//     const [activity, setActivity] = useState({
//         id: null,
//         activity: '',
//         preActivity: '',
//         duration: 0,
//     });
//     const [data, setData] = useState(mockData);
//     const [isEditing, setIsEditing] = useState(false);
//
//     // Unique ID generator
//     const generateUniqueId = () => {
//         return data.reduce((maxId, row) => Math.max(row.id, maxId), 0) + 1;
//     };
//
//     const inputsData = [
//         { id: "activity", type: "text", value: activity.activity },
//         { id: "preActivity", type: "text", value: activity.preActivity },
//         { id: "duration", type: "number", value: activity.duration },
//     ];
//
//     const deleteDataHandler = (id) => {
//         setData(data.filter(row => row.id !== id));
//     };
//
//     const editDataHandler = (id) => {
//         console.log(id)
//         console.log(data);
//         const activityToEdit = data.find(row => row.id.toString() === id.toString());
//         console.log(Boolean(activityToEdit));
//         console.log(activityToEdit);
//         if (activityToEdit) {
//             setActivity({ ...activityToEdit });
//             setIsEditing(true);
//         }
//     };
//
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//
//         // Simple form validation
//         if (!activity.activity || activity.duration <= 0) {
//             alert('Please fill in all fields correctly.');
//             return;
//         }
//
//         if (isEditing) {
//             // Update the data with edited activity
//             setData(data.map(row => row.id === activity.id ? activity : row));
//         } else {
//             // Add new activity
//             const id = generateUniqueId();
//             console.log(id)
//             const newActivity = {
//                 ...activity,
//                 id,
//                 editButton: <FaRegEdit cursor="pointer" size="1.40rem" onClick={() => editDataHandler(id)} />,
//                 deleteButton: <MdDelete cursor="pointer" size="1.40rem" onClick={() => deleteDataHandler(id)} />
//             };
//             console.log([...data, newActivity])
//             setData([...data, newActivity]);
//         }
//
//         // Reset the form
//         setActivity({
//             id: null,
//             activity: '',
//             preActivity: '',
//             duration: 0,
//         });
//         setIsEditing(false);
//     };
//
//     const newActivityChangeHandler = (e) => {
//         const { id, value } = e.target;
//         setActivity({ ...activity, [id]: value });
//     };
//
//     return (
//         <div className='w-[800px]'>
//             <form onSubmit={handleFormSubmit} className='flex flex-col mb-16 items-center'>
//                 <div className='flex gap-4'>
//                     {inputsData.map((input, index) =>
//                         <input
//                             key={index}
//                             className='w-[200px] h-10 mx-2 text-black font-semibold text-xl px-5'
//                             value={input.value}
//                             id={input.id}
//                             type={input.type}
//                             onChange={newActivityChangeHandler}
//                         />
//                     )}
//                     <button type="submit" className='w-[50px] h-10 py-1 bg-white flex items-center justify-center text-black'>
//                         {isEditing ? 'Save' : <IoMdAdd />}
//                     </button>
//                 </div>
//             </form>
//             <DataTable
//                 customStyles={CpmTableStyles}
//                 theme='solarized'
//                 columns={columns}
//                 data={data}
//                 responsive={true}
//             />
//         </div>
//     );
// }
//
// export default CpmTable;

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
        studentId: null,
        name: "",
        dateOfBirth: "",
        major: "",
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
        <>
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
        </>
    );
};

export default CpmTable;