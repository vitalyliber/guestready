# guestready

**ruby version:** 2.3.1

**gemset:** guestready

## How to start application for developing

Start postgres container:

```
docker-compose up
```

Create migrations:

```
rake db:create db:migrate
```

Start your Rails server:

```
rails start
```

Start webpack dev server:

```
./bin/webpack-dev-server

```

## How to start system tests

```
rake assets:precompile
rails test:system
```

## How to start controllers tests

```
rails test
```

## How to add new package

```
yarn add package-name
```
