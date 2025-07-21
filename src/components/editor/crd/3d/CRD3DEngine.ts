// CRD 3D Engine - Complete Three.js Implementation
import * as THREE from 'three';
import type { CRDDimensions, LayerContainer, LayerElement } from '@/types/crdblx';

export class CRD3DEngine {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private layers: Map<number, THREE.Group>;
  private slabContainer: THREE.Group;
  private buildingGrid: THREE.Group;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  
  // Core measurements
  private readonly DIMENSIONS = {
    baseWidth: 2.5,
    baseHeight: 3.5,
    layerThickness: 0.15,
    maxDepth: 0.75,
    gridUnit: 0.1
  };

  // Event handlers
  private onElementSelect?: (elementId: string | null) => void;
  private onElementMove?: (elementId: string, position: THREE.Vector3) => void;

  constructor(container: HTMLElement) {
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    
    this.initializeScene();
    this.setupIsometricCamera();
    this.createRenderer(container);
    this.setupLighting();
    this.createSlabContainer();
    this.createBuildingGrid();
    this.setupEventHandlers(container);
    this.startRenderLoop();
  }

  private initializeScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a); // Match your UI
    
    // Initialize layer groups
    this.layers = new Map();
    for (let i = 1; i <= 5; i++) {
      const layerGroup = new THREE.Group();
      layerGroup.position.z = (i - 1) * this.DIMENSIONS.layerThickness;
      layerGroup.name = `layer-${i}`;
      this.layers.set(i, layerGroup);
    }
  }

  private setupIsometricCamera(): void {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 6;
    
    this.camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );
    
    // Isometric viewing angle (30°, 45°)
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);
  }

  private createRenderer(container: HTMLElement): void {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Enable shadows for better depth perception
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Tone mapping for better colors
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    
    container.appendChild(this.renderer.domElement);
  }

  private setupLighting(): void {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    
    // Main directional light with shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    
    // Shadow map configuration
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    
    this.scene.add(directionalLight);
    
    // Fill light from opposite side
    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
    
    // Rim light for edge definition
    const rimLight = new THREE.DirectionalLight(0xffaa88, 0.2);
    rimLight.position.set(0, -5, 10);
    this.scene.add(rimLight);
  }

  private createSlabContainer(): void {
    this.slabContainer = new THREE.Group();
    
    // Create translucent slab base with embedded image
    const slabGeometry = new THREE.BoxGeometry(
      this.DIMENSIONS.baseWidth,
      this.DIMENSIONS.baseHeight,
      this.DIMENSIONS.maxDepth + 0.1
    );
    
    const slabMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.15,           // Very translucent
      transmission: 0.9,       // Glass-like
      roughness: 0.0,
      metalness: 0.0,
      clearcoat: 1.0,
      ior: 1.5                 // Refractive index
    });
    
    const slabMesh = new THREE.Mesh(slabGeometry, slabMaterial);
    slabMesh.position.z = this.DIMENSIONS.maxDepth / 2;
    slabMesh.receiveShadow = true;
    this.slabContainer.add(slabMesh);
    
    // Add layer groups to container
    for (const [level, layerGroup] of this.layers) {
      this.slabContainer.add(layerGroup);
    }
    
    this.scene.add(this.slabContainer);
  }

  private createBuildingGrid(): void {
    this.buildingGrid = new THREE.Group();
    
    // Create grid lines for building guidance
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: 0x444444, 
      transparent: true, 
      opacity: 0.3 
    });
    
    // Vertical lines
    for (let x = 0; x <= 24; x++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3((x - 12) * this.DIMENSIONS.gridUnit, -this.DIMENSIONS.baseHeight / 2, 0),
        new THREE.Vector3((x - 12) * this.DIMENSIONS.gridUnit, this.DIMENSIONS.baseHeight / 2, 0)
      ]);
      const line = new THREE.Line(geometry, gridMaterial);
      this.buildingGrid.add(line);
    }
    
    // Horizontal lines
    for (let y = 0; y <= 34; y++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-this.DIMENSIONS.baseWidth / 2, (y - 17) * this.DIMENSIONS.gridUnit, 0),
        new THREE.Vector3(this.DIMENSIONS.baseWidth / 2, (y - 17) * this.DIMENSIONS.gridUnit, 0)
      ]);
      const line = new THREE.Line(geometry, gridMaterial);
      this.buildingGrid.add(line);
    }
    
    this.buildingGrid.visible = false; // Hidden by default
    this.scene.add(this.buildingGrid);
  }

  private setupEventHandlers(container: HTMLElement): void {
    // Mouse/touch event handlers for element selection and manipulation
    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (event: PointerEvent) => {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      // Check for intersections with selectable elements
      const selectableObjects: THREE.Object3D[] = [];
      this.layers.forEach(layer => {
        layer.children.forEach(child => {
          if (child.userData.selectable) {
            selectableObjects.push(child);
          }
        });
      });
      
      const intersects = this.raycaster.intersectObjects(selectableObjects, true);
      
      if (intersects.length > 0) {
        const selectedObject = this.findSelectableParent(intersects[0].object);
        if (selectedObject && this.onElementSelect) {
          this.onElementSelect(selectedObject.userData.elementId);
        }
      } else if (this.onElementSelect) {
        this.onElementSelect(null);
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
  }

  private findSelectableParent(object: THREE.Object3D): THREE.Object3D | null {
    let current = object;
    while (current && current.parent) {
      if (current.userData.selectable) {
        return current;
      }
      current = current.parent;
    }
    return null;
  }

  // Public API Methods

  public embedImageInSlab(imageTexture: THREE.Texture, depth: number = 0): void {
    // Remove existing embedded image
    const existingImage = this.slabContainer.getObjectByName('embedded-image');
    if (existingImage) {
      this.slabContainer.remove(existingImage);
    }

    // Create image plane inside slab
    const imageGeometry = new THREE.PlaneGeometry(2.4, 3.4); // Slightly smaller than slab
    const imageMaterial = new THREE.MeshBasicMaterial({
      map: imageTexture,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    });

    const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
    imageMesh.position.z = depth; // Position inside slab
    imageMesh.name = 'embedded-image';
    this.slabContainer.add(imageMesh);
  }

  public snapToGrid(position: THREE.Vector3): THREE.Vector3 {
    const gridSize = this.DIMENSIONS.gridUnit;
    return new THREE.Vector3(
      Math.round(position.x / gridSize) * gridSize,
      Math.round(position.y / gridSize) * gridSize,
      Math.round(position.z / this.DIMENSIONS.layerThickness) * this.DIMENSIONS.layerThickness
    );
  }

  public getLayer(level: number): THREE.Group | undefined {
    return this.layers.get(level);
  }

  public setLayerVisibility(level: number, visible: boolean): void {
    const layer = this.layers.get(level);
    if (layer) {
      layer.visible = visible;
    }
  }

  public addElementToLayer(element: LayerElement, mesh: THREE.Mesh): void {
    const layer = this.layers.get(element.gridPosition.z);
    if (layer) {
      // Set up mesh properties
      mesh.userData = {
        elementId: element.id,
        selectable: true,
        elementData: element
      };
      
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      // Position on grid
      const worldPosition = this.gridToWorldPosition(element.gridPosition);
      mesh.position.copy(worldPosition);
      
      layer.add(mesh);
      element.mesh = mesh;
    }
  }

  public removeElement(elementId: string): void {
    this.layers.forEach(layer => {
      const elementMesh = layer.children.find(child => 
        child.userData.elementId === elementId
      );
      if (elementMesh) {
        layer.remove(elementMesh);
      }
    });
  }

  public gridToWorldPosition(gridPos: { x: number; y: number; z: number }): THREE.Vector3 {
    return new THREE.Vector3(
      (gridPos.x - 12) * this.DIMENSIONS.gridUnit,  // Center grid
      (gridPos.y - 17) * this.DIMENSIONS.gridUnit,  // Center grid
      gridPos.z * this.DIMENSIONS.layerThickness
    );
  }

  public worldToGridPosition(worldPos: THREE.Vector3): { x: number; y: number; z: number } {
    return {
      x: Math.round(worldPos.x / this.DIMENSIONS.gridUnit + 12),
      y: Math.round(worldPos.y / this.DIMENSIONS.gridUnit + 17),
      z: Math.round(worldPos.z / this.DIMENSIONS.layerThickness)
    };
  }

  public setSlabMaterial(materialType: 'crystal' | 'glass' | 'energy' | 'metal'): void {
    const slabMesh = this.slabContainer.children.find(child => 
      child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry
    ) as THREE.Mesh;
    
    if (slabMesh && slabMesh.material instanceof THREE.MeshPhysicalMaterial) {
      switch (materialType) {
        case 'crystal':
          slabMesh.material.color.setHex(0x88ccff);
          slabMesh.material.transmission = 0.9;
          slabMesh.material.ior = 1.5;
          break;
        case 'glass':
          slabMesh.material.color.setHex(0xffffff);
          slabMesh.material.transmission = 0.95;
          slabMesh.material.ior = 1.52;
          break;
        case 'energy':
          slabMesh.material.color.setHex(0x00ffff);
          slabMesh.material.transmission = 0.7;
          slabMesh.material.emissive.setHex(0x001122);
          break;
        case 'metal':
          slabMesh.material.color.setHex(0xcccccc);
          slabMesh.material.transmission = 0.0;
          slabMesh.material.metalness = 0.9;
          slabMesh.material.roughness = 0.1;
          break;
      }
    }
  }

  public setSlabTransparency(opacity: number): void {
    const slabMesh = this.slabContainer.children.find(child => 
      child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry
    ) as THREE.Mesh;
    
    if (slabMesh && slabMesh.material instanceof THREE.MeshPhysicalMaterial) {
      slabMesh.material.opacity = Math.max(0.1, Math.min(0.95, opacity));
    }
  }

  public showBuildingGrid(show: boolean): void {
    this.buildingGrid.visible = show;
  }

  public setCameraMode(mode: 'isometric' | 'top' | 'front' | 'side'): void {
    switch (mode) {
      case 'isometric':
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);
        break;
      case 'top':
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
        break;
      case 'front':
        this.camera.position.set(0, 10, 0);
        this.camera.lookAt(0, 0, 0);
        break;
      case 'side':
        this.camera.position.set(10, 0, 0);
        this.camera.lookAt(0, 0, 0);
        break;
    }
  }

  public setEventHandlers(handlers: {
    onElementSelect?: (elementId: string | null) => void;
    onElementMove?: (elementId: string, position: THREE.Vector3) => void;
  }): void {
    this.onElementSelect = handlers.onElementSelect;
    this.onElementMove = handlers.onElementMove;
  }

  public resize(width: number, height: number): void {
    const aspect = width / height;
    const frustumSize = 6;
    
    this.camera.left = -frustumSize * aspect / 2;
    this.camera.right = frustumSize * aspect / 2;
    this.camera.top = frustumSize / 2;
    this.camera.bottom = -frustumSize / 2;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }

  private startRenderLoop(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  public dispose(): void {
    // Clean up resources
    this.renderer.dispose();
    this.scene.clear();
    
    // Remove event listeners if needed
    // This would be handled by the container component
  }
}