import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function App() {
  const [model, setModel] = useState(null);
  useEffect(() => {
    loadModel().then((model) => {
      //   setModel(model);
    });
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <OrbitControls enableZoom={false} />
      <Suspense fallback={null}>{model}</Suspense>
      <Environment preset="sunset" />
    </Canvas>
  );
}

async function loadModel() {
  const loader = new GLTFLoader();
  const object = await loader.loadAsync("/tesla_model_3/scene.gltf");
  const group = object.scene;
  group.scale.setScalar(0.2);
  return group;
}
