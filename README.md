Demo container designed to help debugging LemonLDAP::NG SSO questions in Kubernetes environment:

* GET / returns all headers received, remote-addr and hostname (to check loadbalancing)
* POST /llng/auth {"user": "firstname.lastname", "password": "group1,group2,g3"} is a yes-card for
LemonLDAP::NG authentication via rest. It's meant to be used as LemonLDAP::NG Rest authentication backend.
This will build a session for the user, who will be placed in all the groups indicated in his password.
`firstname dot lastname` uid format is mandatory to help build givenname, lastname and cn attributes.

```bash
nvm use --lts
npm install -g typescript
npm install -g ts-node
```

```bash
npm init -y
tsc --init
```

```bash
make build
docker save demonstrateur:1| microk8s ctr image import -
kubectl -n llng apply -f demonstrateur-deployment.yaml
```
