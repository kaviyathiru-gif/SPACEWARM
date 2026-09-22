import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SpaceCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = window.innerWidth || 800;
    const height = window.innerHeight || 600;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      currentMount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, rendering fallback background:', e);
      return;
    }

    // 3. Starfield Particles
    const starCount = 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 80;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.07 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 4. Planet Sphere
    const earthGeometry = new THREE.SphereGeometry(3, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a3c74,
      wireframe: true,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(0, -3.5, 1);
    scene.add(earth);

    // 5. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      earth.rotation.y += 0.001;
      stars.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    // 6. Handle Window Resizing
    const handleResize = () => {
      if (!renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="space-canvas" />;
};
