'use client';

import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { Suspense } from 'react';

export default function Scene() {
    return (
        <Canvas
            gl={{ antialias: true }}
            dpr={[1, Math.min(window.devicePixelRatio, 2)]} // Adjust for high DPI displays
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: '#caf0f8',
                zIndex: -1
            }}
        >
            {/* Lighting for the scene */}
            <directionalLight position={[-5, -5, 5]} intensity={1.5} />
            {/* Render the 3D model */}
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
}
