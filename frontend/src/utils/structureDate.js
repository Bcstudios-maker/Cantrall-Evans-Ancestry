export const structureDate = (dateAdded) => {
    if (!dateAdded) return null;

    return new Date(dateAdded).toISOString().split('T')[0];
}

export const createDeate = (date) => {
    if (!date) return null;
    console.log(new Date(date));
    return new Date(date);
}