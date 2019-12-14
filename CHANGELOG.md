# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.4.0](https://github.com/trutoo/uikit/compare/v1.3.0...v1.4.0) (2019-12-14)


### Bug Fixes

* changelog preset path and added release step back ([b3dd3ce](https://github.com/trutoo/uikit/commit/b3dd3ce5f56bab63b17b3cb2dce1d2c04eeb7154))
* reintroduced lerna bootstrap (incorrectly removed) ([e11389e](https://github.com/trutoo/uikit/commit/e11389e738f69438a1eedd43bbf8ee870871c0ef))


### Build System

* added docs deploy to release step ([5609f69](https://github.com/trutoo/uikit/commit/5609f6910c27b8174aba6727d0c96cffc568fb39))
* changed typescript process reducing build by 15s ([e43fc80](https://github.com/trutoo/uikit/commit/e43fc8013a04cf979ca70d317f2aec5822792b64))
* removed hoisting, small amount of deps ([551e684](https://github.com/trutoo/uikit/commit/551e68467e0fe342c6f24312d11934c2957adf55))
* updated registry url to allow alt scopes ([05c3d98](https://github.com/trutoo/uikit/commit/05c3d98cfeed4c29abb27e8b08470b1fc6d0294f))


### Code Refactoring

* migrated from storiesOf to CSF ([bc53099](https://github.com/trutoo/uikit/commit/bc53099ea24fba13fe4c868b11328237fcc9f4e8))


### Continuous Integration

* added ci workflow for pull requests ([73563d1](https://github.com/trutoo/uikit/commit/73563d19c7d8e0d4a6b497e75acb46812bf87244))
* added credentials and deeper fetch for bump ([9ca14a9](https://github.com/trutoo/uikit/commit/9ca14a930fc5fe0b9495bc37357fcba81409e4dd))
* added NPM_TOKEN to workflows as a secret ([96eff6e](https://github.com/trutoo/uikit/commit/96eff6e9dd3707cba9ac0235da133a88740f9a34))
* auth cd and ci steps, improved descriptions ([42211eb](https://github.com/trutoo/uikit/commit/42211ebc490cd8a762864d107bec26ed3232e505))
* changed user name and email config format ([6de71df](https://github.com/trutoo/uikit/commit/6de71df9258826f58620c616cc36404be7e2f684))
* fix attempt by setting registry-url ([c748b08](https://github.com/trutoo/uikit/commit/c748b080c1d0df86c6799fc4c9a03b6c09ea41c3))
* github actions cd workflow added ([32aa631](https://github.com/trutoo/uikit/commit/32aa63134069ed07af768c6e06e19879fc78d9cf))
* renamed build to release for cd workflow ([630d134](https://github.com/trutoo/uikit/commit/630d1345a64c7caf758bc49bf7e6bbd526dd492a))
* updated checkout action to v2-beta to fix detached head ([abb9eea](https://github.com/trutoo/uikit/commit/abb9eea6ca24f78734b9b172aae5b83c0d3c3461))


### Documentation

* fixed issue url ([68fc636](https://github.com/trutoo/uikit/commit/68fc636dedd4b80e4a07eba4f133c3fcbffaecf5))
* migrated to github style issues ([1e0317c](https://github.com/trutoo/uikit/commit/1e0317c886634ef58bfb1a514592a567f279a408))


### Features

* **changelog:** [#1](https://github.com/trutoo/uikit/issues/1) added changelog preset to lerna version [@swiftwork](https://github.com/swiftwork) ([84aea10](https://github.com/trutoo/uikit/commit/84aea1050b5074f14cf26af6174a648e9bc1b2f4))
* added dynamic elevation through knobs ([20545ff](https://github.com/trutoo/uikit/commit/20545ff9739e8762363ce08172be881cd158431b))
* updated dependencies and removed release script ([f275db9](https://github.com/trutoo/uikit/commit/f275db907a7b03269c594bad7bd879e4fc1a0fe2))


### Styles

* cleanup formatting ([8444d6d](https://github.com/trutoo/uikit/commit/8444d6ded314d8c735ccabed844ee5ab9abecbac))


### BREAKING CHANGES

* **changelog:** please amend this @swiftwork
