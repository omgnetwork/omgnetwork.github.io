build-frontend:
	cd frontend; npm run-script build
	cp -rf frontend/build/. website/static
