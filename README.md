# next 3d vehicles

Use of react threeJs fiber library for vehicle showcase and google maps API for 3D map navigation.

You will need a google maps API key and the map ID for the map to work. Check `.env.template`

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
