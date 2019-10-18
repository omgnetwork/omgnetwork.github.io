MAKEFLAGS += --silent
all: clean serve

help:
	@echo "Available make tasks:"
	@echo "* [all] - clean, build, serve"
	@echo "* clean - removes build artifacts"
	@echo "* build - builds frontend"
	@echo "* deploy - build, prepare for serving"
	@echo "* serve - serves the documentation site"

clean:
	@echo "Cleaning..."
	@git clean -df
	@rm -rf frontend/build frontend/node_modules
	@rm -rf website/node_modules

deps: frontend-deps website-deps
build: frontend-deps frontend-build
publish: frontend-copy frontend-fix-paths
deploy: deps build publish
serve: deploy website-serve

frontend-deps:
	@echo "Frontend: Installing deps..."
	@cd frontend && npm install > /dev/null

frontend-build: frontend-deps
	@echo "Frontend: Building..."
	@cd frontend && npm run-script build > /dev/null

frontend-copy:
	@echo "Publishing frontend..."
	@cp -R frontend/build/img frontend/build/static/js frontend/build/static/css website/static
	@cp frontend/build/index.html website/static

frontend-fix-paths:
	@cd website/static && sed -i '' 's/\/static\//\//g' index.html

website-deps:
	@echo "Website: Installing deps..."
	@cd website && npm install > /dev/null

website-serve:
	@cd website && npx docusaurus-start