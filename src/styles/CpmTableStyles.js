import {createTheme} from "react-data-table-component";

const primaryColor = '#DEE4EA';
export const CpmTableStyles = {
    rows: {
        style: {
            minHeight: '60px', // override the row height
        },
    },
    headRow: {
        style: {
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: primaryColor,
        },
    },
    headCells: {
        style: {
            justifyContent: 'center',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontWeight: '700',
            fontSize: '1.25rem'
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

createTheme('solarized', {
    text: {
        primary: primaryColor,
        secondary: '#2aa198',
    },
    background: {
        default: 'transparent',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: primaryColor,
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark');