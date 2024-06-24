build-dev:
	docker build --target dev -t vue3-front-marka .

build-prod:
	docker build --target prod -t vue3-front-marka .

run-dev:
	docker run --rm --name vue3-front-marka -d -p5599:5599 vue3-front-marka

stop:
	docker stop vue3-front-marka