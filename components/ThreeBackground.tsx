"use client";

import { useEffect, useRef } from "react";
import type * as THREE_TYPES from "three";

interface OrbData {
  mesh: THREE_TYPES.Mesh;
  speed: number;
  amp: number;
  phase: number;
}

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on mobile
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let cleanupFn: (() => void) | undefined;

    // Dynamic import of Three.js for performance
    import("three").then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 50;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // --- Particle System (max 100) ---
      const particleCount = 100;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities: Array<{ x: number; y: number; z: number }> = [];

      const blueVariants = [
        new THREE.Color("#1a90ff"),
        new THREE.Color("#4da6ff"),
        new THREE.Color("#0066cc"),
        new THREE.Color("#00c8ff"),
        new THREE.Color("#003d99"),
      ];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 160;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

        const c = blueVariants[Math.floor(Math.random() * blueVariants.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = Math.random() * 3 + 1;
        velocities.push({
          x: (Math.random() - 0.5) * 0.04,
          y: (Math.random() - 0.5) * 0.04,
          z: (Math.random() - 0.5) * 0.02,
        });
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // --- Glowing Orbs ---
      const orbGroup = new THREE.Group();
      const orbData: OrbData[] = [];

      for (let i = 0; i < 5; i++) {
        const orbGeo = new THREE.SphereGeometry(3 + Math.random() * 4, 16, 16);
        const orbMat = new THREE.MeshBasicMaterial({
          color: blueVariants[Math.floor(Math.random() * blueVariants.length)],
          transparent: true,
          opacity: 0.15,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 20 - 20
        );
        orbGroup.add(orb);
        orbData.push({
          mesh: orb,
          speed: Math.random() * 0.005 + 0.002,
          amp: Math.random() * 3 + 1,
          phase: Math.random() * Math.PI * 2,
        });
      }
      scene.add(orbGroup);

      // Mouse parallax tracking
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      const onMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);

      let t = 0;
      const posAttr = geometry.attributes.position as THREE_TYPES.BufferAttribute;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.005;

        // Smooth mouse follow
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Rotate particle cloud
        particles.rotation.y = currentMouseX * 0.08;
        particles.rotation.x = currentMouseY * 0.08;

        // Update particle positions
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          arr[i * 3] += velocities[i].x;
          arr[i * 3 + 1] += velocities[i].y;
          arr[i * 3 + 2] += velocities[i].z;

          // Wrap around
          if (arr[i * 3] > 80) arr[i * 3] = -80;
          else if (arr[i * 3] < -80) arr[i * 3] = 80;
          if (arr[i * 3 + 1] > 50) arr[i * 3 + 1] = -50;
          else if (arr[i * 3 + 1] < -50) arr[i * 3 + 1] = 50;
        }
        posAttr.needsUpdate = true;

        // Animate orbs
        orbData.forEach((orb) => {
          orb.mesh.position.y += Math.sin(t + orb.phase) * 0.01 * orb.amp;
          orb.mesh.position.x += Math.cos(t * 0.7 + orb.phase) * 0.008 * orb.amp;
          const mat = orb.mesh.material as THREE_TYPES.MeshBasicMaterial;
          mat.opacity = 0.1 + Math.abs(Math.sin(t + orb.phase)) * 0.15;
        });

        // Camera parallax
        camera.position.x += (currentMouseX * 5 - camera.position.x) * 0.03;
        camera.position.y += (currentMouseY * 3 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      cleanupFn = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    }).catch((err) => {
      console.error("Failed to load Three.js:", err);
    });

    return () => {
      cleanupFn?.();
    };
  }, []);

  return (
    <>
      {/* Three.js canvas mount */}
      <div
        ref={mountRef}
        className="absolute inset-0 hidden md:block"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
      {/* Mobile fallback gradient */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(26,144,255,0.2) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 80% 80%, rgba(0,102,204,0.15) 0%, transparent 50%), " +
            "#080c14",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
    </>
  );
}
