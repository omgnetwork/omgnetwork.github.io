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

### To run locally
- `$ cd website` -> step into `/website` directory
- `$ yarn` -> install dependencies
- `$ yarn start` -> start local server serving site on port 3000

### Production
- Automatically will build and deploy master
