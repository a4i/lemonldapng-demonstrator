import express, { Router, Request, Response } from 'express';

const router = Router();

router.use(express.json());

router.get('/', (req: Request, res: Response) => {
    res.send("Points d'API pour LemonLDAP::NG");
});

router.post('/auth', (req: Request, res: Response) => {

    // req.body = {"user": "sylvain.amr", "password": "clusteradmins,timelords"};
    const user = req.body.user;
    let password = req.body.password;
    // if (!password) {
    //     password = "timelords; clusteradmins";
    // }
    if (!user || !password || password==="") {
        console.log("Received bad parameters: " + JSON.stringify(req.body))
        return res.status(400).send("bad parameters")
    }
    console.log(`Received auth request for ${user}`);

    const m = user?.match(/^([a-zA-Z][a-zA-Z0-9-_]+)\.([a-zA-Z][a-zA-Z0-9-_]+)$/);
    if (!m) {
        console.log("Login incorrect")
        return res.json({"result": false, "msg":"login incorrect"});
    }
    if (password.match(/['";]/)) {
        console.log("Wrong password format")
        return res.json({"result": false, "msg":"Wrong password format"});
    }
    const [uid, prenom, nom] = m.map(Function.prototype.call, String.prototype.toLowerCase);
    const agroups = password.replace(/\s+/g, "").split(/,/);
    const groups = agroups.join("; ");
    // let hGroups = {};
    // for (const g: any in agroups) {
    //     hGroups[g] = {"name": g};
    // }
    const hGroups = JSON.parse("{" + groups.split(/; /).map( (s: string) => `"${s}": {"name":"${s}"}`).join(", ") + "}");
    const givenname = prenom.charAt(0).toUpperCase() + prenom.slice(1);
    const lastname = nom.charAt(0).toUpperCase() + nom.slice(1);

    const result = {
        "result": true,
        "info": {
            uid,
            givenname,
            lastname,
            "cn": `${givenname} ${lastname}`,
            "mail": uid + "@a7e.app",
            groups,
            hGroups,
        }
    };
    console.log(`Auth sucessfull. Sending ${JSON.stringify(result)}`)
    return res.json(result);

});

export default router;
