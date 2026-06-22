import '../styles/page_styles/Ancestors.css'

import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";

import AncestorCard from "../Components/AncestorCard";
import AncestryTree from '../Components/AncestryTree';
function Ancestors() {

    return ( 
        <>
            <NavBar/>
            <div className="ancestors-tree">
                <AncestryTree rootAncestorId={2}/>
            </div>
        </>
    );
}
export default Ancestors;