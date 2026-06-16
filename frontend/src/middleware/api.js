export const getTrees = async () => {
    const response = await fetch('http://localhost:4000/api/getTrees');

    if(!response.ok){
        throw new Error('Failed to fetch family trees.');
    }

    return await response.json();
}

export const getAncestors = async () => {
    const response = await fetch('http://localhost:4000/api/getAncestors');

    if(!response.ok){
        throw new Error('Failed to fetch family trees.');
    }
    return await response.json();
}

export const getAncestor = async({ancestor_id}) => {
    const response = await fetch(`http://localhost:4000/api/getAncestor/${ancestor_id}`);

    if(!response.ok){
        throw new Error('Failed to fetch ancestor with ancestor_id: ' + ancestor_id);
    }
    return await response.json();
}
export const getUsers = async () => {
    const response = await fetch('http://localhost:4000/api/getUsers');

    if(!response.ok){
        throw new Error('Failed to fetch family trees.');
    }
    return await response.json();
}

export const getDocuments = async () => {
    const response = await fetch('http://localhost:4000/api/getDocuments');
    if(!response.ok) {
        throw new Error('Failed to fetch ancestor documents.');
    }
    return await response.json();
}

export const getRelationships = async({tree_id}) => {
    const response = await fetch(`http://localhost:4000/api/getRelationships/${tree_id}`);

    if(!response.ok) {
        throw new Error('Failed to fetch ancestor relationships.');
    }
    return await response.json();
}

export const loginUser = async ({username, password, role}) => {
    const response = await fetch('http://localhost:4000/api/auth/login', {method:'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify({username, password, role})});

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.error);
    }
    return await response.json();
}

export const addUser = async ({username, password, role}) => {
    const response = await fetch('http://localhost:4000/api/addUser', {method:'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify({username, password, role})});
    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
}

export const deleteUser = async ({user_id}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const isAdmin = user?.role?.toLowerCase() == 'admin' ? true : false;

    if(isAdmin){
        try{
            const response = await fetch(`http://localhost:4000/api/deleteUser/${user_id}`, {method:'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ user_id })});
            return await response.json();
        } catch(err){
            throw new Error(err.message);
        }
    } else {
        return 'Not Admin :(';
    }
}