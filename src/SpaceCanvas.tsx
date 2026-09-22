import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SpaceCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. Starfield Generator
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 100;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0x55ccff, size: 0.08 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 3. Earth Sphere (Realistic Orbital Background)
    const earthGeometry = new THREE.SphereGeometry(3.2, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a4b8c,
      emissive: 0x001122,
      wireframe: false,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(0, -3.8, 1);
    scene.add(earth);

    // 4. Space Lighting
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 1.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x112233));

    // 5. Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      earth.rotation.y += 0.0008;
      stars.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };
    animate();

    // 6. Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={mountRef} className="space-canvas" />;
};
