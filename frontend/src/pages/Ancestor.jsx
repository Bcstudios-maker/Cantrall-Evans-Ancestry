import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useLocation } from "react-router-dom";

function Ancestor() {
    const location = useLocation();
    const data = location.state;


    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        try {
            
        }
    }, []);
    return (
        <>
            <NavBar />
            <div>
                <h2>{data.first_name}</h2>
            </div>
        </>

    );
}

export default Ancestor;