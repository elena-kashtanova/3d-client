import * as THREE from 'three';
import { useContext, useRef, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { Canvas } from '@react-three/fiber';
import { IModelContext, ModelContext } from './ModelContext';
import { OrbitControls, TransformControls } from '@react-three/drei';

interface Props {
  handleTransform: (updateData: Partial<IModelContext>) => void;
}

function Viewport({ handleTransform }: Props) {
  const data = useContext(ModelContext);
  // Get access to the Mesh object
  const mesh = useRef<THREE.Mesh>(null!);

  const handleMeshTransform = (e: THREE.Event | undefined) => {
    mesh.current.geometry.applyMatrix4(mesh.current.matrixWorld);
    const attributes = mesh.current.geometry.attributes;
    const position = Array.from(attributes.position.array);
    const normal = Array.from(attributes.normal.array);
    const uv = Array.from(attributes.uv.array);
    handleTransform({ position, normal, uv });
  };

  const debouncedHandleMeshTransform = useMemo(
    () => debounce(handleMeshTransform, 1000),
    [],
  );

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
        <TransformControls
          object={mesh}
          mode="scale"
          onObjectChange={debouncedHandleMeshTransform}
        />
        {data && (
          <mesh ref={mesh} position={[0, 0, 0]} scale={1}>
            <meshPhongMaterial
              attach="material"
              color={parseInt(data.color, 16)}
              side={THREE.DoubleSide}
            />
            <bufferGeometry name={data.name}>
              {data.index && (
                <bufferAttribute
                  array={new Uint32Array(data.index)}
                  attach="index"
                  count={data.index.length}
                  itemSize={1}
                />
              )}
              <bufferAttribute
                attach="attributes-position"
                count={data.position.length / 3}
                itemSize={3}
                array={new Float32Array(data.position)}
                needsUpdate
              />
              <bufferAttribute
                attach="attributes-normal"
                count={data.normal.length / 3}
                itemSize={3}
                array={new Float32Array(data.normal)}
                needsUpdate
              />
              <bufferAttribute
                attach="attributes-uv"
                count={data.uv.length / 2}
                itemSize={2}
                array={new Float32Array(data.uv)}
                needsUpdate
              />
            </bufferGeometry>
          </mesh>
        )}
      </Canvas>
    </div>
  );
}

export { Viewport };
