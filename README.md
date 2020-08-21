## OMG Developer Portal

### Documentation Changes

Please follow [`CONTRIBUTING.md`](./CONTRIBUTING.md) guidelines when making any updates to the project.

New documentation or any changes in the `/docs` directory should be reflected in the `/website/versioned_docs/version-${latest_version}` directory and `/website/versioned_sidebars/version-${latest_version}-sidebars.json` file accordingly. This should be done by the users with admin rights only as follows:

1. Copy `${original_id}.md` file(s) (should correspond with the file(s) from `/docs` directory) to the `/website/versioned_docs/version-${version}` directory.

2. Edit the meta data in the document's header as follows:
  
```js
---
id: version-${latest_version}-${original_id}
title: ${title}
sidebar_label: ${sidebar_label}
original_id: ${original_id}
---
```

3. Enter `/website/versioned_sidebars/version-${version}-sidebars.json` and add all of the changes to category or subcategory that has been updated in the `sidebars.json` using the following format:

```js
version-${version}-${original_id}
```

> - ${latest_version} - the latest version of the dev portal.
> - ${original_id} - the value for the actual id field (e.g. `retrieve-data`)
> - ${version} - the latest version of the dev portal that documentation is generated from (e.g. `V1`).
> - ${title} - the title of the page (e.g. `Retrieve Data`).
> - ${sidebar_label} - sidebar label of the page (e.g. `Retrieve Data`). Typically it's a shorter version of the title.

Alternatevily, you can remove the latest version files of the dev portal, including `/website/versioned_docs/version-${latest-version}` directory, `/website/versioned_sidebars/version-${version}-sidebars.json` file, and the version name in the `versions.json` file). Then run the following command to recreate all of the versioned files:

```js
$ npm run version ${latest_version}
```

### Running Locally

#### Enter `/website` directory:

```
cd website
```

#### Install Dependencies

```
npm install
```

#### Start a Local Server on Port 3000

```
npm run start
```

### Deployment

The project uses GitHub pages to deploy a website. The current project is an organization repository, the script below will deploy static files to the `master` branch.

All documentation is stored in the `gh-pages` branch. The `master` is used strictly for deployment. To learn more info about deployment, refer to [Docusaurus docs](https://github.com/facebook/docusaurus/blob/master/docs/getting-started-publishing.md#using-github-pages). 

It's possible to deploy the project on multiple platforms. Enter `/website` directory and run the corresponding script:

#### Bash

```js
GIT_USER=<GIT_USER> \ 
  USE_SSH=true \
  CURRENT_BRANCH=gh-pages \
  npm run publish-gh-pages
```

#### Windows

```js
cmd /C "set "GIT_USER=<GIT_USER>" && set CURRENT_BRANCH=gh-pages && set USE_SSH=true && yarn deploy"
```

> `<GIT_USER>` - a GitHub account with push access to this repository.

### Versioning

The project will render files in the latest versioned directory. This means that new changes will not be reflected on the base URL unless they have been versioned. Therefore, to see the latest unversioned changes, append `/next` to the base URL as follows:

```js
http://localhost:3000/next/welcome.html
```

Navigating further in the project will keep the latest changes.

To lock in the current state of docs with the next version, run the following command from `/website` directory:

```js
$ npm run version ${next-version}
```

> - This command can only be run on new versions, not on existing versions.

To make changes to old versions, you can edit the markdowns directly in their relevant directories `/website/versioned_docs/version-${old_version}`. You can also rename the version name with [`docusaurus-rename`](https://docusaurus.io/docs/en/versioning#renaming-existing-versions) script as follows:

```js
yarn run rename-version ${latest_version} ${next_version}
```

> - ${latest_version} - the latest version of the dev portal.
> - ${next_version} - the next version of the dev portal.
> - ${old_version} - the older version of the dev portal.
