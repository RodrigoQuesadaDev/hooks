import useClickAway from 'react-use/esm/useClickAway';
import {RefObject} from 'react';

const NULL_REF: RefObject<any> = {current: null};

export function useClickAwayWhenActive<E extends Event = Event>(active: boolean, ref: RefObject<HTMLElement | null>, onClickAway: (event: E) => void): void
{
    useClickAway((active && ref) || NULL_REF, onClickAway);
}
