import { useState } from "react";
import { useEffect } from "react";

import AncestorCard from "./AncestorCard";
import SpouseCard from "./SpouseCard";
import { buildTree } from "../utils/buildTree";
import {  buildNodesAndEdges } from "../utils/buildNodes";
import { GetAncestorsInTree, getRelationships } from "../middleware/api";
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useParams } from "react-router-dom";


function AncestryTree () {

    const [ rootAncestorId, setRootAncestorId] = useState(2);
    const [ tree, setTree ] = useState(null);

    const {tree_id: tree_id} = useParams();

    useEffect(() => {
        const loadTree = async () => {
            try{
                const data = tree_id ? await GetAncestorsInTree({tree_id: tree_id}) :await getRelationships();
                const { ancestors, relationships } = data;

                console.log(ancestors);
                console.log(relationships);

                const build = buildTree(rootAncestorId, ancestors, relationships);
                setTree(build);
               
            } catch (err){
                console.log(err);
            }
        }
        loadTree();
    }
    , [rootAncestorId]);

    if(!tree) return (<p>LOADING...</p>);

    const { nodes, edges } = buildNodesAndEdges(tree);

    const nodeTypes = {
        ancestor: AncestorCard,
        spouse: SpouseCard
    };

    return (
        <div className="ancestry-tree" style={{width: '100%', height: '50em'}}>
            <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView>
         
            </ReactFlow>
        </div>
        
    );

}

export default AncestryTree;