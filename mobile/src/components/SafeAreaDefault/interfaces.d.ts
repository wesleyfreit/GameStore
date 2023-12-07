import { type ReactNode } from 'react';

interface SafeAreaDefaultComponentProps {
  children: ReactNode;
  paddingHorizontal?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}
