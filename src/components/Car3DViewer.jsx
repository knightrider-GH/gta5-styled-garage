import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float } from '@react-three/drei';

function DefaultCarChassis() {
  const carRef = useRef();

  useFrame((state, delta) => {
    if (carRef.current) {
      carRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={carRef} position={[0, -0.2, 0]}>
      {/* Main Car Body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3.2, 0.5, 1.4]} />
        <meshStandardMaterial color="#f0b90b" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Cabin / Roof */}
      <mesh position={[-0.2, 0.8, 0]}>
        <boxGeometry args={[1.8, 0.45, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Spoiler */}
      <mesh position={[-1.5, 0.85, 0]}>
        <boxGeometry args={[0.3, 0.08, 1.3]} />
        <meshStandardMaterial color="#222" metalness={0.8} />
      </mesh>
      {/* Wheels */}
      {[-1, 1].map((x) =>
        [-0.75, 0.75].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.2, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.25, 24]} />
            <meshStandardMaterial color="#1c1c1c" roughness={0.5} />
          </mesh>
        ))
      )}
      {/* Headlights */}
      <mesh position={[1.61, 0.42, 0.45]}>
        <boxGeometry args={[0.05, 0.15, 0.3]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[1.61, 0.42, -0.45]}>
        <boxGeometry args={[0.05, 0.15, 0.3]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
      </mesh>
      {/* Tail lights */}
      <mesh position={[-1.61, 0.45, 0]}>
        <boxGeometry args={[0.05, 0.1, 1.2]} />
        <meshStandardMaterial color="#ff1744" emissive="#ff1744" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

export default function Car3DViewer({ modelUrl }) {
  return (
    <div style={{ width: '100%', height: '380px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        background: 'rgba(0,0,0,0.7)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        color: '#f0b90b',
        fontWeight: 'bold',
        zIndex: 5,
        border: '1px solid #f0b90b'
      }}>
        🕹️ DRAG TO ROTATE • SCROLL TO ZOOM
      </div>
      <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
        <color attach="background" args={['#0d0d0d']} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, -2, -5]} intensity={0.6} color="#f0b90b" />
        <pointLight position={[0, 4, 0]} intensity={1.2} />

        {/* Circular Showroom Floor */}
        <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 4, 64]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
        </mesh>

        <Suspense fallback={null}>
          {modelUrl ? <Model url={modelUrl} /> : <DefaultCarChassis />}
        </Suspense>

        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.05} />
      </Canvas>
    </div>
  );
}

