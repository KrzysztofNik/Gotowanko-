import { useState } from "react";
import Table from "./Table";
import MatrixTable from "./MatrixTable";
import {solveTransportationProblem} from "../../logic";
import InfoHeader from "../../UI/InfoHeader"; // Import the solve function

export const AgentTransportCostTable = ({ suppliersNum, receiversNum }) => {
    const createInitialData = (num, name) => {
        const data = {};
        for (let i = 1; i <= num; i++) {
            data[`${name}${i}`] = 0;
        }
        return [data];
    };

    const createColNames = (num, name) => {
        const names = [];
        for (let i = 1; i <= num; i++) {
            names.push(`${name}${i}`);
        }
        return names;
    }

    const createInitialMatrix = (suppliersNum, receiversNum) => {
        const matrix = [];
        for (let i = 0; i < suppliersNum; i++) {
            let row = {};
            for (let j = 0; j < receiversNum; j++) {
                row[`receiver${j + 1}`] = 0; // Initialize each field as 0
            }
            matrix.push(row); // Add row to the matrix
        }
        return matrix;
    };

    const validateData = (data, num, name) => {
        let errorMessages = "";
        for (let i = 1; i <= num; i++) {
            const key = `${name}${i}`;
            if (parseInt(data[key]) < 0) {
                errorMessages += `${key} data is invalid. It must be a non-negative number.\n`;
            }
        }
        return errorMessages;
    }

    const [supplyData, setSupplyData] = useState(createInitialData(suppliersNum, "supplier"));
    const [purchasePrice, setPurchasePrice] = useState(createInitialData(suppliersNum, "purchasePrice"))
    const [demandData, setDemandData] = useState(createInitialData(receiversNum, "receiver"));
    const [sellPrice, setSellPrice] = useState(createInitialData(receiversNum, "sellPrice"))
    const [data, setData] = useState(createInitialMatrix(suppliersNum, receiversNum));
    const [solution, setSolution] = useState(null);
    const [finalProfit, setFinalProfit] = useState(null);

    const convertToArray = (obj, num, name) => {
        return Array.from({ length: num }, (_, i) => parseFloat(obj[`${name}${i + 1}`]));
    }

    const convertMatrixToArray = (matrix, suppliersNum, receiversNum) => {
        const result = [];
        for (let i = 0; i < suppliersNum; i++) {
            const row = [];
            for (let j = 0; j < receiversNum; j++) {
                row.push(parseFloat(matrix[i][`receiver${j + 1}`]));
            }
            result.push(row);
        }
        return result;
    }

    const convertSolutionToObject = (solution, suppliersNum, receiversNum) => {
        const result = [];
        for (let i = 0; i < suppliersNum; i++) {
            const row = {};
            for (let j = 0; j < receiversNum; j++) {
                row[`receiver${j + 1}`] = solution[i][j];
            }
            row["supplierName"] = `supplier${i + 1}`;
            result.push(row);
        }
        return result;
    }

    const calculateSolution = () => {
        let errorMessage = "";
        errorMessage += validateData(supplyData[0], suppliersNum, "supplier");
        errorMessage += validateData(purchasePrice[0], suppliersNum, "purchasePrice");
        errorMessage += validateData(demandData[0], receiversNum, "receiver");
        errorMessage += validateData(sellPrice[0], receiversNum, "sellPrice");

        data.forEach((row, index) => {
            errorMessage += validateData(row, receiversNum, `receiver${index + 1}`);
        });

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        const supply = convertToArray(supplyData[0], suppliersNum, "supplier");
        const purchaseCosts = convertToArray(purchasePrice[0], suppliersNum, "purchasePrice");
        const demand = convertToArray(demandData[0], receiversNum, "receiver");
        const sellingPrices = convertToArray(sellPrice[0], receiversNum, "sellPrice");
        const costs = convertMatrixToArray(data, suppliersNum, receiversNum);

        console.log("supply", supplyData)
        console.log("demand", demandData)
        console.log("costs", costs)
        console.log("sellingPrices", sellingPrices)
        console.log("purchaseCosts", purchaseCosts)
        const solution = solveTransportationProblem(supply, demand, costs, sellingPrices, purchaseCosts);
        console.log("Solution:", solution);
        setFinalProfit(solution.finalProfit)

        const formattedSolution = convertSolutionToObject(solution.solution, suppliersNum, receiversNum);
        console.log("Formatted Solution:", formattedSolution);

        setSolution(formattedSolution); // Store the formatted solution in state
    }

    return (
        <>
            <InfoHeader>Insert supply of suppliers</InfoHeader>
            <Table
                colNames={createColNames(suppliersNum, "supplier")}
                data={supplyData}
                setData={setSupplyData}
            />

            <InfoHeader>Insert price of purchase of suppliers</InfoHeader>
            <Table
                colNames={createColNames(suppliersNum, "purchasePrice")}
                data={purchasePrice}
                setData={setPurchasePrice}
            />

            <InfoHeader>Insert demand of receivers</InfoHeader>
            <Table
                colNames={createColNames(receiversNum, "receiver")}
                data={demandData}
                setData={setDemandData}
            />

            <InfoHeader>Insert sell price of receivers</InfoHeader>
            <Table
                colNames={createColNames(receiversNum, "sellPrice")}
                data={sellPrice}
                setData={setSellPrice}
            />

            <InfoHeader>Insert unitary costs of transportation</InfoHeader>
            <MatrixTable
                data={data}
                setData={setData}
                suppliersNum={suppliersNum}
                receiversNum={receiversNum}
            />
            <button
                className='flex justify-center items-center h-10 w-56 mt-10 font-bold text-center border-[#4bbd7f] border-solid border-2 p-2 hover:bg-[#4bbd7f] hover:text-white hover:scale-105 transition duration-200'
                onClick={calculateSolution}
            >
                Calculate
            </button>
            {solution && (
                <div>
                    <InfoHeader color={"main-green"}>Solution</InfoHeader>
                    <InfoHeader fontSize="1.1rem">Final profit: {finalProfit}</InfoHeader>
                    <MatrixTable
                        data={solution}
                        setData={() => {}}
                        suppliersNum={suppliersNum}
                        receiversNum={receiversNum}
                        readOnly={true}
                    />
                </div>
            )}
        </>
    );
};

export default AgentTransportCostTable