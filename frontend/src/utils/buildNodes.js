export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0) => {
    if (!ancestor) return {nodes, edges};

    nodes.push({
        id: ancestor.ancestor_id.toString(),
        type: 'ancestor',
        position: {x, y},
        data: {
            ...ancestor
        }
    });

    ancestor.parents?.forEach((parent, index) => {
        edges.push({
            id: `${ancestor.ancestor_id} - ${parent.ancestor_id}`,
            source: ancestor.ancestor_id.toString(),
            target: parent.ancestor_id.toString(),
            sourceHandle: 'bottom',
            targetHandle: 'top'
        });
        buildNodesAndEdges(parent, nodes, edges, x + (index * 250) - 125, y - 150);
    });

    return {nodes, edges};
}