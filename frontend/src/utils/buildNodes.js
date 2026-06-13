

export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0) => {
    if (!ancestor) return { nodes, edges };
    console.log(ancestor);

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
        let spacing = 300;
        let startX = x - 250 + (index * spacing);
        edges.push({
            id: `${ancestor.ancestor_id} - ${child.ancestor_id}`,
            source: ancestor.ancestor_id.toString(),
            target: child.ancestor_id.toString(),
            sourceHand
        })
        buildNodesAndEdges(child, nodes, edges, startX, y + 150);
    });

    

    return { nodes, edges };
}