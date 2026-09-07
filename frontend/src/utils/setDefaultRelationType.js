export const SetDefaultRelationType = (ancestor) => {
    let defaultRelationType = ancestor.spouse ? 'child' : 'spouse';
    return defaultRelationType;
}