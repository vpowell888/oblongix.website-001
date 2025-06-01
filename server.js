const express = require('express');
const app = express();
const path = require('path');

const appSettings = require('./config/appSettings.json');
const Solutions = require('./config/solutions.json');

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Welcome to Oblongix' });
});

app.get('/home', (req, res) => {
  res.render('home', { title: 'Welcome to Oblongix' });
});

app.get('/solutions', (req, res) => {
  res.render('solutions', {
      title: 'Solutions',
      lifecycleStages: appSettings.lifecycleStages,
      industries: appSettings.industries,
      solutionareas: appSettings.solutionareas,
      categories : appSettings.categories,
      solutions: Solutions.solutions
    });
});

app.get('/insights', (req, res) => {
  res.render('insights', { title: 'Insights' });
});

app.get('/alliances', (req, res) => {
  res.render('alliances', { title: 'Alliances' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/careers', (req, res) => {
  res.render('careers', { title: 'Careers' });
});

app.get('/privacy', (req, res) => {
  res.render('privacy', { title: 'Privacy' });
});

app.get('/profile', (req, res) => {
  res.render('profile', { title: 'Profile' });
});

app.get('/sub-idea', (req, res) => {
  res.render('sub-idea', { title: 'Ideas' });
});

app.get('/terms and cookies', (req, res) => {
  res.render('terms and cookies', { title: 'Terms and Cookies' });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
