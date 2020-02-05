# OMG Network Documentation

### Documentation changes
To update the documentation, you only need to work inside the `/docs` folder. All changes to `master` will be deployed and reflected in the published docs.

To add new documentation, follow these steps:
1. Add a new `.md` file inside the `/docs` folder.
2. Add the proper meta data to the top of the page.
  ```
  ---
  id: welcome
  title: About OmiseGO
  sidebar_label: About OmiseGO
  ---
  ```
3. Find `/website/sidebars.json` and add the `id` as you defined above to the relevant section you want the page to show up in.
4. Create a PR to merge into `master`.

Note: to add images, they must be included in `/website/static/img`. They can be referenced in the markdown like:

```
![account-balance](/img/quick-start-account-balance.png)
- or -
<img src="/img/quick-start-account-balance.png" width="500">
```

The version of Docusaurus we are using does not version assets so image changes and future versions must upload and reference a different image.

### To run locally
- `$ cd website` -> step into `/website` directory
- `$ npm install` -> install dependencies
- `$ npm run start` -> start local server serving site on port 3000

### Versioning
Note that new changes will not be reflected on the base url unless they have been versioned. To see the latest unversioned changes, append `/next` before the page you are visiting.
ie. `http://localhost:3000/next/welcome.html`
Navigating further in the app will stay on the latest changes.

To lock in the current state of docs with the next version run the following from `/website` folder. Please use sem-ver syntax.
- `$ npm run version <next version number>`

### Production
- Automatically will build and deploy master
