import React from 'react';
import { GraphCanvas, darkTheme } from 'reagraph';

const convertDataToGraph = (formattedData, criticalPath, es, lf, slack) => {
    const nodes = [];
    const edges = [];

    formattedData.forEach(({ id, dependencies }) => {
        if (id) {
            nodes.push({
                id,
                label: id,
                subLabel: `ES: ${es[id]}, LF: ${lf[id]}, Slack: ${slack[id]}`,

                style: {
                    color: '#333',
                    border: '1px solid #333',
                    width: 100,
                    padding: 10
                },
                fill: criticalPath.includes(id) ? '#4bbd7f' : '#444444'
            });
        }

        dependencies.forEach(({ id: sourceId, duration }) => {
            if (sourceId) {
                edges.push({
                    id: `e${sourceId}-${id}`,
                    source: sourceId,
                    target: id,
                    label: `${duration}`,
                    style: { stroke: '#333' },
                    labelStyle: { fill: '#333', fontWeight: 700 },
                    size: 2
                });
            }
        });
    });

    return { nodes, edges };
};

const CpmGraph = ({ data, criticalPath, es, lf, slack }) => {
    const { nodes, edges } = convertDataToGraph(data, criticalPath, es, lf, slack);

    return (
        <div style={{ position: "relative", height: '600px', width: '100%', marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
            <GraphCanvas nodes={nodes} edges={edges} labelType="all" theme={darkTheme}  layoutType="forceDirected2d" />
        </div>
    );
};

export default CpmGraph;
