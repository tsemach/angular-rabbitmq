** Example of using sequelize with postgress and mongodb **

## Database Commands
* docker run -p 5432:5432 --name db -e POSTGRES_PASSWORD=postgres -d postgres:9.6.6-alpine

## Running migration tool
** this will create the directories ./models ./migrations and ./seeders **
** also files defining the data types will also generated.

node_modules/.bin/sequelize init
node_modules/.bin/sequelize  model:generate --name Session --attributes user:string,task:string,task_md5:uuid,event:string,event_md5:uuid
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all

```javascript
const Sequelize = require('sequelize');
const Session = sequelize.import('../../models/session');

// connect to the database
const sequelize = new Sequelize('loopback', 'postgres', 'postgres', {
    dialect: 'postgres',
});

const User = sequelize.import('../../models/user');

let user = User.build({name: "tsemach", age: 56})
let session = Session.build({name: "tsemach", task: "{}", task_md5: "705053ace1ec44e3c6bf5a72d7e5d644", event: "{}", event_md5: "705053ace1ec44e3c6bf5a72d7e5d644"})

user.save()
    .then(() => console.log("user tsemach:56 wrote to db"))
    .catch(what => console.log("ooops .. something bad happend - " + what));

session.save()
    .then(() => console.log("session wrote to db ok"))
    .catch(what => console.log("ooops .. something bad happend - " + what));
```

