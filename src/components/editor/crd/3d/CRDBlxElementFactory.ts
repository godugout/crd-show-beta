// CRDBLX Element Factory - Creates 3D building blocks
import * as THREE from 'three';
import type { MaterialName } from '@/types/crdblx';

export class CRDBlxElementFactory {
  private materialLibrary: Map<MaterialName, THREE.Material>;
  
  constructor() {
    this.initializeMaterials();
  }

  private initializeMaterials(): void {
    this.materialLibrary = new Map();
    
    // Plastic materials (LEGO-style)
    this.materialLibrary.set('plastic-red', new THREE.MeshLambertMaterial({ 
      color: 0xff0000
    }));
    this.materialLibrary.set('plastic-blue', new THREE.MeshLambertMaterial({ 
      color: 0x0066cc
    }));
    this.materialLibrary.set('plastic-green', new THREE.MeshLambertMaterial({ 
      color: 0x00cc66
    }));
    this.materialLibrary.set('plastic-yellow', new THREE.MeshLambertMaterial({ 
      color: 0xffcc00
    }));
    this.materialLibrary.set('plastic-white', new THREE.MeshLambertMaterial({ 
      color: 0xffffff
    }));
    
    // Metal materials
    this.materialLibrary.set('metal-silver', new THREE.MeshStandardMaterial({
      color: 0xc0c0c0, 
      metalness: 0.8, 
      roughness: 0.2
    }));
    this.materialLibrary.set('metal-gold', new THREE.MeshStandardMaterial({
      color: 0xffd700, 
      metalness: 0.9, 
      roughness: 0.1
    }));
    this.materialLibrary.set('metal-copper', new THREE.MeshStandardMaterial({
      color: 0xb87333, 
      metalness: 0.8, 
      roughness: 0.3
    }));
    
    // Glass materials
    this.materialLibrary.set('glass-clear', new THREE.MeshPhysicalMaterial({
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.3, 
      transmission: 0.9,
      roughness: 0.0,
      ior: 1.5
    }));
    this.materialLibrary.set('glass-frosted', new THREE.MeshPhysicalMaterial({
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.5, 
      transmission: 0.5,
      roughness: 0.8,
      ior: 1.5
    }));
    this.materialLibrary.set('glass-tinted', new THREE.MeshPhysicalMaterial({
      color: 0x88ccff, 
      transparent: true, 
      opacity: 0.4, 
      transmission: 0.7,
      roughness: 0.1,
      ior: 1.5
    }));
    
    // Neon/Emissive materials
    this.materialLibrary.set('neon-blue', new THREE.MeshStandardMaterial({
      color: 0x00ffff, 
      emissive: 0x0088ff, 
      emissiveIntensity: 0.5
    }));
    this.materialLibrary.set('neon-green', new THREE.MeshStandardMaterial({
      color: 0x00ff00, 
      emissive: 0x008800, 
      emissiveIntensity: 0.5
    }));
    this.materialLibrary.set('neon-pink', new THREE.MeshStandardMaterial({
      color: 0xff00ff, 
      emissive: 0x880088, 
      emissiveIntensity: 0.5
    }));
    this.materialLibrary.set('neon-purple', new THREE.MeshStandardMaterial({
      color: 0x8800ff, 
      emissive: 0x440088, 
      emissiveIntensity: 0.5
    }));
  }

