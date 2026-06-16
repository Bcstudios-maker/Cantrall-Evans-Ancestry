import { useEffect, useState } from "react";
import { getAncestorDocuments } from "../middleware/api";
import NavBar from "../Components/NavBar";
import { useLocation, useParams } from "react-router-dom";
import DocumentCard from "../Components/DocumentCard";

function Ancestor() {
    const location = useLocation();
    const data = location.state;

    const {ancestor_id: ancestorId} = useParams();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const documentData = await getAncestorDocuments({ancestor_id: ancestorId});

                console.log(documentData);
                setDocuments(documentData);
            } catch (err) {
                setError(err);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        if(ancestorId){
            loadDocuments();
        }
    }, [ancestorId]);

    const birth = data.date_of_birth.toString();
    const birthDate = birth.substring(0, birth.indexOf('T'));

    let deathDate = null;
    if (data.date_of_death) {
        const death = data.date_of_death.toString();
        deathDate = death.substring(0, death.indexOf('T'));

    }
    if (!data) {return (<><NavBar /><p>Ancestor not Found</p></>);}
    return (
        <>
            <NavBar />
            <div className="ancestor-info">
                <h1>{data.first_name} {data.last_name}</h1>
                <h2>Born: {birthDate}</h2>
                <h2>Died: {data.date_of_death ? (deathDate) : 'Unknown'}</h2>
                <div className='ancestor-data'>
                    <ul>
                        {documents?.map((document) => (<li><DocumentCard document={document} key={document.info_id}/></li>))}
                    </ul>
                    
                </div>
            </div>
        </>

    );
}

export default Ancestor;