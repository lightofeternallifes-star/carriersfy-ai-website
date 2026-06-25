declare namespace React {
  type ReactNode = unknown;
  interface ReactElement {
    readonly type?: unknown;
    readonly props?: unknown;
    readonly key?: string | number | null;
  }
}

declare module "react" {
  export type ReactNode = React.ReactNode;
  export type ReactElement = React.ReactElement;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useState<T>(initialState: T | (() => T)): [T, (nextState: T | ((previousState: T) => T)) => void];
  const React: {
    useMemo: typeof useMemo;
    useState: typeof useState;
  };
  export default React;
}

declare module "react/jsx-runtime" {
  export function jsx(type: unknown, props: unknown, key?: string): React.ReactElement;
  export function jsxs(type: unknown, props: unknown, key?: string): React.ReactElement;
  export const Fragment: unique symbol;
}

declare namespace JSX {
  interface IntrinsicAttributes {
    key?: string | number;
  }

  interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>;
  }
}
