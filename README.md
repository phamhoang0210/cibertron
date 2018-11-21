# Run the app locally

* Install [Yarn](https://yarnpkg.com/en/)
* Ensure node version is >= 6.0
* Copy files `database.yml, secrest.yml, authservice_jwt.pub` to app/config
* Run `bundle install`
* Run `yarn install`
* Run `foreman start -f Procfile.dev`
* Visit http://localhost:3000

## Installation notes

It was created via: `rails new gaia --webpack=react -d mysql`

## Interesting files not present in previous versions of Rails

- [package.json](package.json)
- [yarn.lock](yarn.lock)
- [.babelrc](.babelrc)
- [config/webpack/custom.js](config/webpack/custom.js)
- [config/webpacker.yml](config/webpacker.yml)
- [app/javascript/packs](app/javascript/packs)
- [bin/webpack-dev-server](bin/webpack-dev-server)