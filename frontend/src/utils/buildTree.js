
export const buildTree = (currentId, ancestors, relationships, visited = new Set()) => {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const ancestor = ancestors.find(a => a.ancestor_id === currentId);
    
    const spouseRelation = relationships.find(r => r.ancestor_id === currentId && (r.relation_type === 'husband' || r.relation_type == 'wife'));
    const spouse = spouseRelation ? ancestors.find(a => a.ancestor_id === spouseRelation.relation_id) : null;
    console.log(spouse);
    const parents = relationships.filter(r => r.ancestor_id === currentId && (r.relation_type === 'son' || r.relation_type === 'daughter')).map(r => buildTree(r.relation_id, ancestors, relationships, visited)).filter(Boolean);
    console.log(parents);

    const parentIds = parents.map(p => p.ancestor_id);
    const siblings = relationships.filter(r => r.ancestor_id !== currentId && (parentIds.includes(r.relation_id) && (r.relation_type === 'son' || r.relation_type === 'daughter'))).map(r => buildTree(r.ancestor_id, ancestors, relationships, visited));
    console.log(siblings);

    return { ...ancestor, spouse, parents, siblings};
}