help:
	@echo "make build-frontend - Builds the landing page and copies that into docusaurus(website)"
	@echo "make build-docs - Builds the docusaurus site"

build-frontend:
	cd frontend; npm run-script build
	cp -rf frontend/build/. website/static

build-docs:
	cd website; npm run-script build

start:
	cd website; npm run-script start
