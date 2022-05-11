import { createContext } from 'react';

interface IModelContext {
  id: string;
  name: string;
  type: string;
  color: string;
  position: number[];
  uv: number[];
  normal: number[];
  index: number[];
  parameters: { [key: string]: any } | null;
}

const ModelContext = createContext<IModelContext | null>(null);

export { ModelContext };
