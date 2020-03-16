import {useAfterFirstRun} from "./use-after-first-run.hook";
import {usePrevious} from 'react-use';

export function useExistingPrevious<T>(value: T, callback: (value: T) => void)
{
    const prevValue = usePrevious(value);
    useAfterFirstRun(() => callback(prevValue!));
}
