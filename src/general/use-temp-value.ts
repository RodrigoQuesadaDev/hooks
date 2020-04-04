import {useEffect, useState} from 'react';

export function useTempValue<T>(value: T, emptyValue: T, ms: number): T
{
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => {
        setTempValue(value);
        const timeoutId = setTimeout(() => setTempValue(emptyValue), ms);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return tempValue;
}
