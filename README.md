# Deploying the dev-portal

_FIXME – This is kind of a dumb way to do this. There may have been :beers: involved when we set this up._

## Setup

```
# Clone the dev-portal repo
git clone https://github.com/omisego/dev-portal.git

# Clone this repo
git clone https://github.com/omisego/omisego.github.io.git
```


```
# go into the cloned dev-portal directory
cd dev-portal/frontend

# build the static assets
yarn build

# copy the built assets into the directory for this repo
cp -R build/* ../../omisego.github.io

# go to that directory
cd ../../omisego.github.io

# -- create a new commit ---
git add .
git commit -m "Built dev-portal <SHA>"
git push origin master

# Viola! :beers:
```
