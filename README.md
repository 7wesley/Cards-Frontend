# Running the Application

## Run app

```sh
npm run start
```

## Build and run container

```bash
docker build -t cards-frontend .
docker run --name cards-frontend -p 3000:3000 cards-frontend
```
