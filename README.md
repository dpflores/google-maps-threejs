# next 3d vehicles

Use of react threeJs fiber library for vehicle showcase and google maps API for 3D map navigation.

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
