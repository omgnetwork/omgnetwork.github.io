## Contributing to the OMG Developer Portal

### Got a Question or Problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. If you have any questions, use assistance from the chat you can find on the bottom right corner of the website. Also, don't forget to check the [FAQ](https://docs.omg.network/faq) section of the dev portal, as some of the questions might be already answered.

### Found an Issue?

If you find a bug in code samples or a mistake in the documentation, you can submit an issue to our [GitHub repository](https://github.com/omgnetwork/omgnetwork.github.io), or submit a Pull Request with a fix.

### Missing Documentation?

If you're missing code samples or documentation that hasn't been covered in the OMG Developer Portal, you can open an issue. Our team will review your request and add the corresponding content if appropriate.

### Submission Guidelines

#### Submitting an Issue

Before you submit an issue, please search the archive, maybe an issue for your problem already exists or is already solved. If your issue hasn't been reported, open a new issue. We want to fix any critical issues as soon as possible, but before we need to reproduce and confirm it. 

If your issue is documentation-related, use the following structure:

```
Issue type: 
Documentation URL (if exists): 
Documentation section: 

Expected content: 

Actual content: 

```

> - Issue type samples: suggestion, typo, language, docs request, etc.
> - Documentation section should correspond with the existing sections (e.g. Tutorials, Concepts, Resources, etc.) or it can be a new section you would like to add.
> - Expected and actual content shouldn't be too long. It's a brief overview of what you think should be added or modified.

If your issue is code-related, use the following structure:

```
Browser: 
Browser version: 
Operating system: 
Operating system version: 

Steps to reproduce the problem:
1. 
2. 
3. 

Expected result: 

Actual result: 

Please provide any other information below, and attach a screenshot if possible.
```

#### Submitting a Pull Request

1. Clone this repository:

```
git clone https://github.com/omgnetwork/omgnetwork.github.io.git
```

2. Checkout to `docsdocsdocs` branch that contains the project's source code:

```
git checkout docsdocsdocs
```

3. Checkout to a new branch with `<GIT_USERNAME>/<FEATURE>` name:

```
git checkout -b <GIT_USERNAME>/<FEATURE>
```

4. Make changes according to the [Documentation Guidelines](#documentation-guidelines).
5. Submit the PR to the `docsdocsdocs` branch for review. Don't submit the PR to the `master` branch, it's strictly for deployment.
6. When your PR is approved, please use the `Squash and merge` option to maintain more clear commit history.
7. After your PR is merged, you can safely delete your branch and pull the changes from the main (upstream) repository.

#### Commit Message Guidelines

There are no strict commit guidelines when you're working with your branch. However to maintain consistency across the entire project, please use the following pull request naming when merging:
- `[Add]: <FEATURE>` - when adding new documentation or code samples.
- `[Update]: <FEATURE>` - when updating the existing documentation.

> `<FEATURE>` - a short description of the changes you've made in the PR (e.g. `[Add]: OMG Wallet Quick Start`).

### Documentation Guidelines

To add new documentation, you need to make changes inside `/docs` directory as follows:

#### Create `.md` File

1. Add a new `${original_id}.md` file inside the `/docs` directory.
2. Add the proper meta data to the document's header as follows:
  
```
---
id: ${original_id}
title: ${title}
sidebar_label: ${sidebar_label}
---
```
> - ${original_id} - the value for the actual id field (e.g. `retrieve-data`)
> - ${title} - the title of the page (e.g. `Retrieve Data`).
> - ${sidebar_label} - sidebar label of the page (e.g. `Retrieve Data`). Typically it's a shorter version of the title.

#### Edit Sidebars

To make the documents you've just created visible, include them to configs of your sidebars.

Enter `/website/sidebars.json` and add the `${original_id}` you've defined above to the relevant section that your page should be a part of:

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

#### Add Images

If you want to add images, include them into `/website/static/img` directory. After, you can reference them in the markdown as follows:

```
![account-balance](/img/quick-start-account-balance.png)
- or -
<img src="/img/quick-start-account-balance.png" width="500">
```
