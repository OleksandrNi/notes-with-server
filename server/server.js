const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const postdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));


server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '200382';

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
};

function isLoginAuthenticated({email, password}) {
  const userdb1 = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  return (
    userdb1.users.find(
      (user) => user.email === email && user.password === password
      )?.id
  );
};

function isRegisterAuthenticated({email}) {
  const userdb2 = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  return userdb2.users.findIndex((user) => user.email === email) !== -1;
};



server.post("/api/auth/register", (req, res) => {
  const {email, password} = req.body;
  if (isRegisterAuthenticated({email})) {
    const status = 401;
    const message = "Email already exist";
    res.status(status).json({status, message});
    return;
  };

  fs.readFile("./users.json", (err, data) => {
    if(err) {
      const status = 401;
      const message = err;
      res.status(status).json({status, message})
      return;
    }
    data = JSON.parse(data.toString());

    let last_item_id = data.users[data.users.length - 1].id;

    data.users.push({id: last_item_id + 1, email: email, password: password});
    let writeData = fs.writeFile("./users.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({status, message})
          return; 
        }
      }
    );
  });

  const userId = JSON.parse(fs.readFileSync("./users.json", "utf-8")).users.length + 1;
  postdb.posts.push({"id": userId,"notes":[]});

  const access_token = createToken({email, password});
  res.status(200).json({ access_token, userId, email });
});

server.post("/api/auth/login", (req, res) =>{
  const {email, password} = req.body;
  const userId = isLoginAuthenticated({email, password});

  if (!isLoginAuthenticated({email, password})) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({status, message});
    return;
  }
  const access_token = createToken({email, password});
  res.status(200).json({ access_token, userId, email });
});

server.post("/posts", (req, res) =>{
  const {notes, userId} = req.body;
  let response =  postdb.posts.filter(post => post.id === userId).notes;

  const current = postdb.posts.findIndex(post => post.id === userId);
  if (current !== -1) {
    postdb.posts[current].notes = notes;
    response = postdb.posts[current].notes;
  } 

 
  fs.writeFileSync('./db.json', JSON.stringify(postdb));
  res.status(200).json({ response });
});

server.get("/posts/:id",function(req, res) {
  const userId = req.params.id;

  const response = postdb.posts[userId - 1].notes;
  res.status(200).json({ response });
});

server.listen(5000, () => {
  console.log("Running fake API json server");
});