local-build:
	docker-compose -f docker-compose.dev.yml build

dev:
	docker-compose -f docker-compose.dev.yml up

down:
	docker-compose -f docker-compose.dev.yml down