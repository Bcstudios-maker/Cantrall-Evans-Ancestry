export const getTrees = async () => {
    const response = await fetch('http://localhost:4000/api/getTrees');

    if (!response.ok) {
        throw new Error('Failed to fetch family trees.');
    }

    return await response.json();
}


export const addAncestor = async ({ firstName, lastName, dob, dod, imageLink, gender, relationType, ancestorId, ancestorGender, spouseAncestorId }) => {
    const response = await fetch('http://localhost:4000/api/addAncestor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName, lastName, dob, dod, imageLink, gender, relationType, ancestorId, ancestorGender, spouseAncestorId }) });
    if (!response.ok) {
        throw new Error('Failed to add ancestor');
    }
    return await response.json();
}

export const editAncestor = async({ imageLink, firstName, lastName, dob, dod, ancestor_id }) => {

    try{
        const response = await fetch(`http://localhost:4000/api/editAncestor/${ancestor_id}`, { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ imageLink, firstName, lastName, dob, dod })});
        return await response.json();
    } catch (err){
        throw new Error(err);
    }
}

export const deleteAncestor = async ({ ancestor_id }) => {
    try {
        const response = await fetch(`http://localhost:4000/api/deleteAncestor/${ancestor_id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ancestor_id }) });
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getAncestorDocuments = async ({ ancestor_id }) => {
    const response = await fetch(`http://localhost:4000/api/getAncestorDocuments/${ancestor_id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch ancestor with ancestor_id: ' + ancestor_id);
    }
    return await response.json();
}
export const getUsers = async () => {
    const response = await fetch('http://localhost:4000/api/getUsers');

    if (!response.ok) {
        throw new Error('Failed to fetch family trees.');
    }
    return await response.json();
}

export const getDocuments = async () => {
    const response = await fetch('http://localhost:4000/api/getDocuments');
    if (!response.ok) {
        throw new Error('Failed to fetch ancestor documents.');
    }
    return await response.json();
}

export const getRelationships = async () => {
    const response = await fetch(`http://localhost:4000/api/getRelationships`);

    if (!response.ok) {
        throw new Error('Failed to fetch ancestor relationships.');
    }
    return await response.json();
}

export const loginUser = async ({ username, password, role }) => {
    const response = await fetch('http://localhost:4000/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password, role }) });

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error);
    }
    return await response.json();
}

export const addUser = async ({ username, password, role }) => {
    const response = await fetch('http://localhost:4000/api/addUser', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password, role }) });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
}

export const editDocument = async ({ filename, filepath, ancestor_id, info_id }) => {
    const response = await fetch('http://localhost:4000/api/editDocument', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename, filepath, ancestor_id, info_id }) });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
}

export const addDocument = async ({ filepath, filename, ancestor_id }) => {
    const response = await fetch('http://localhost:4000/api/addDocument', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filepath, filename, ancestor_id }) });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
}


/*
Tree API calls
*/

export const GetTrees = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/getTrees');
        return await response.json();
    } catch (err){
        throw new Error(await response.json().error);
    }
}

export const GetAncestorsInTree = async ({tree_id}) => {
    try {
        const result = await fetch(`http://localhost:4000/api/GetAncestorsInTree/${tree_id}`, {method: 'GET', headers: { 'Content-Type': 'application/json'}, params: JSON.stringify({tree_id})});
        return await result.json();
    } catch (err){
        throw new Error(await response.json().error);
    }

}

export const deleteUser = async ({ user_id }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const isAdmin = user?.role?.toLowerCase() == 'admin' ? true : false;

    if (isAdmin) {
        try {
            const response = await fetch(`http://localhost:4000/api/deleteUser/${user_id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id }) });
            return await response.json();
        } catch (err) {
            throw new Error(err.message);
        }
    } else {
        return 'Not Admin :(';
    }
}

export const deleteDocument = async ({ info_id }) => {
    try {
        const response = await fetch(`http://localhost:4000/api/deleteDocument/${info_id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ info_id }) });
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }

}