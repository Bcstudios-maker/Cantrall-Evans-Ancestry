import { RPProvider, RPLayout, RPPages, RPConfig } from '@react-pdf-kit/viewer'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CheckFilePath = async (filePath, siganl) => {
    try {
        let response = await fetch(filePath, { method: 'HEAD', signal });
        return response.ok;
    } catch (e) {
        if (e.name === 'AbortError') throw e;
        return false;
    }
}

function Document() {

    const { state: documentData } = useLocation();
    const [canEmbed, setCanEmbed] = useState(null);

    useEffect(() => {
        if (!documentData?.filePath) {
            setCanEmbed(false);
            return;
        }

        const controller = new AbortController();
        setCanEmbed(null);

        CheckFilePath(documentData.filepath, controller.signal).then(setCanEmbed).catch((err) => { if (err.name !== 'AbortError') setCanEmbed(false); });

        return () => controller.abort();
    }, [documentData?.filepath]);

    if (!documentData) return <p>No valid document selected.</p>;
    if (canEmbed === null) return <p>Checking document…</p>;

    if (!canEmbed) {
        return (
            <div className='cant-embed-container'>
                <h1>{documentData.filename}</h1>
                <p>This document cannot be embeded, due to host CORS restrictions.</p>
                <a href={documentData.filepath} target="_blank" rel="noopener noreferrer">
                    Open Original Content
                </a>
            </div>
        );
    }

    return (
        <div>
            <h1>{documentData.filename}</h1>
            <RPConfig>
                <RPProvider src={documentData.filepath}>
                    <RPLayout
                        toolbar
                        style={{ height: '800px', justifySelf: 'center', width: '95%', marginTop: '50px' }}
                    >
                        <RPPages />
                    </RPLayout>
                </RPProvider>
            </RPConfig>
        </div>
    );
}

export default Document;