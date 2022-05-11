import * as THREE from 'three';
import { useContext, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelContext } from './ModelContext';
import { OrbitControls, TransformControls } from '@react-three/drei';

function Viewport() {
  const data = useContext(ModelContext);
  // Get access to the Mesh object
  const mesh = useRef<THREE.Mesh>(null!);

  return (
    <div className="viewport">
      <Canvas camera={{ fov: 35, position: [10, 10, 10] }}>
        <OrbitControls
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[15, 20, 25]} intensity={1} />
        <TransformControls object={mesh} mode="scale" />
        {data && (
          <mesh
            ref={mesh}
            position={[0, 0, 0]}
            scale={1}
            onUpdate={(obj) => console.log('update mesh')}
            matrixAutoUpdate={true}
          >
            <meshPhongMaterial
              attach="material"
              color={parseInt(data.color, 16)}
              side={THREE.DoubleSide}
              needsUpdate={true}
            />
            <bufferGeometry
              name={data.name}
              onUpdate={(obj) => console.log('update geo')}
            >
              {data.index && (
                <bufferAttribute
                  array={new Uint32Array(data.index)}
                  attach="index"
                  count={data.index.length}
                  itemSize={1}
                  needsUpdate={true}
                />
              )}
              <bufferAttribute
                attach="attributes-position"
                count={data.position.length / 3}
                itemSize={3}
                array={new Float32Array(data.position)}
                needsUpdate={true}
              />
              <bufferAttribute
                attach="attributes-normal"
                count={data.normal.length / 3}
                itemSize={3}
                array={new Float32Array(data.normal)}
                needsUpdate={true}
              />
              <bufferAttribute
                attach="attributes-uv"
                count={data.uv.length / 2}
                itemSize={2}
                array={new Float32Array(data.uv)}
                needsUpdate={true}
              />
            </bufferGeometry>
          </mesh>
        )}
      </Canvas>
    </div>
  );
}

export { Viewport };
