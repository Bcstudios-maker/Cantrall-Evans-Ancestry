export const structureDate = (dateAdded) => {
    if (!dateAdded) return null;

    return new Date(dateAdded).toISOString().split('T')[0];
}