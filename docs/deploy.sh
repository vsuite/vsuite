#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# deploy to a custom domain
echo 'vsuite.blackcater.win' > CNAME

git init

git add -A

time=$(date "+%Y/%m/%d-%H:%M:%S")

git commit -m "deploy on ${time}"

git push -f https://github.com/vsuite/vsuite.github.io.git master:master

cd -
