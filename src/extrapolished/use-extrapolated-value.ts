import {ViewBasedExtrapolation} from 'extrapolished';
import {useExistingPrevious} from "../general/use-existing-previous";

export function useExtrapolatedValue(value?: ViewBasedExtrapolation | number): number | undefined
{
    useExistingPrevious(value, (prevValue: ViewBasedExtrapolation) => {
        if (isExtrapolation(value) !== isExtrapolation(prevValue)) {
            throw new Error(`[useExtrapolatedValue] The same value type (i.e. ViewBasedExtrapolation) should be used during the entire lifetime of the component where this hook is used.`);
        }
    });

    return isExtrapolation(value) ? value() : value;
}

export function useExtrapolatedValues(...values: Array<ViewBasedExtrapolation | number | undefined>): Array<number | undefined>
{
    useExistingPrevious(values.length, (prevLength: ViewBasedExtrapolation) => {
        if (values.length !== prevLength) throw new Error('[useExtrapolatedValues] You must always pass the same amount of values to this hook.');
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return values.map(it => useExtrapolatedValue(it));
}

//region Utils
const isExtrapolation = (value?: ViewBasedExtrapolation | number): value is ViewBasedExtrapolation => typeof value === 'function';
//endregion
