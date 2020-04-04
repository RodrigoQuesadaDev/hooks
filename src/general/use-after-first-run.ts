import {useRef} from 'react';

export function useAfterFirstRun(action: () => void)
{
    const alreadyRan = useRef(false);
    if (!alreadyRan.current) {
        alreadyRan.current = true;
    }
    else {
        action();
    }
}
