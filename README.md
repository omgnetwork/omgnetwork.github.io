## OMG Developer Portal

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

### Documentation Updates

To add new documentation, you need to make changes inside `/docs` and `versioned_docs/version-${version}` directories as follows:

#### Create `.md` Files

The project maintains different versions of documentation that correspond with the latest version of the OMG Network. Therefore, you need to make changes to the versioned docs as well.

1. Add a new `${original_id}.md` file inside the `/docs` directory.

2. Add the proper meta data to the document's header as follows:
  
```
---
id: ${original_id}
title: ${title}
sidebar_label: ${sidebar_label}
---
```
3. Add a new `${original_id}.md` file inside the `versioned_docs/version-${version}` directory with the same content you've added in the 1-st step.

4. Add the proper meta data to the document's header as follows:
  
```
---
id: ${original_id}
title: ${title}
sidebar_label: ${sidebar_label}
original_id: ${original_id}
---
```

> - ${original_id} - the value for the actual id field (e.g. `retrieve-data`)
> - ${version} - the latest version of the dev portal that documentation is generated from (e.g. `V1`).
> - ${title} - the title of the page (e.g. `Retrieve Data`).
> - ${sidebar_label} - sidebar label of the page (e.g. `Retrieve Data`). Typically it's a shorter version of the title.

#### Edit Sidebars

To make the documents you've just created visible, include them to configs of your sidebars.

1. Enter `/website/sidebars.json` and add the `${original_id}` you've defined above to the relevant section that your page should be a part of:

```
"3. How-to Guides": [
      "version-1.0.0-how-to-guides",
      {
        "type": "subcategory",
        "label": "Watcher",
        "ids": [
          "run-watcher-locally",
          "run-watcher-vps",
          "manage-vps",
          "watcher-monitoring",
          "${original_id}"
        ]
      }
    ],
```

2. Enter `/website/versioned_sidebars/version-${version}-sidebars.json` and add the `version-${version}-${original_id}` you've defined above to the relevant section that your page should be a part of. You might consider creating a new subcategory if you think it's more appropriate place to put your new document:

```
"3. How-to Guides": [
      "version-${version}-how-to-guides",
      {
        "type": "subcategory",
        "label": "Community",
        "ids": [
          "version-${version}-${original_id}"
        ]
      }
    ],
```

#### Add Images

If you want to add images, include them into `/website/static/img` directory. After, you can reference them in the markdown as follows:

```
![account-balance](/img/quick-start-account-balance.png)
- or -
<img src="/img/quick-start-account-balance.png" width="500">
```

The version of Docusaurus used for the dev portal does not version assets. Image changes in future versions should upload and reference a different image.

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
