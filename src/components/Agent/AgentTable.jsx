import {useState} from "react";
import AgentTransportCostTable from "./AgentTransportCostTable";

export const AgentTable = () => {
    const [suppliersNum, setSuppliersNum] = useState("0");
    const [receiversNum, setReceiversNum] = useState("0");
    const [numbersProvided, setNumbersProvided] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (parseInt(suppliersNum) <= 0) {
            alert("Invalid suppliers number!")
            return;
        }
        if ( parseInt(receiversNum) <= 0) {
            alert("Invalid receivers number!")
            return;
        }
        setNumbersProvided(true);
    }

    return (
        <>
            <form
                onSubmit={submitHandler}
                className="w-[720px] my-20 flex flex-col items-center gap-10 text-xl"
            >
                <label className="flex gap-10 justify-center items-center">
                    How many suppliers?
                    <input
                        type="number"
                        name="suppliers-num"
                        onChange={(e) => {
                            setNumbersProvided(false);
                            setSuppliersNum(e.target.value)}
                        }
                        className="rounded-lg w-24 p-[5px] text-[1rem] text-center text-second-text font-bold border-2 border-second-text"
                    />
                </label>

                <label className="flex gap-10 justify-center items-center">
                    How many receivers?
                    <input type="number"
                           name="receivers-num"
                           onChange={(e) => {
                               setNumbersProvided(false);
                               setReceiversNum(e.target.value)
                           }}
                           className="rounded-lg w-24 p-[5px] text-[1rem] text-center text-second-text font-bold border-2 border-second-text"
                    />
                </label>

                <button
                    type="submit"
                    className="w-[35%] p-3 bg-main-green rounded-md hover:scale-105 duration-200"
                >
                    Generate inputs
                </button>
            </form>

            {
                numbersProvided &&
                <AgentTransportCostTable suppliersNum={suppliersNum} receiversNum={receiversNum}/>
            }
        </>
    );
};

export default AgentTable;
