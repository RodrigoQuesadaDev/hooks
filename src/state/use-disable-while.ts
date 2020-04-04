import {useCallback, useRef, useState} from 'react';

export function useDisableWhile()
{
    const [disabled, setDisabled] = useState(false);

    const disabledRef = useRef(disabled);//use ref to avoid simultaneous calls
    const disableWhile = useCallback(<R>(promise: Promise<R>): void => {

        if (!disabledRef.current) {
            disabledRef.current = true;
            setDisabled(disabledRef.current);

            promise.finally(() => {
                disabledRef.current = false;
                setDisabled(disabledRef.current);
            })
        }
    }, []);

    return {
        disabled,
        enabled: !disabled,
        disableWhile
    };
}
