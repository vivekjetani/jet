import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';

useGLTF.preload('/smol_ame_in_an_upcycled_terrarium_hololiveen.glb');

export default function Model() {
    const group = useRef<Group>(null);
    const { nodes, materials, animations, scene } = useGLTF('/smol_ame_in_an_upcycled_terrarium_hololiveen.glb'); // Loads the model
    const { actions } = useAnimations(animations, scene);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Play the default animation
    useEffect(() => {
        if (actions['Animation']) {
            actions['Animation'].play();
        }
    }, [actions]);

    // Mouse movement handler
    useEffect(() => {
        const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
            // Normalize mouse position to range [-0.5, 0.5]
            const x = (event.clientX / window.innerWidth) - 0.5;
            const y = (event.clientY / window.innerHeight) - 0.5;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Update model rotation based on mouse position
    useEffect(() => {
        if (group.current) {
            const maxRotationX = Math.PI / 8; // Limit to 25% up and 25% down
            const maxRotationY = Math.PI / 8; // Limit to 25% side-to-side

            // Map mouse position to rotation range
            group.current.rotation.x = -mousePosition.y * maxRotationX; // Vertical tilt
            group.current.rotation.y = mousePosition.x * maxRotationY; // Horizontal tilt
        }
    }, [mousePosition]);

    return (
        <group ref={group} position={[0, -1.8, 1]} rotation={[0, 0, 0]}>
            {/* Render the 3D model */}
            <primitive object={scene} />
        </group>
    );
}