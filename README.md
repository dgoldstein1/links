# links

Exploration of links in different web frameworks, using [big-data graph DB](https://github.com/dgoldstein1/graphApi) as a backend.

[![CircleCI](https://circleci.com/gh/dgoldstein1/links.svg?style=svg)](https://circleci.com/gh/dgoldstein1/links)

[![Maintainability](https://api.codeclimate.com/v1/badges/7c7755873079fb9318cd/maintainability)](https://codeclimate.com/github/dgoldstein1/links/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/7c7755873079fb9318cd/test_coverage)](https://codeclimate.com/github/dgoldstein1/links/test_coverage)

### Development

```console
docker-compose up -d
```

The dev app will be served on `localhost:3000`. The backend will crawl about 1 million wikipedia articles and then exit, which should give enough data to power the UI. The backend dashboard can be seen [here](http://localhost:3001/d/-ItR25vWz/crawler-backend-overview?orgId=1&refresh=5s), the password is admin:admin.


## Authors

* **David Goldstein** - [DavidCharlesGoldstein.com](http://www.davidcharlesgoldstein.com/?links) - [Decipher Technology Studios](http://deciphernow.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
