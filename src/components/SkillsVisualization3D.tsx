import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import { useIsMobile } from "@/hooks/use-mobile"
import * as THREE from 'three'

interface Skill {
  name: string;
  icon: string;
  value: number;
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'default';
}

const skills: Skill[] = [
  { name: "React", icon: "⚛️", value: 0.9, category: "frontend" },
  { name: "TypeScript", icon: "TS", value: 0.85, category: "frontend" },
  { name: "Tailwind CSS", icon: "🌊", value: 0.95, category: "frontend" }, 
  { name: "Node.js", icon: "🟢", value: 0.75, category: "backend" },
  { name: "GraphQL", icon: "◼️", value: 0.65, category: "backend" },
  { name: "Figma", icon: "🎨", value: 0.85, category: "design" },
  { name: "Testing", icon: "✓", value: 0.7, category: "tools" },
];

// Fonction pour créer une géométrie d'hexagone
function createHexagonGeometry(radius = 1, height = 0.2) {
  const shape = new THREE.Shape();
  const sides = 6;
  const angle = Math.PI * 2 / sides;

  // Créer la forme hexagonale
  for (let i = 0; i < sides; i++) {
    const x = radius * Math.cos(angle * i);
    const y = radius * Math.sin(angle * i);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();

  // Extrude la forme pour créer un volume
  const extrudeSettings = {
    depth: height,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.02,
    bevelSegments: 3
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

// Hexagone 3D
function HexagonIcon({ color, isHovered }: { color: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hexGeometry = createHexagonGeometry(0.5, 0.15);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={hexGeometry} />
      <meshPhysicalMaterial 
        color={color}
        roughness={0.1}
        metalness={0.7}
        transparent={true}
        opacity={0.9}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={color}
        emissiveIntensity={isHovered ? 0.4 : 0.2}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

// Composant pour créer une icône 3D et le texte
function IconWithText({ 
  skill, 
  index, 
  totalSkills,
  hovered,
  setHovered
}: {
  skill: Skill;
  index: number;
  totalSkills: number;
  hovered: number | null;
  setHovered: (index: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isHovered = hovered === index;
  
  // Positionnement basé sur l'index
  const y = index * -1.0 + totalSkills/2;
  
  // Couleurs pour les différentes catégories - correspondant au design existant
  const categoryColors = {
    frontend: "#FF5E78", // Rouge pour frontend
    backend: "#61DBFB",  // Bleu pour backend
    design: "#8A2BE2",   // Violet pour design
    tools: "#FFD700",    // Jaune pour tools/testing
    default: "#7CB9E8"
  };
  
  const color = categoryColors[skill.category as keyof typeof categoryColors];

  // Animation subtile
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Animation de flottement
    groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3 + index * 0.5) * 0.1 - 2;
    
    // Animation au survol
    if (isHovered) {
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1.1, 0.1);
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1.1, 0.1);
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1.1, 0.1);
    } else {
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1);
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1, 0.1);
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1, 0.1);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={[-2, y, 0]}
      onPointerOver={() => setHovered(index)}
      onPointerOut={() => setHovered(null)}
    >
      {/* Icône 3D Hexagone */}
      <HexagonIcon color={color} isHovered={isHovered} />
      
      {/* Symbole ou lettre à l'intérieur */}
      <Text 
        position={[0, 0, 0.2]} 
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {skill.icon}
      </Text>
      
      {/* Nom de la compétence */}
      <Text 
        position={[1.2, 0, 0]} 
        fontSize={0.32}
        color="white"
        anchorX="left"
        anchorY="middle"
        font={undefined}
      >
        {skill.name}
      </Text>
      
      {/* Pourcentage avec la barre de progression */}
      <group position={[3.8, 0, 0]}>
        <Text 
          position={[0.6, 0, 0]} 
          fontSize={0.26}
          color={isHovered ? "white" : "rgba(255,255,255,0.8)"}
          anchorX="right"
          anchorY="middle"
          font={undefined}
        >
          {Math.round(skill.value * 100)}%
        </Text>
        
        {/* Barre de progression */}
        <mesh position={[-0.8, -0.15, 0]} scale={[1.5, 0.08, 0.01]}>
          <planeGeometry />
          <meshBasicMaterial color="#ffffff" opacity={0.15} transparent={true} />
        </mesh>
        
        <mesh 
          position={[-0.8 + ((skill.value * 1.5) / 2) - 0.75, -0.15, 0.01]} 
          scale={[skill.value * 1.5, 0.08, 0.01]}
        >
          <planeGeometry />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

export default function SkillsVisualization3D() {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full glass rounded-lg overflow-hidden border border-white/10 bg-background/10 backdrop-blur-md">
      <div className={`w-full ${isMobile ? 'h-[380px]' : 'h-[430px]'} py-4`}>
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 40 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} color="#ff0080" intensity={0.4} />
          
          {/* Groupe de compétences */}
          {skills.map((skill, index) => (
            <Float 
              key={skill.name} 
              speed={1} 
              rotationIntensity={0.1} 
              floatIntensity={0.3}
            >
              <IconWithText 
                skill={skill} 
                index={index} 
                totalSkills={skills.length}
                hovered={hovered}
                setHovered={setHovered}
              />
            </Float>
          ))}
        </Canvas>
      </div>
    </div>
  );
} 