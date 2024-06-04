import Link from "next/link";

export default function App() {
  return (
    <ul>
      <li>
        <Link href="/car">ThreeJS Car</Link>
      </li>
      <li>
        <Link href="/intro">ThreeJS Intro</Link>
      </li>
      {/* <li>
        <Link href="/markers">Advanced Markers</Link>
      </li> */}
      <li>
        <Link href="/3dmap">3D Vehicle on Google Maps</Link>
      </li>
      <li>
        <Link href="/3dcar">3D Vehicle</Link>
      </li>
    </ul>
  );
}
