import { useMemo, useState } from "react";
import { useEffect } from "react";

import AncestorCard from "./AncestorCard";
import SpouseCard from "./SpouseCard";
import { buildTree } from "../utils/buildTree";
import { buildNodesAndEdges } from "../utils/buildNodes";
import { GetAncestorsInTree, getRelationships } from "../middleware/api";
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useParams } from "react-router-dom";
import { LoadSmallestAncestorId } from "../utils/LoadSmallestAncestorId";
import { useLayout } from "../hooks/useLayout";

const nodeTypes = {
    ancestor: AncestorCard,
    spouse: SpouseCard
};

function AncestryTree() {

    const [tree, setTree] = useState(null);
    const layout = useLayout();
    const { tree_id: tree_id } = useParams();

    useEffect(() => {
        const loadTree = async () => {
            try {
                const data = tree_id ? await GetAncestorsInTree({ tree_id: tree_id }) : await getRelationships();


                const { ancestors, relationships } = data;

                const ancestorId = LoadSmallestAncestorId({ data: ancestors });
                setTree(buildTree(ancestorId, ancestors, relationships));

            } catch (err) {
                console.log(err);
            }
        }
        loadTree();
    }
        , [tree_id]);



    const { nodes, edges } = useMemo(() => (tree ? buildNodesAndEdges(tree, layout) : { nodes: [], edges: [] }), [tree, layout]);

    if (!tree) return (<p>LOADING...</p>);

    return (
        <div className="ancestry-tree" style={{ width: '100%', height: '100%', backgroundColor: 'rgba(164, 121, 67, 0.15)' }}>
            <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView>

            </ReactFlow>
        </div>

    );

}

export default AncestryTree;