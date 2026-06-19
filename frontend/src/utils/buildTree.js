
export const buildTree = (ancestor_id, ancestors, relationships, visited = new Set()) => {
    if(visited.has(ancestor_id)) return;
    visited.add(ancestor_id);

    const ancestor = ancestors.find(a => a.ancestor_id === ancestor_id);

    console.log("ALL IDS:", ancestors.map(a => a.ancestor_id));

    const spouseRelation = relationships.find(r => (r.ancestor_id === ancestor_id || r.relation_id === ancestor_id) && (r.relation_type === 'husband' || r.relation_type === 'wife'));
    console.log("NODE:", ancestor_id);
    console.log("RELATION FOUND:", spouseRelation);
    let spouse = null

    if(spouseRelation){
        const spouseId = spouseRelation.ancestor_id === ancestor_id ? spouseRelation.relation_id : spouseRelation.ancestor_id;

        spouse = ancestors.find(a => Number(a.ancestor_id) === Number(spouseId));
        console.log(spouse);
    }


    let children = relationships.filter(r => r.ancestor_id === ancestor_id && (r.relation_type === 'father' || r.relation_type === 'mother')).map(r => buildTree(r.relation_id, ancestors, relationships));
    children = children.sort((c1,c2) => new Date(c1.date_of_birth) - new Date(c2.date_of_birth));

    return { ...ancestor, spouse, children};
}