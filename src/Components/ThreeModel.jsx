import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three'; // Import THREE for color manipulation

// This component loads and displays the 3D model
const Model = ({ color }) => {
  const modelRef = useRef();
  const { scene } = useGLTF('/Model/human_heart.glb'); // Ensure this path is correct

  useEffect(() => {
    if (modelRef.current) {
      // Change the color of the object material and increase emissive intensity
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color = new THREE.Color(color); // Set the base color
          
          // Increase brightness by adjusting emissive color
          child.material.emissive = new THREE.Color(color); // Add glow effect of the same color
          child.material.emissiveIntensity = 0.080; // Adjust the emissive intensity (0.5 is moderate)
        }
      });

      // Animate the object
      gsap.to(modelRef.current.rotation, {
        y: 2 * Math.PI, // 360 degrees rotation on the Y-axis
        duration: 4, // duration of the animation in seconds
        repeat: -1, // infinite loop
        ease: 'linear', // linear easing for continuous rotation
      });
    }
  }, [scene, color]); // Re-run effect when scene or color changes

  return <primitive ref={modelRef} object={scene} scale={7} />;
};

const ThreeModel = () => {
  // You can pass the desired color as a prop
  const modelColor = 'red'; // Example: Red color

  return (
    <div className="relative h-screen w-full flex bg-[#2c4463e4] flex-col justify-center items-center">
      <h1 className="absolute top-[60%] transform -translate-y-1/2 text-center text-[#dbf6ff] text-[1.4rem] z-20 font-bold mt-4">
        L o a d i n g . . . .
      </h1>
      <Canvas className="w-full h-full">
        {/* Increased light intensity */}
        <ambientLight intensity={0.4} /> {/* Ambient light for overall brightness */}
        <directionalLight position={[5, 5, 5]} intensity={0.5} /> {/* Strong directional light */}
        <Suspense fallback={null}>
          <Model color={modelColor} /> {/* Pass the color prop here */}
        </Suspense>
        <OrbitControls
          enableZoom={false} // Disable zoom
          maxPolarAngle={Math.PI / 2} // Restrict upward movement
          minPolarAngle={Math.PI / 2} // Restrict downward movement
        />
      </Canvas>
    </div>
  );
};

export default ThreeModel;
