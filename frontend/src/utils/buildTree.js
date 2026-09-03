
export const buildTree = (currentId, ancestors, relationships, visited = new Set()) => {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const ancestor = ancestors.find(a => a.ancestor_id === currentId);
    
    const spouseRelation = relationships.find(r => r.ancestor_id === currentId && (r.relation_type === 'spouse'));
    const spouse = spouseRelation ? ancestors.find(a => a.ancestor_id === spouseRelation.relation_id) : null;
    console.log("Spouse: " + spouse);
    const parents = relationships.filter(r => r.ancestor_id == currentId && (r.relation_type === 'child')).map(r => buildTree(r.relation_id, ancestors, relationships, visited)).filter(Boolean);
    console.log("Parents: " + parents);

    const children = relationships.filter(r => r.ancestor_id === currentId && (r.relation_type === 'parent')).map(r => buildTree(r.relation_id, ancestors, relationships, visited)).filter(Boolean);
    console.log("Children: " + children);

    
    return { ...ancestor, spouse, parents, children};
}