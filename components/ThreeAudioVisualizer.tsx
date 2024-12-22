"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useVoice } from "@humeai/voice-react";
import { createBlobGeometry } from './three/BlobGeometry';
import { createBlobMaterial } from './three/BlobMaterial';

export function ThreeAudioVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { status } = useVoice();
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create blob
    const geometry = createBlobGeometry();
    const material = createBlobMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Position camera
    camera.position.z = 14;

    // Animation
    const clock = new THREE.Clock();
    let targetIntensity = 0;
    let currentIntensity = 0;

    function animate() {
      requestAnimationFrame(animate);

      // Update time uniform
      material.uniforms.u_time.value = clock.getElapsedTime();

      // Handle blob state transitions
      if (status.value === "connected" && !isAnimating) {
        targetIntensity = 1.0;
        setIsAnimating(true);
      } else if (status.value !== "connected" && isAnimating) {
        targetIntensity = 0.0;
        setIsAnimating(false);
      }

      // Smooth intensity transition
      currentIntensity += (targetIntensity - currentIntensity) * 0.05;
      material.uniforms.u_intensity.value = currentIntensity;

      // Subtle rotation
      mesh.rotation.y += 0.001;
      mesh.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [status, isAnimating]);

  return (
    <div ref={containerRef} className="w-full h-full" />
  );
}