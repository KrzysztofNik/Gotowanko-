import React from 'react';

const AgentDescription = () => {
    return (
        <div className="w-[720px] text-left">
            <h2 className="text-xl font-semibold text-main-green pb-2">About Agent Method</h2>
            <p className="text-md mb-6">
                The Agent Method is a strategic approach used to solve problems where an agent (an individual or a system)
                must make decisions that optimize a specific goal within a set of constraints. This method is commonly used
                in scenarios such as negotiating, resource allocation, and automated decision-making processes in AI systems.
                The agent evaluates possible actions or choices and selects those that maximize benefits or minimize costs
                based on the given constraints.
            </p>
            <h3 className="text-xl font-semibold text-main-green pb-2">How to Use This Solver</h3>
            <ul className="text-left mx-auto" style={{ maxWidth: '800px' }}>
                <li><b>Adding an Agent Configuration:</b> Click the "+" button to add a new agent configuration. This allows you to define a new set of parameters for the agent to consider.</li>
                <li><b>Removing an Agent Configuration:</b> Click the "-" button to remove the last agent configuration from the list. This is useful for adjusting your problem size and complexity.</li>
                <li><b>Agent's Choices:</b> In the relevant input field, enter the possible actions or choices that the agent can make. These should reflect the different strategies or paths the agent can take.</li>
                <li><b>Constraints:</b> Specify any constraints or rules that the agent must follow in another input field. These constraints might include resource limits, legal restrictions, or other conditions that affect the agent's decisions.</li>
                <li><b>Calculating the Optimal Path:</b> After configuring the agents and their constraints, click the "Calculate" button to analyze the situation and find the optimal strategy or decision path for the agent based on the entered data.</li>
            </ul>
        </div>
    );
}

export default AgentDescription;
