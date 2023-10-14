
const express = require('express')
const app = express()
const session = require('express-session');


const users = [{
    id: 'user1', name: 'mk', password: 789
}];

app.use(express.urlencoded({ extended: false }))


// Middleware to set Cache-Control header to no-store, no-cache
app.post("/register", async (req, res) => {
    try {
        const password = await (req.body.password)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            password: password
        })
        console.log(users);
        res.redirect("/")
    } catch (err) {
        console.log(err);
        res.redirect("/register")

    }
})

app.post("/login", (req, res) => {
    const username = req.body.name;
    const password = req.body.password;

    // Check if user credentials match any in the in-memory user data
    const user = users.find((user) => user.name === username && user.password == password);

    if (user) {
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
});

app.set("view engine", "hbs")
app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/", (req, res) => {
    res.render("home")
})

app.get("/logout", (req, res) => {
    delete req.session.users;
    res.redirect("/login");
});

console.log(users);
app.listen(3000, () => console.log('server running in port 3000...'))


