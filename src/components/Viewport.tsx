import { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelContext } from './ModelContext';

function Viewport() {
  const data = useContext(ModelContext);

  return (
    <div className="viewport">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <mesh>
          <bufferGeometry>
            <bufferAttribute />
          </bufferGeometry>
        </mesh>
      </Canvas>
    </div>
  );
}

export { Viewport };
