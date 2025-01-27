const express = require("express");
const app = express();
const path = require("path");


const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("L'application web est accessible uniquement du lundi au vendredi entre 9h et 17h.");
  }
};

app.all("/style",(req,res)=>{
  res.sendFile(__dirname+"/views/style.css")
})

app.use(workingHoursMiddleware);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Accueil" });
});

app.get("/services", (req, res) => {
  res.render("services", { pageTitle: "Nos services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { pageTitle: "Nous contacter" });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
