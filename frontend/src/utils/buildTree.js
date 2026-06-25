
export const buildTree = (ancestor_id, ancestors, relationships, visited = new Set()) => {
    if (visited.has(ancestor_id)) return;
    visited.add(ancestor_id);
    console.log("Relationships:", relationships);
    console.log("Count:", relationships.length);
    const ancestor = ancestors.find(a => a.ancestor_id === ancestor_id);

    const spouseRelation = relationships.find(r => (r.ancestor_id === ancestor_id || r.relation_id === ancestor_id) && (r.relation_type === 'husband' || r.relation_type === 'wife'));
    let spouse = null


    if (spouseRelation) {
        const spouseId = spouseRelation.ancestor_id === ancestor_id ? spouseRelation.relation_id : spouseRelation.ancestor_id;

        spouse = ancestors.find(a => a.ancestor_id === spouseId);

    }


    let children = relationships.filter(r => r.ancestor_id === ancestor_id && (r.relation_type === 'father' || r.relation_type === 'mother')).map(r => buildTree(r.relation_id, ancestors, relationships, visited)).filter(Boolean);
    children = children.sort((c1, c2) => new Date(c1.date_of_birth) - new Date(c2.date_of_birth));
    console.log(children);

    return { ...ancestor, spouse, children };
}