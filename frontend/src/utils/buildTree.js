
export const buildTree = (ancestor_id, ancestors, relationships, visited = new Set()) => {
    if(visited.has(ancestor_id)) return;
    visited.add(ancestor_id);

    const ancestor = ancestors.find(a => a.ancestor_id === ancestor_id);

    const spouseRelations = relationships.find(r => r.ancestor_id === ancestor_id && (r.relation_type === 'husband' || r.relation_type === 'wife'));
    const spouse = spouseRelations ? ancestors.find(a => a.ancestor_id === spouseRelations.relation_id) : null;

    let children = relationships.filter(r => r.ancestor_id === ancestor_id && (r.relation_type === 'father' || r.relation_type === 'mother')).map(r => buildTree(r.relation_id, ancestors, relationships));
    children = children.sort((c1,c2) => new Date(c1.date_of_birth) - new Date(c2.date_of_birth));

    return { ...ancestor, spouse, children};
}