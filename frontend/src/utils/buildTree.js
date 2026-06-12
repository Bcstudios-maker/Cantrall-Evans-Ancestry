
export const buildTree = (ancestor_id, relationships, ancestors, spouses, visited = new Set()) => {
    if(visited.has(ancestor_id)) return null;
    visited.add(ancestor_id);

    const ancestor = ancestors.find(a => a.ancestor_id === ancestor_id);
    const parents = relationships.filter(relation => relation.ancestor_id === ancestor_id && (relation.relation_type === 'mother' || relation.relation_type === 'father'))
    .map(relation => buildTree(relation.relation_id, relationships, ancestors, spouses, visited));

    const spouseRelation = spouses.find(spouse => spouse.ancestor_id === ancestor_id && (spouse.relation_type === 'husband'));
    const spouse = spouseRelation ? ancestors.find(a => a.ancestor_id === spouseRelation.relation_id) : null;

    const siblings = relationships.filter(relation => relation.ancestor_id === ancestor.ancestor_id && (relation.relation_type === 'brother' || relation.relation_type === 'sister')).map(relation => buildTree(relation.relation_id, relationships, ancestors, spouses, visited));
    
    console.log(ancestor, parents, spouse, siblings);

    return { ...ancestor, parents, spouse, siblings};
}