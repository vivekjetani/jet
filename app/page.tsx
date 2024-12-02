import { HyperText } from '@/components/hyper-text';
import dynamic from 'next/dynamic';

// Dynamically import Scene with server-side rendering disabled
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
    return (
        <>
            <Scene />
            <div className="overlay">
                <h1><HyperText text="Jetani Vivek"/></h1>
                <p>World full of magic</p>
            </div>
        </>
    );
}
