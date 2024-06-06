import Link from "next/link";

export default function App() {
  return (
    <div className="index">
      <h1>3D Vehicle Models</h1>
      <ul>
        <li>
          <Link href="/3dcar2">3D Tesla Vehicle</Link>
        </li>
        <li>
          <Link href="/3dcar">3D Corvette Vehicle</Link>
        </li>
        <li>
          <Link href="/3dmap">3D Vehicle on Google Maps</Link>
        </li>
        {/* <li>
          <Link href="/car">ThreeJS Car</Link>
        </li>
        <li>
          <Link href="/intro">ThreeJS Intro</Link>
        </li> */}
        {/* <li>
        <Link href="/markers">Advanced Markers</Link>
      </li> */}
      </ul>

      <h3>
        By{" "}
        <a
          className="footer-link"
          href="https://github.com/dpflores/next-3d-vehicles"
        >
          Del Piero Flores
        </a>
      </h3>
    </div>
  );
}
