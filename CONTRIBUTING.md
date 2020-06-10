## Contributing to the OMG Development Portal

### Submitting Guidelines

#### Submitting an Issue

...

#### Submitting a Pull Request

...

### Documentation Guidelines

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
