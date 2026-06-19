

export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0) => {
    if (!ancestor) return { nodes, edges };


    nodes.push({
        id: ancestor.ancestor_id.toString(),
        type: ancestor.spouse ? 'spouse' : 'ancestor',
        position: {x, y},
        data: {
            ...ancestor
        }
    });

    ancestor.children?.forEach((child, index) => {
        if(!child) return;
        let spacing = 500;
        let startX = x - 300 + (index * spacing);
        edges.push({
            id: `${ancestor.ancestor_id} - ${child.ancestor_id}`,
            source: ancestor.ancestor_id.toString(),
            target: child.ancestor_id.toString(),
        });
        buildNodesAndEdges(child, nodes, edges, startX, y + 350);
    });

    

    return { nodes, edges };
}