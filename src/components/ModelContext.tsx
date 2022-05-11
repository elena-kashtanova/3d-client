import { createContext } from 'react';

interface IModelContext {
  id?: string;
  name: string;
  type: string;
  color: string;
  position: Float32Array | Array<number>;
  uv: Float32Array | Array<number>;
  normal: Float32Array | Array<number>;
  index: Uint32Array | Array<number>;
  parameters: { [key: string]: any } | null;
}

const ModelContext = createContext<IModelContext | null>(null);

export { ModelContext, type IModelContext };
