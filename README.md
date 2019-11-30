# @trutoo/ui-core

Basic whitelabled React components following strict code quality and accessibility used as a base plate for building websites.

## Commands

This is a monolithic repository using [Lerna](https://lerna.js.org) to run commands in each package and handle dependencies.

| Command       | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| `build`       | Builds each of the packages                                                    |
| `test`        | Runs tests in each of the packages                                             |
| `docs`        | Starts a storybook server for isolated testing                                 |
| `docs:deploy` | Deploys storybook to the [Github Pages](https://trutoo.github.io/uikit/)       |
| `version`     | Analyzes commits to semantically bump versions and create changelogs           |
| `release`     | Runs a collection of above commands and publishes each package to the registry |
