// export const columns = [
//     {
//         name: 'Activity',
//         center: true,
//         selector: row => row.activity,
//     },
//     {
//         name: 'Preceding Activity',
//         center: true,
//         selector: row => row.preActivity,
//     },
//     {
//         name: 'Duration',
//         center: true,
//         selector: row => row.duration,
//     },
//     {
//         name: "Edit",
//         center: true,
//         selector: row => row.editButton,
//         button: true,
//     },
//     {
//         name: "Delete",
//         center: true,
//         selector: row => row.deleteButton,
//         button: true,
//     },
// ];
//
// export const mockData = [
//     {
//         id: 1,
//         activity: 'A',
//         preActivity: "-",
//         duration: 15,
//         editButton: <button onClick={() => deleteDataHandler(2)}>edit</button>,
//         deleteButton: <button onClick={() => deleteDataHandler(1)}>delete</button>
//     }, {
//         id: 2,
//         activity: 'B',
//         preActivity: "A",
//         duration: 20,
//         editButton: <button onClick={() => deleteDataHandler(2)}>edit</button>,
//         deleteButton: <button onClick={() => deleteDataHandler(2)}>delete</button>
//     },
// ];

import {createColumnHelper} from "@tanstack/react-table";

