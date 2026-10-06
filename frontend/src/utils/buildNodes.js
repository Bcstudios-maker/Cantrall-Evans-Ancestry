export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0, visited = new Set(), isSpouse = false, ancestorSpouseId = null) => {
    if (!ancestor) return { nodes, edges };
    console.log('ancestor info: ' + ancestor.first_name);
    console.log('spouse ' + ancestor.spouse?.first_name);

    const GAP = 52; // Gap between spouse cards. Good for parents.
    const CARD_WIDTH = 450; // Self Explanitory
    const SPOUSE_WIDTH = (CARD_WIDTH * 2) + GAP; // Total width of a spouse card.

    let currentId = String(ancestor.ancestor_id);
    let spouseId = String(ancestor.spouse?.ancestor_id);
    let cardType = ancestor.spouse ? 'spouse' : 'ancestor';
    let combinedId = ancestor.spouse ? String(Number(currentId) + Number(ancestor.spouse.ancestor_id)) : null;

    if (!visited.has(currentId)) {

        visited.add(currentId);

        nodes.push({
            id: ancestor.spouse ? combinedId : currentId,
            type: cardType,
            position: { x, y },
            data: {
                ...ancestor
            }
        })

    }



    if (ancestor.spouse && !visited.has(String(ancestor.spouse.ancestor_id))) {
        visited.add(spouseId);
        buildNodesAndEdges(ancestor.spouse, nodes, edges, x + (CARD_WIDTH + GAP), y, visited, true, combinedId);
    }




    if (ancestor.parents) {

        //Left edges for both ancestor cards that are apart of a spouse card.
        const firstCardEdge = x - ((SPOUSE_WIDTH / 2) + (GAP / 2));
        const secondCardEdge = x;

        ancestor.parents.forEach((parent, index) => {
            let parentId = parent.spouse ? String(Number(parent.ancestor_id) + Number(parent.spouse.ancestor_id)) : String(parent.ancestor_id);
            let edgeId = `${parentId} - ${currentId}`
            if (!edges.some(edge => edge.id === edgeId)) {
                edges.push({
                    id: edgeId,
                    source: parentId,
                    sourceHandle: parent.spouse ? `ss${parentId}` : `as${parentId}`,
                    target: ancestor.spouse ? combinedId : currentId,
                    targetHandle: ancestor.spouse ? `st${currentId}` : `at${currentId}`
                });

            }

            let parentX = isSpouse ? secondCardEdge : firstCardEdge;

            buildNodesAndEdges(parent, nodes, edges, parentX, y - 450, visited, false, null);
        });
    }

    if (ancestor.children && ancestor.spouse) {
        let childX = x;
        ancestor.children.forEach((child, index) => {
            let childId = String(child.ancestor_id);
            let combinedChildId = String(Number(child.ancestor_id) + Number(child.spouse?.ancestor_id));
            let edgeId = `${currentId} - ${childId}`;

            if (!edges.some(edge => edge.id === edgeId)) {
                edges.push({
                    id: edgeId,
                    source: combinedId,
                    sourceHandle: `ss${combinedId}`,
                    target: child.spouse ? combinedChildId : childId ,
                    targetHandle: child.spouse ? `st${childId}` : `at${childId}`
                });
            }
            //needs to be multiplied by index to determine positioning.
            childX = child.spouse ? childX - 502 : childX - 502;

            buildNodesAndEdges(child, nodes, edges, childX , y + 450, visited, false, null);
        });
    }

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