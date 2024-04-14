
world:
	@echo "make build"

build:
	docker build -t demonstrateur:1 .

rebuild: build
	docker save demonstrateur:1| microk8s ctr image import - 
	kubectl -n llng delete pods -l app=demonstrateur

restart-llng:
	kubectl -n llng delete pods -l app=lemonldap-manager --wait=false
	kubectl -n llng delete pods -l app=lemonldap-portal --wait=false
