## umi-electron-typescript demo
技术栈：ts+electron+react hook

## 可能会遇到的问题
### mac catalina下打包
mac升级catalina后不支持32位程序，打包win版本的包是32位的，所以可以通过docker打包。
[具体issue]('https://github.com/electron-userland/electron-builder/issues/4305#issuecomment-559694472')
使用docker打包
```
docker run --rm -ti \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine
```
进入container后使用:
```
yarn run win
```