import { useState } from "react";
import Table from "./Table";
import MatrixTable from "./MatrixTable";

export const AgentTransportCostTable = ({ suppliersNum, receiversNum }) => {
    const createInitialData = (num, name) => {
        const data = { };
        for (let i = 1; i <= num; i++) {
            data[`${name}${i}`] = 0;
        }
        console.log(data)
        return [data];
    };
    // const createInitialData = (num, name) => {
    //     return new Array(num).fill(0);
    // };

    const createColNames = (num, name) => {
        const names = [ ];
        for(let i = 1; i <= num; i++) {
            names.push(`${name}${i}`)
        }
        return names;
    }

    const createInitialMatrix = (suppliersNum, receiversNum) => {

        const matrix = [];
        for (let i = 0; i < suppliersNum; i++) {
            let row = {};
            for (let j = 0; j < receiversNum; j++) {
                row[`receiver${j+1}`] = 0; // Inicjalizacja każdego pola jako 0
            }
            matrix.push(row); // Dodaje wiersz do macierzy
        }
        return matrix;
    };

    const validateData = (data, num, name) => {
        let errorMessages = "";
        for (let i = 1; i <= num; i++) {
            const key = `${name}${i}`;
            console.log(key)
            console.log(data[key])
            if (parseInt(data[key]) < 0) {
                errorMessages += `${key} data is invalid. It must be a non-negative number.\n`; // Dodanie wiadomości do łańcucha
            }
        }
        console.log(errorMessages);
        return errorMessages;
    }

    const [supplyData, setSupplyData] = useState(createInitialData(suppliersNum, "supplier"));
    const [purchasePrice, setPurchasePrice] = useState(createInitialData(suppliersNum, "purchasePrice"))
    const [demandData, setDemandData] = useState(createInitialData(receiversNum, "receiver"));
    const [sellPrice, setSellPrice] = useState(createInitialData(receiversNum, "sellPrice"))
    const [data, setData] = useState(createInitialMatrix(suppliersNum, receiversNum));

    const calculateSolution = () => {
        console.log("supp", supplyData)
        console.log("purchase price", purchasePrice)
        console.log("receiver", demandData)
        console.log("sell price", sellPrice)
        console.log("dataxd", data)

        let errorMessage = "";
        errorMessage += validateData(supplyData[0], suppliersNum, "supplier");
        errorMessage += validateData(purchasePrice[0], suppliersNum, "purchasePrice");
        errorMessage += validateData(demandData[0], receiversNum, "receiver");
        errorMessage += validateData(sellPrice[0], receiversNum, "sellPrice");

        data.forEach((row, index) => {
            errorMessage += validateData(row, receiversNum, `receiver${index+1}`);
        });

        if (errorMessage) {
            alert(errorMessage); // Wyświetlenie jednego zbiorczego komunikatu
        }
    }

    return (
        <>
            <span>Supply of suppliers</span>
            <button onClick={calculateSolution}>siema</button>
            <Table
                colNames={createColNames(suppliersNum, "supplier")}
                data={supplyData}
                setData={setSupplyData}
            />
            <Table
                colNames={createColNames(suppliersNum, "purchasePrice")}
                data={purchasePrice}
                setData={setPurchasePrice}
            />
            <Table
                colNames={createColNames(receiversNum, "receiver")}
                data={demandData}
                setData={setDemandData}
            />
            <Table
                colNames={createColNames(receiversNum, "sellPrice")}
                data={sellPrice}
                setData={setSellPrice}
            />
            <MatrixTable
                data={data}
                setData={setData}
                suppliersNum={suppliersNum}
                receiversNum={receiversNum}
            />
        </>
    );
};

export default AgentTransportCostTable;
