import {ComponentType} from 'react';
import {useSvgAttributes} from "./use-svg-attributes";

export type SvgViewBox = {
    height: number;
    width: number;
    x: number;
    y: number;
};

const NUMBER_REGEX = /[\d.,]+/.source;
const VIEWBOX_ATTR_REGEX = `^${/\s*/.source}(${NUMBER_REGEX})${/\s+/.source}(${NUMBER_REGEX})${/\s+/.source}(${NUMBER_REGEX})${/\s+/.source}(${NUMBER_REGEX})${/\s*/.source}$`;

export function useSvgViewBox(svgComponent?: ComponentType<any>): SvgViewBox | undefined
{
    const svgAttrs = useSvgAttributes(svgComponent);
    const viewBox = svgAttrs?.viewBox;
    if (viewBox === undefined) return;

    const matchResult = viewBox.match(VIEWBOX_ATTR_REGEX);
    if (matchResult === null) throw new Error(`[useSvgViewBox] An error occurred while trying to parse the viewBox value '${viewBox}'.`);

    const [, x, y, width, height] = matchResult.map(it => Number(it));
    return {x, y, width, height};
}
