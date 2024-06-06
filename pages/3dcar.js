import { Canvas } from "@react-three/fiber";
import { useLoader, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/chevrolet_corvette_c7/scene.gltf");
  const group = gltf.scene.children[0].children[0].children[0];
  console.log(group);
  console.log(group.children[0]);

  useFrame((state, delta) => {
    group.children[0].rotation.x += delta;
    group.children[2].rotation.x += delta;
    group.children[4].rotation.x += delta;
    group.children[6].rotation.x += delta;
  });
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ position: "absolute" }}
      >
        {/* <color attach="background" args={["#101010"]} /> */}
        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={"sunset"}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>

      <Link className="return" href="/">
        <FontAwesomeIcon icon={faArrowLeft} /> Return
      </Link>
    </div>
  );
}
