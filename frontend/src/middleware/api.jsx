export const getTrees = async () => {
    const response = await fetch('http://localhost:4000/getTrees');

    if(!response.ok){
        throw new Error('Failed to fetch family trees.');
    }

    return await response.json();
}

export const getAncestors = async () => {
    const response = await fetch('http://localhost:4000/getAncestors');

    if(!response.ok){
        throw new Error('Failed to fetch family trees.');
    }
    return await response.json();
}