import {useWindowDimensions} from "common/hooks/use-window-dimensions-hook";
import {useMemo} from "react";
import {MapProps} from "common/utility-types";
import {SamplePointsXAxis} from "extrapolished";

type BreakpointMap = {
    [key: string]: SamplePointsXAxis
};

export function useOnBreakpoints<B extends BreakpointMap, R>(breakpoints: B, cases: () => MapProps<B, R>): R
{
    const windowWidth = useWindowDimensions().width;

    const bpName = useMemo(() => {
        const breakpointEntries = Object.entries(breakpoints)
            .sort(([, bp1], [, bp2]) => bp1.first - bp2.first);
        const [firstBpName, firstBp] = breakpointEntries[0];
        const [lastBpName, lastBp] = breakpointEntries[breakpointEntries.length - 1];

        let bpName;
        if (windowWidth < firstBp.first) {
            bpName = firstBpName as keyof B;
        }
        else if (lastBp.first <= windowWidth) {
            bpName = lastBpName as keyof B;
        }
        else {
            [bpName] = breakpointEntries.find(([, bp]) => bp.first <= windowWidth && windowWidth < bp.last)! as [keyof B, any];
        }

        return bpName;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);

    return cases()[bpName];
}
