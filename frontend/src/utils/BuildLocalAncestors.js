export const BuildLocalAncestors = (ancestor_id, ancestors, relationships) => {
    if(!ancestor_id) return 'CANNOT FIND LOCAL ANCESTORS OF AN ANCESTOR WITH NO ID';

    const spouseRelation = relationships.find(r => r.relation_type === 'spouse');
    const spouse = spouseRelation ? ancestors.find(a => a.ancestor_id === spouseRelation.relation_id) : null;

    const parentRelationships = relationships.filter(r => r.relation_type === 'child');
    const parents = parentRelationships.map(r => ancestors.find(a => a.ancestor_id === r.relation_id)).filter(Boolean);

    const childRelationships = relationships.filter(r => r.relation_type === 'parent');
    const children = childRelationships.map(r => ancestors.find(a => a.ancestor_id === r.relation_id)).filter(Boolean);

    return {spouse, parents, children};
}