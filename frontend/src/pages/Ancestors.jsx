import '../styles/Ancestors.css'

import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { getAncestors } from "../middleware/api";
import AncestorCard from "../Components/AncestorCard";
import AncestryTree from '../Components/AncestryTree';
function Ancestors() {

    const [ ancestors, setAncestors ] = useState([]);

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const loadAncestors = async () => {
            try {
                const ancestors = await getAncestors();
                setAncestors(ancestors);
            } catch (err) {
                console.log(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadAncestors();
    }
    , [])



    return ( 
        <>
            <NavBar/>
            <div className="ancestors-tree">
                <AncestryTree rootAncestorId={1}/>
            </div>
        </>
    );
}
export default Ancestors;