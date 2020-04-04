import {RefCallback, useCallback, useEffect, useState} from 'react';
import {ResizeObserver} from '@juggle/resize-observer';

export type ResizeObservation = { width: number, height: number };

export const useResizeObservation = <T extends Element>(): [RefCallback<T>, ResizeObservation] => {
    const [size, setSize] = useState<ResizeObservation>({
        width: 0,
        height: 0
    });

    const [element, setElement] = useState<T | null>();

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const {inlineSize: width, blockSize: height} = entry.borderBoxSize[0];
                setSize({width, height});
            }
        });

        if (element) observer.observe(element, {box: 'border-box'});

        return () => observer.disconnect();
    }, [element]);

    const ref = useCallback((instance: T | null) => setElement(instance), []);

    return [ref, size];
};
