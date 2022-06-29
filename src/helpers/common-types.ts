import { PropsWithChildren } from 'react';

export type Component<T = any> = (props: T) => JSX.Element;
export type ComponentWithChildren<T = any> = (props: PropsWithChildren<T>) => JSX.Element;
