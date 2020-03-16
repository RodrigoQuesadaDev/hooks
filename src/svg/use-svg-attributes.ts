import React, {ComponentType, FunctionComponent, ReactElement, SVGAttributes, useMemo} from 'react';

export function useSvgAttributes(svgComponent?: ComponentType<any>): SVGAttributes<any> | undefined
{
    return useMemo(() => {
        if (svgComponent === undefined) return;

        // @ts-ignore
        const reactComponent: React.Component = svgComponent;
        return (((reactComponent.render() as ReactElement).type as FunctionComponent<any>)({}) as ReactElement<SVGAttributes<any>>).props;
    }, [svgComponent]);
}
