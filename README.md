## OMG Developer Portal

### Documentation Changes

Please follow [`CONTRIBUTING.md`](./CONTRIBUTING.md) guidelines when making any updates to the project.

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

All documentation is stored in the `docsdocsdocs` branch. The `master` is used strictly for deployment. To learn more info about deployment, refer to [Docusaurus docs](https://github.com/facebook/docusaurus/blob/master/docs/getting-started-publishing.md#using-github-pages). 

It's possible to deploy the project on multiple platforms. Enter `/website` directory and run the corresponding script:

#### Bash

```
GIT_USER=<GIT_USER> \ 
  USE_SSH=true \
  CURRENT_BRANCH=docsdocsdocs \
  npm run publish-gh-pages
```

#### Windows

```
cmd /C "set "GIT_USER=<GIT_USER>" && set CURRENT_BRANCH=dev && set USE_SSH=true && yarn deploy"
```

> `<GIT_USER>` - a GitHub account with push access to this repository.

### Versioning

The project will render files in the latest versioned directory. This means that new changes will not be reflected on the base URL unless they have been versioned. Therefore, to see the latest unversioned changes, append `/next` to the base URL as follows:

```
http://localhost:3000/next/welcome.html
```

Navigating further in the project will keep the latest changes.

To lock in the current state of docs with the next version, run the following command from `/website` directory:

```
$ npm run version ${next-version}
```

> - This command can only be run on new versions, not on existing versions.

To make changes to old versions, you can edit the markdowns directly in their relevant directories `/website/versioned_docs/version-<0.0.1etc>`, or use [`docusaurus-rename`](https://docusaurus.io/docs/en/versioning#renaming-existing-versions) script as follows:

```
yarn run rename-version ${current_version} ${next_version}
```

> - ${current_version} - the current version of the dev portal.
> - ${next_version} - the next version of the dev portal.
