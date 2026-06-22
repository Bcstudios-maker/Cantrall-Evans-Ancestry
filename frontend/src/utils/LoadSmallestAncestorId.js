export const LoadSmallestAncestorId = ({ data }) => {

    return Math.min(...data.map(a => a.ancestor_id));
}