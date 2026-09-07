import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function LocalAncestorCard({ ancestorData }) {

    return (
        <div className="local-ancestor-card">
            <h1>{ancestorData.first_name} {ancestorData.last_name}</h1>
            <h3>{ancestorData.dob}</h3>
            <h3>{ancestorData.dod}</h3>
        </div>
    );
}

export default LocalAncestorCard;