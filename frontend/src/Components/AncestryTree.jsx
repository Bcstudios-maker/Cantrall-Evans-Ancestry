import { useState } from "react";
import { useEffect } from "react";

import AncestorCard from "./AncestorCard";
import { buildTree } from "../utils/buildTree";
import { getRelationships } from "../middleware/api";


function AncestryTree ({rootAncestorId}) {

    const [ tree, setTree ] = useState([]);

    useEffect(() => {
        const loadTree = async () => {
            console.log('tree_id:', 0);
            console.log('rootAncestorId:', rootAncestorId);
            try{
                const data = await getRelationships({tree_id: 0}); 
                const { ancestors, relationships } = data;
                const build = buildTree(rootAncestorId, relationships, ancestors);
                setTree(build);
            } catch (err){
                console.log(err);
            }
        }
        loadTree();
    }
    , [rootAncestorId]);


    if(!tree) return (<p>LOADING...</p>);
    return (<AncestorCard ancestor={tree}/>);

}

export default AncestryTree;