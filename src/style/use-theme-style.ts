import {useMemo} from "react";
import {AppTheme, useAppTheme} from 'theme.style';

export function useThemeStyle<S>(createStyle: (theme: AppTheme) => S): S
{
    const theme = useAppTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => createStyle(theme), [theme]);
}
