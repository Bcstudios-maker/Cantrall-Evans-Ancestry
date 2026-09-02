

export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0) => {
    if (!ancestor) return { nodes, edges };


    nodes.push({
        id: String(ancestor.ancestor_id),
        type: ancestor.spouse ? 'spouse' : 'ancestor',
        position: { x, y },
        data: {
            ...ancestor
        }
    });


    ancestor.parents?.forEach((parent, index) => {
        if (!parent) return;
        let spacing = 500;
        let startX = x - 300 + (index * spacing);

        if (parent.spouse) {
            startX -= 200;
        }

        if (ancestor.siblings) {
            ancestor.siblings.forEach((sibling, index) => {
                let startX = x - 750 + (index * spacing);

                if (sibling.spouse) {
                    startX -= 300;
                }
                
                nodes.push({
                    id: String(sibling.ancestor_id),
                    type: sibling.spouse ? 'spouse' : 'ancestor',
                    position: { x: startX, y },
                    data: {
                        ...sibling
                    }
                });

                edges.push({
                    id: `${String(sibling.ancestor_id)} - ${String(sibling.ancestor_id)}`,
                    source: String(parent.ancestor_id),
                    target: String(sibling.ancestor_id),
                });
            });
        }

        edges.push({
            id: `${String(ancestor.ancestor_id)} - ${String(parent.ancestor_id)}`,
            source: String(parent.ancestor_id),
            target: String(ancestor.ancestor_id),
        });
        buildNodesAndEdges(parent, nodes, edges, startX, y - 350);
    });



    return { nodes, edges };
}