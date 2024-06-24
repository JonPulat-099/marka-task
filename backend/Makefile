build-dev:
	docker build --target dev -t vue3-back-marka .

build-prod:
	docker build --target prod -t vue3-back-marka .

run-dev:
	docker run --rm --name vue3-back-marka -d -p2332:2332 vue3-back-marka

start: 
	docker start vue3-back-marka

stop:
	docker stop vue3-back-marka