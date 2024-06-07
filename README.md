# next 3d vehicles

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
