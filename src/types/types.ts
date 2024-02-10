import { FC, ReactElement } from "react";

export interface ActionProps {
  record?: {
    id: string;
    status?: string;
  };
}

export interface TableSchema {
  label: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: FC<any> | (() => ReactElement);
}
