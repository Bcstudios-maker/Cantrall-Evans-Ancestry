export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0, visited = new Set(), isSpouse = false) => {
    if (!ancestor) return { nodes, edges };
    console.log('ancestor info: ' + ancestor.first_name);
    console.log('spouse ' + ancestor.spouse?.first_name);

    const GAP = 52; // Gap between spouse cards. Good for parents.
    const CARD_WIDTH = 450; // Self Explanitory
    const SPOUSE_WIDTH = (CARD_WIDTH * 2) + GAP; // Total width of a spouse card.

    let currentId = String(ancestor.ancestor_id);
    let spouseId = String(ancestor.spouse?.ancestor_id);
    let cardType = ancestor.spouse ? 'spouse' : 'ancestor';
    let combinedId = ancestor.spouse ? String(Number(currentId) + Number(spouseId)) : null;

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
        ancestor.spouse.spouse = ancestor;
        buildNodesAndEdges(ancestor.spouse, nodes, edges, x + (CARD_WIDTH + GAP), y, visited, true);
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
                    id: `${parentId} - ${currentId}`,
                    source: parentId,
                    sourceHandle: parent.spouse ? `ss${parentId}` : `as${parentId}`,
                    target: ancestor.spouse ? combinedId : currentId,
                    targetHandle: ancestor.spouse ? `ss${currentId}` : `at${currentId}`
                });

            }

            let parentX = isSpouse ? secondCardEdge : firstCardEdge;

            buildNodesAndEdges(parent, nodes, edges, parentX, y - 350, visited, false );
        })
    }

    if (ancestor.children) {

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