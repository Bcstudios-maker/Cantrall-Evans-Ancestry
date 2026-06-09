export const buildTree = (ancestor_id, relationships, ancestors, visited = new Set()) => {
    if(visited.has(ancestor_id)) return null;
    visited.add(ancestor_id);

    const ancestor = ancestors.find(a => a.ancestor_id === ancestor_id);
    const parents = relationships.filter(relation => relation.ancestor_id === ancestor_id && (relation.relation_type === 'mother' || relation.relation_type === 'father'))
    .map(relation => buildTree(relation.relation_id, relationships, ancestors, visited));
    
    return { ...ancestor, parents };
}