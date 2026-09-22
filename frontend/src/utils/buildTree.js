
export const buildTree = (currentId, ancestors, relationships, pathVisited = new Set()) => {
    console.log(currentId);
    if (pathVisited.has(currentId)) return null;
    const nextVisited =  new Set(pathVisited).add(currentId);

    const ancestor = ancestors.find(a => a.ancestor_id === currentId);
    
    const spouse = relationships.filter(r => r.ancestor_id === currentId && (r.relation_type === 'spouse')).map(r => buildTree(r.relation_id, ancestors, relationships, nextVisited)).filter(Boolean)[0] ?? null;

    const parents = relationships.filter(r => r.ancestor_id === currentId && (r.relation_type === 'child')).map(r => buildTree(r.relation_id, ancestors, relationships, nextVisited)).filter(Boolean);

    const children = relationships.filter(r => r.ancestor_id === currentId && (r.relation_type === 'parent')).map(r => buildTree(r.relation_id, ancestors, relationships, nextVisited)).filter(Boolean);
    return { ...ancestor, spouse, parents, children};
}