  // Basic CRDBLX blocks
  public createCube(size: number = 1, material: MaterialName = 'plastic-red'): THREE.Group {
    const group = new THREE.Group();
    
    // Main block geometry
    const geometry = new THREE.BoxGeometry(size * 0.1, size * 0.1, 0.15);
    const block = new THREE.Mesh(geometry, this.getMaterial(material));
    block.castShadow = true;
    block.receiveShadow = true;
    group.add(block);
    
    // Add connection studs on top
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const stud = this.createStud(0.02, 0.01, material);
        stud.position.set(
          (x - (size-1)/2) * 0.1,
          (y - (size-1)/2) * 0.1,
          0.075 + 0.005
        );
        group.add(stud);
      }
    }
    
    return group;
  }

  public createRectangle(width: number, height: number, material: MaterialName = 'plastic-blue'): THREE.Group {
    const group = new THREE.Group();
    
    // Main block geometry
    const geometry = new THREE.BoxGeometry(width * 0.1, height * 0.1, 0.15);
    const block = new THREE.Mesh(geometry, this.getMaterial(material));
    block.castShadow = true;
    block.receiveShadow = true;
    group.add(block);
    
    // Add studs
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const stud = this.createStud(0.02, 0.01, material);
        stud.position.set(
          (x - (width-1)/2) * 0.1,
          (y - (height-1)/2) * 0.1,
          0.075 + 0.005
        );
        group.add(stud);
      }
    }
    
    return group;
  }

  public createWedge(size: number = 1, material: MaterialName = 'plastic-green'): THREE.Mesh {
    // Create wedge using custom geometry
    const geometry = new THREE.BufferGeometry();
    const s = size * 0.05; // Half size for positioning
    
    const vertices = new Float32Array([
      // Bottom face
      -s, -s, 0,   s, -s, 0,   s, s, 0,
      -s, -s, 0,   s, s, 0,   -s, s, 0,
      
      // Top triangle
      -s, -s, 0.15,   s, -s, 0.15,   0, s, 0.15,
      
      // Side faces
      -s, -s, 0,   -s, -s, 0.15,   -s, s, 0,
      -s, s, 0,    -s, -s, 0.15,   0, s, 0.15,
      
      s, -s, 0,    s, s, 0,      s, -s, 0.15,
      s, s, 0,     0, s, 0.15,   s, -s, 0.15,
      
      // Back face
      -s, -s, 0,   s, -s, 0,     -s, -s, 0.15,
      s, -s, 0,    s, -s, 0.15,  -s, -s, 0.15
    ]);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    
    const mesh = new THREE.Mesh(geometry, this.getMaterial(material));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    return mesh;
  }

  public createCylinder(radius: number = 0.05, height: number = 0.15, material: MaterialName = 'plastic-yellow'): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 16);
    const mesh = new THREE.Mesh(geometry, this.getMaterial(material));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    return mesh;
  }

  public createPlatform(width: number, height: number, material: MaterialName = 'plastic-white'): THREE.Group {
    const group = new THREE.Group();
    
    // Main platform (thinner than regular blocks)
    const geometry = new THREE.BoxGeometry(width * 0.1, height * 0.1, 0.05);
    const platform = new THREE.Mesh(geometry, this.getMaterial(material));
    platform.castShadow = true;
    platform.receiveShadow = true;
    group.add(platform);
    
    // Add connection studs underneath for attachment
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const connector = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 8);
        const connectorMesh = new THREE.Mesh(connector, this.getMaterial(material));
        connectorMesh.position.set(
          (x - (width-1)/2) * 0.1,
          (y - (height-1)/2) * 0.1,
          -0.035
        );
        group.add(connectorMesh);
      }
    }
    
    return group;
  }

  public createArch(width: number = 4, material: MaterialName = 'plastic-white'): THREE.Group {
    const group = new THREE.Group();
    
    // Create arch using CSG-like approach (subtract cylinder from box)
    const baseGeometry = new THREE.BoxGeometry(width * 0.1, 0.1, 0.15);
    const base = new THREE.Mesh(baseGeometry, this.getMaterial(material));
    
    // Create arch opening (simplified - in real implementation would use CSG)
    const archRadius = (width * 0.1) / 4;
    const archGeometry = new THREE.CylinderGeometry(archRadius, archRadius, 0.1, 16, 1, false, 0, Math.PI);
    const arch = new THREE.Mesh(archGeometry, this.getMaterial(material));
    arch.rotation.z = Math.PI / 2;
    arch.position.y = 0;
    arch.position.z = 0.05;
    
    group.add(base);
    group.add(arch);
    
    return group;
  }

  public createDome(radius: number = 0.2, material: MaterialName = 'glass-clear'): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(radius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, this.getMaterial(material));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    return mesh;
  }

  // Technical/special elements
  public createTechnicBeam(length: number, material: MaterialName = 'plastic-yellow'): THREE.Group {
    const group = new THREE.Group();
    
    // Main beam
    const beamGeometry = new THREE.BoxGeometry(length * 0.1, 0.08, 0.08);
    const beam = new THREE.Mesh(beamGeometry, this.getMaterial(material));
    beam.castShadow = true;
    beam.receiveShadow = true;
    group.add(beam);
    
    // Add technic holes
    for (let i = 0; i < length; i++) {
      const holeGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.1, 8);
      const hole = new THREE.Mesh(holeGeometry, new THREE.MeshBasicMaterial({ color: 0x000000 }));
      hole.position.set((i - (length-1)/2) * 0.1, 0, 0);
      hole.rotation.z = Math.PI / 2;
      group.add(hole);
    }
    
    return group;
  }

  public createGear(teeth: number = 12, material: MaterialName = 'plastic-yellow'): THREE.Mesh {
    // Simplified gear - in real implementation would create proper gear teeth
    const geometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, teeth);
    const mesh = new THREE.Mesh(geometry, this.getMaterial(material));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    return mesh;
  }

  // Helper methods
  private createStud(radius: number, height: number, material: MaterialName): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 12);
    const mesh = new THREE.Mesh(geometry, this.getMaterial(material));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  private getMaterial(materialName: MaterialName): THREE.Material {
    const material = this.materialLibrary.get(materialName);
    if (!material) {
      console.warn(`Material "${materialName}" not found, using default`);
      return this.materialLibrary.get('plastic-red')!;
    }
    return material.clone(); // Clone to avoid shared material issues
  }

  public getMaterialNames(): MaterialName[] {
    return Array.from(this.materialLibrary.keys());
  }

  public createCustomElement(
    geometry: THREE.BufferGeometry, 
    material: MaterialName,
    hasStuds: boolean = true,
    studConfig?: { rows: number; cols: number }
  ): THREE.Group {
    const group = new THREE.Group();
    
    const mesh = new THREE.Mesh(geometry, this.getMaterial(material));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    
    if (hasStuds && studConfig) {
      for (let x = 0; x < studConfig.cols; x++) {
        for (let y = 0; y < studConfig.rows; y++) {
          const stud = this.createStud(0.02, 0.01, material);
          stud.position.set(
            (x - (studConfig.cols-1)/2) * 0.1,
            (y - (studConfig.rows-1)/2) * 0.1,
            0.08
          );
          group.add(stud);
        }
      }
    }
    
    return group;
  }

  // Effect elements
  public createParticleEffect(type: 'sparkle' | 'energy' | 'smoke'): THREE.Points {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Random positions in a small sphere
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      
      // Color based on effect type
      switch (type) {
        case 'sparkle':
          colors[i * 3] = 1;     // R
          colors[i * 3 + 1] = 1; // G
          colors[i * 3 + 2] = 0; // B (yellow)
          break;
        case 'energy':
          colors[i * 3] = 0;     // R
          colors[i * 3 + 1] = 1; // G
          colors[i * 3 + 2] = 1; // B (cyan)
          break;
        case 'smoke':
          const gray = Math.random() * 0.5 + 0.3;
          colors[i * 3] = gray;     // R
          colors[i * 3 + 1] = gray; // G
          colors[i * 3 + 2] = gray; // B
          break;
      }
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.01,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(geometry, material);
  }

  public dispose(): void {
    // Clean up materials
    this.materialLibrary.forEach(material => {
      if (material instanceof THREE.Material) {
        material.dispose();
      }
    });
    this.materialLibrary.clear();
  }
}