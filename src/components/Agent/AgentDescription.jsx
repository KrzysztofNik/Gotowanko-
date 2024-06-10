import React from 'react';

const AgentDescription = () => {
    return (
        <div className="w-[1000px] text-left">
            <h2 className="text-xl font-semibold text-main-green pb-2">About Transportation Problem Solver</h2>
            <p className="text-md mb-6">
                The Transportation Problem Solver is used to optimize the allocation of resources from suppliers to receivers in the most cost-effective manner. This method is commonly used in logistics, supply chain management, and other fields where efficient resource distribution is crucial. The solver considers the supply available at each supplier, the demand required by each receiver, the costs of purchasing and transporting resources, and the selling prices at the receivers.
            </p>
            <h3 className="text-xl font-semibold text-main-green pb-2">How to Use This Solver</h3>
            <ul className="text-left mx-auto" style={{ maxWidth: '1000px' }}>
                <li><b>Entering Supply of Suppliers:</b> In the table labeled "Supply of suppliers," enter the quantity of resources each supplier has available.</li>
                <li><b>Entering Purchase Costs:</b> In the table labeled "Purchase Price," enter the unit costs of purchasing resources from each supplier.</li>
                <li><b>Entering Demand of Receivers:</b> In the table labeled "Demand of receivers," enter the quantity of resources each receiver requires.</li>
                <li><b>Entering Selling Prices:</b> In the table labeled "Sell Price," enter the unit selling prices for each receiver.</li>
                <li><b>Entering Unit Transportation Costs:</b> In the "Transportation Costs Matrix," enter the unit transportation costs of resources from each supplier to each receiver. Each field represents the transportation cost between a specific supplier and receiver.</li>
                <li><b>Adding Rows:</b> Click the "+" button to add a new row to the table, allowing you to input additional suppliers or receivers.</li>
                <li><b>Removing Rows:</b> Click the "-" button to remove the last row from the table.</li>
                <li><b>Calculating the Solution:</b> After entering all the data, click the "Calculate" button to find the optimal solution to the transportation problem based on the provided data.</li>
            </ul>
        </div>
    );
}

export default AgentDescription;
