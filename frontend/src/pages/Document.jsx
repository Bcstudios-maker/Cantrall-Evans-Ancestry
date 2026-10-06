import { RPProvider, RPLayout, RPPages, RPConfig } from '@react-pdf-kit/viewer'
import { useLocation } from 'react-router-dom';
function Document() {

    const location = useLocation();
    const documentData = location.state;
    
    return (
        <>
            <h1>{documentData.filename}</h1>
            <RPConfig>
                <RPProvider src="https://cdn.codewithmosh.com/image/upload/v1721763853/guides/web-roadmap.pdf">
                    <RPLayout toolbar style={{ height: '800px', justifySelf: 'center', width: '95%', marginTop: '50px'}}>
                        <RPPages></RPPages>
                    </RPLayout>
                </RPProvider>
            </RPConfig>
        </>
    );
}

export default Document;