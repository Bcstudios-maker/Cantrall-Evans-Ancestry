import { useState } from "react";
import { useEffect } from "react";

import AncestorCard from "./AncestorCard";
import SpouseCard from "./SpouseCard";
import { buildTree } from "../utils/buildTree";
import {  buildNodesAndEdges } from "../utils/buildNodes";
import { getRelationships } from "../middleware/api";
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function AncestryTree ({rootAncestorId}) {

    const [ tree, setTree ] = useState(null);

    useEffect(() => {
        const loadTree = async () => {
            try{
                const data = await getRelationships({tree_id: 0}); 
                const { ancestors, relationships } = data;

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
    console.log(nodes);
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