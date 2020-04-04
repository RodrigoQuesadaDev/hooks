import {useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash-es';

const DEBOUNCE_TIME_MS = 500;

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(readWindowDimensions);

    const handleResize = useCallback(debounce(() => {
        setWindowDimensions(readWindowDimensions);
    }, DEBOUNCE_TIME_MS), []);

    useEffect(() => {
        const windowEvent = 'resize';
        window.addEventListener(windowEvent, handleResize);
        return () => window.removeEventListener(windowEvent, handleResize);
        // eslint-disable-next-line
    }, []);

    return windowDimensions;
};

function readWindowDimensions()
{
    return {width: window.innerWidth, height: window.innerHeight};
}
