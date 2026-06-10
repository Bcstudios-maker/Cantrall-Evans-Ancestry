const collectSpouseIds = (ancestor, spouseIds = new Set()) => {
    if(!ancestor) return spouseIds;

    if(ancestor.spouse?.ancestor_id){
        spouseIds.add(ancestor.spouse.ancestor_id);
    }

    ancestor.parents?.forEach(parent => collectSpouseIds(parent, spouseIds));

    return spouseIds;
}

export const buildNodesAndEdges = (ancestor, nodes = [], edges = [], x = 0, y = 0, spouseIds = undefined) => {
    if(!ancestor) return {nodes, edges};
    if(spouseIds === undefined){
        spouseIds = collectSpouseIds(ancestor);
    }
    if(!ancestor || spouseIds.has(ancestor.ancestor_id)) return { nodes, edges };

    nodes.push({
        id: ancestor.ancestor_id.toString(),
        type: ancestor.spouse?.ancestor_id ? 'spouse' : 'ancestor',
        position: {x, y},
        data: {
            ...ancestor
        }
    })


    ancestor.parents?.forEach((parent, index) => {
        if(!parent) return;
        const totalParents = ancestor.parents.length;
        const spacing = 300;
        const startX = x - ((totalParents - 1) * spacing) / 2;
        edges.push({
            id: `${ancestor.ancestor_id} - ${parent.ancestor_id}`,
            source: ancestor.ancestor_id.toString(),
            target: parent.ancestor_id.toString(),
            sourceHandle: 'bottom',
            targetHandle: 'top'
        });
        buildNodesAndEdges(parent, nodes, edges, startX + (index * spacing), y - 150, spouseIds);
    });
    

    return {nodes, edges};
}