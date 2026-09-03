

export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0, visited = new Set()) => {
    if (!ancestor) return { nodes, edges };
    console.log(ancestor);

    let currentId = String(ancestor.ancestor_id)
    if (!visited.has(currentId)) {
        visited.add(currentId);
        nodes.push({
            id: currentId,
            type: ancestor.spouse ? 'spouse' : 'ancestor',
            position: { x, y },
            data: {
                ...ancestor
            }
        })

        if(ancestor.spouse) {
            visited.add(String(ancestor.spouse.ancestor_id));
        }
    }


    if (ancestor.parents) {
        ancestor.parents?.forEach((parent) => {
            // pX : Parent X
            let parentId = String(parent.ancestor_id);
            let edgeId = `${parentId} - ${currentId}`
            let pX = x - 425;

            if (!edges.some(e => e.id === edgeId)) {
                edges.push({
                    id: edgeId,
                    source: parentId,
                    target: currentId
                })
            }

            if (!visited.has(parentId)) {

                buildNodesAndEdges(parent, nodes, edges, pX, y - 300, visited);
            }
        });
    }
    if (ancestor.children) {
        ancestor.children?.forEach((child, index) => {
            // cSpacing = Child Spacing
            // cX = Child X

            let childId = String(child.ancestor_id);
            let edgeId = `${currentId} - ${childId}`
            let cSpacing = child.spouse ? 425 * index : 850 * index;
            let cX = x - cSpacing;

            if (!edges.some(e => e.id === edgeId)) {
                edges.push({
                    id: edgeId,
                    source: currentId,
                    target: childId,
                })
            }

            if (!visited.has(childId)) {
                buildNodesAndEdges(child, nodes, edges, cX, y + 300, visited)
            }

        })
    }

    console.log(`Ancestor: ${ancestor.children} + ${ancestor.parents}`);
    return { nodes, edges };
}


// edges.push({
//     id: `${String(ancestor.ancestor_id)} - ${String(child.ancestor_id)}`,
//     source: String(child.ancestor_id),
//     target: String(ancestor.ancestor_id),
// });
// nodes.push({
//     id: String(ancestor.ancestor_id),
//     type: ancestor.spouse ? 'spouse' : 'ancestor',
//     position: { x, y },
//     data: {
//         ...ancestor
//     }
// });