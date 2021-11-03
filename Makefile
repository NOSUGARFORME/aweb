ifneq (,$(wildcard .development.env))
	include .development.env
	export
	ENV_FILE_PARAM = --env-file .development.env
endif

build-dev:
	echo api client | xargs -n 1 cp .development.env
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --remove-orphans

up-dev:
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up

down-dev:
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml down

build-dev-windows:
	copy ./.development.env ./api
	copy ./.development.env ./client
	docker-compose -f ./docker-compose.yml up --build --remove-orphans

up-dev-windows:
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up

down-dev-windows:
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml down -v


