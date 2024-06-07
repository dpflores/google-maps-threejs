# next 3d vehicles

Use of react threeJs fiber library for vehicle showcase and google maps API for 3D map navigation.

You will need a google maps API key and the map ID for the map to work (check [.env.template](https://github.com/dpflores/next-3d-vehicles/blob/main/.env.example))

## For development

in `.env` use
```
DOCKERFILE="Dockerfile.dev"
```

then run 

```
docker compose up --build
```

## For deployment

in `.env` use
```
DOCKERFILE="Dockerfile"
```

then run 

```
npm run build
docker compose up --build
```
