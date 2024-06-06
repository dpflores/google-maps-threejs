import React, { useState, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import ThreejsOverlayView from "@ubilabs/threejs-overlay-view";
import { CatmullRomCurve3, Line, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  center: { lat: -12.06933683122922, lng: -77.0366798662307 },
  zoom: 21,
  disableDefaultUI: false,
  heading: -95,
  tilt: 60,
  headingInteractionEnabled: true,
};

export default function App() {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}>
      <MyMap />
    </Wrapper>
  );
}

function MyMap() {
  const [route, setRoute] = useState(null);
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);

  return (
    <>
      <div ref={ref} id="map" />
      {map && <Directions setRoute={setRoute} />}
      {map && route && <Animate map={map} route={route} />}
    </>
  );
}

const ANIMATION_MS = 60000;
const FRONT_VECTOR = new Vector3(0, -1, 0);

function Animate({ map, route }) {
  const overlayRef = useRef();
  const trackRef = useRef();
  const carRef = useRef();

  useEffect(() => {
    map.setCenter(route[0]);
    map.setZoom(19.8);
    if (!overlayRef.current) {
      overlayRef.current = new ThreejsOverlayView(mapOptions.center);
      overlayRef.current.setMap(map);
    }
    const scene = overlayRef.current.getScene();
    const points = route.map((p) => overlayRef.current.latLngAltToVector3(p));

    const curve = new CatmullRomCurve3(points);

    // TRACK
    if (trackRef.current) {
      scene.remove(trackRef.current);
    }

    trackRef.current = createTrackFromCurve(curve);

    scene.add(trackRef.current);

    // MODEL
    loadModel().then((model) => {
      if (carRef.current) {
        scene.remove(carRef.current);
      }
      carRef.current = model;
      scene.add(carRef.current);
    });

    overlayRef.current.update = () => {
      trackRef.current.material.resolution.copy(
        overlayRef.current.getViewportSize()
      );
      if (carRef.current) {
        const progress = (performance.now() % ANIMATION_MS) / ANIMATION_MS;
        curve.getPointAt(progress, carRef.current.position); // sets the car to the path
        carRef.current.quaternion.setFromUnitVectors(
          FRONT_VECTOR,
          curve.getTangentAt(progress)
        );
        carRef.current.rotateX(Math.PI / 2);

        map.moveCamera({
          // zoom: 22,
          center: overlayRef.current.vector3ToLatLngAlt(
            carRef.current.position
          ),
          heading: (carRef.current.rotation.y * 180) / Math.PI,
        });
      }
      overlayRef.current.requestRedraw();
    };

    return () => {
      scene.remove(trackRef.current);
      scene.remove(carRef.current);
    };
  }, [route]);

  return null;
}

async function loadModel() {
  const loader = new GLTFLoader();
  const object = await loader.loadAsync("/tesla_model_3/scene.gltf");
  const group = object.scene;
  group.scale.setScalar(0.2);
  return group;
}

function createTrackFromCurve(curve) {
  const points = curve.getSpacedPoints(curve.points.length * 10);
  const positions = points.map((point) => point.toArray()).flat();
  return new Line2(
    new LineGeometry().setPositions(positions),
    new LineMaterial({
      color: 0xff0000,
      linewidth: 2,
    })
  );
}

function Directions({ setRoute }) {
  const [origin, setOrigin] = useState("Av. Edgardo Rebagliati Lima");
  const [destination, setDestination] = useState("Av. Arequipa 24 Lima");

  useEffect(() => {
    fetchDirections(origin, destination, setRoute);
  }, []);

  const onForm = (e) => {
    e.preventDefault();
    setOrigin(e.target[0].value);
    setDestination(e.target[1].value);
    fetchDirections(e.target[0].value, e.target[1].value, setRoute);
    console.log(e.target[0].value, e.target[1].value);
  };

  return (
    <>
      {/* <div className="directions">
        <h2>Directions</h2>
        <h3>Origin: </h3>
        <p>{origin}</p>
        <h3>Destination</h3>
        <p>{destination}</p>
      </div> */}

      <div className="directions">
        <Link className="return2" href="/">
          <FontAwesomeIcon icon={faArrowLeft} /> Return
        </Link>
        <form onSubmit={onForm}>
          <label>
            Origin:
            <input type="text" name="origin" defaultValue={origin} />
          </label>
          <label>
            Destination:
            <input type="text" name="destination" defaultValue={destination} />
          </label>
          <input type="submit" value="Submit" />
          <div></div>
        </form>
      </div>
    </>
  );
}

async function fetchDirections(origin, destination, setRoute) {
  try {
    const [originResults, destinationResults] = await Promise.all([
      getGeocode({ address: origin }),
      getGeocode({ address: destination }),
    ]);

    const [originLocation, destinationLocation] = await Promise.all([
      getLatLng(originResults[0]),
      getLatLng(destinationResults[0]),
    ]);

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: originLocation,
        destination: destinationLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          const route = result.routes[0].overview_path.map((path) => ({
            lat: path.lat(),
            lng: path.lng(),
          }));
          setRoute(route);
        }
      }
    );
  } catch (e) {
    console.log(e);
    alert("You need to provide valid directions");
  }
}
