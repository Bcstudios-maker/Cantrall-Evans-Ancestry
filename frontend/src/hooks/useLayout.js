import { useEffect, useState, useMemo } from "react";

const DESIGN_WIDTH = 1920;

const BuildGapHelper = (pixels, viewportWidth) => {
    const pxVW = ((pixels / DESIGN_WIDTH) * 100);
    return ((pxVW / 100) * viewportWidth);
};

function useViewportWidth(delay = 100) {
    const [width, setWidth] = useState(() => document.documentElement.clientWidth);

    useEffect(() => {
        let timer;
        const onResize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => setWidth(document.documentElement.clientWidth), delay);
        };
        window.addEventListener("resize", onResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", onResize);
        };
    }, [delay]);

    return width;
}

export function useLayout() {
    const vw = useViewportWidth();

    return useMemo(() => {

        const GAP = BuildGapHelper(92, vw); // Gap between spouse cards. Good for parents.
        const CARD_WIDTH = BuildGapHelper(450, vw); // Self Explanitory
        const Y_GAP = BuildGapHelper(900, vw);
        return { GAP, CARD_WIDTH, Y_GAP, SPOUSE_WIDTH: (CARD_WIDTH * 2) + GAP}
    }, [vw]);
}