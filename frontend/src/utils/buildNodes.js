

export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0) => {
    if (!ancestor) return { nodes, edges };

    nodes.push({
        id: String(ancestor.ancestor_id),
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
            id: `${String(ancestor.ancestor_id)} - ${String(child.ancestor_id)}`,
            source: String(ancestor.ancestor_id),
            target: String(child.ancestor_id),
        });
        buildNodesAndEdges(child, nodes, edges, startX, y + 350);
    });

    

    return { nodes, edges };
}