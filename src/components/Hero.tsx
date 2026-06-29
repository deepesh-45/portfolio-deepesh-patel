'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import Image from 'next/image';

function ParticleField(props: any) {
  const ref = useRef<any>(null);
  
  // Manually generate points in a sphere to avoid maath NaN issues
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      // Random point in sphere using spherical coordinates
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 1.5;
      
      const sinPhi = Math.sin(phi);
      positions[i * 3] = r * sinPhi * Math.cos(theta);
      positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#06b6d4" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#031427]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField />
        </Canvas>
      </div>
      
      <div className="relative z-10 flex items-center justify-center w-full h-full px-6">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex-1 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
              Deepesh Patel
            </h1>
            <h2 className="text-xl md:text-2xl text-[#4cd7f6] font-medium mb-6">
              AI & ML Engineer
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg leading-relaxed">
              Architecting the future through intelligent systems and data-driven insights. 
              Specializing in machine learning models, predictive analytics, and seamless AI integrations.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button className="px-6 py-3 bg-[#06b6d4] hover:bg-[#4cd7f6] text-slate-900 font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(76,215,246,0.8)]">
                View Projects
              </button>
              <button className="px-6 py-3 bg-transparent border border-white/20 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors">
                Get in Touch
              </button>
            </div>
          </div>
          
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex-shrink-0">
            <Image 
              src="/profile.png" 
              alt="Deepesh Patel" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
