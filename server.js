const express = require('express');
const app = express();
const path = require('path');

const appSettings = require('./config/appSettings.json');
const Solutions = require('./config/solutions.json');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(appSettings.database);


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/submit-idea', (req, res) => {
  res.render('submit-idea', {
      title: 'submit-idea',
      industries: appSettings.industries,
      solutionareas: appSettings.solutionareas,
      categories : appSettings.categories,
      });
});

app.get('/solutions/:id', (req, res) => {
  const solutionId = req.params.id;
  const solution = solutionDetails.find(item => item.id === solutionId);

  if (!solution) {
    return res.status(404).send('Solution not found');
  }

  res.render('solution-detail', { solution });
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

app.get('/terms and cookies', (req, res) => {
  res.render('terms and cookies', { title: 'Terms and Cookies' });
});

app.get('/diagnostic_pages', (req, res) => {
  const link = req.query.link;
  res.render('diagnostic_pages', { diagnosticLink: link });
});

app.get('/ideas', (req, res) => {
  const query = `SELECT * FROM ideas WHERE lifecycle_stage = 'Ideas'`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Database error');
    }

    res.render('ideas', { title: 'Idea Stage Products', ideas: rows });
  });
});


app.post('/submit-idea', express.json(), (req, res) => {
  const {
    ideaTitle,
    ideaDescription,
    ideaBenefit,
    ideaAlliances,
    industryFilter,
    otherIndustry,
    solutionFilter,
    otherSolution,
    categoryFilter,
    lifecycleStage,
    consultingSkills
  } = req.body;

  const industry = industryFilter === 'Other' ? otherIndustry : industryFilter;
  const solutionArea = solutionFilter === 'Other' ? otherSolution : solutionFilter;
  const skillsCSV = consultingSkills.join(', ');

  const now = new Date();
  const create_date = now.toISOString().split('T')[0];           // yyyy-mm-dd
  const create_time = now.toTimeString().split(' ')[0];           // hh:mm:ss

  const status = 'Submitted';
  const action = 'None';
  const created_by = 'Anonymous'; 

  console.log('Submitting idea:', {
  title: ideaTitle,
  description: ideaDescription,
  benefit: ideaBenefit,
  alliances: ideaAlliances,
  industry,
  solutionArea,
  category: categoryFilter,
  lifecycleStage,
  consultingSkills: skillsCSV,
  status,
  action,
  created_by,
  create_date,
  create_time
});

  db.run(`
    INSERT INTO ideas (
      title, description, benefit, alliances,
      industry, solution_area, category, lifecycle_stage,
      consulting_skills, status, action, created_by,
      create_date, create_time
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  [
    ideaTitle, ideaDescription, ideaBenefit, ideaAlliances,
    industry, solutionArea, categoryFilter, lifecycleStage,
    skillsCSV, status, action, created_by,
    create_date, create_time
  ],
  function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    console.log('✔️ Inserted idea with ID:', this.lastID);
    res.status(200).json({ success: true, id: this.lastID });
  });
});

app.get('/admin', (req, res) => {
  const fetchTable = (tableName) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  Promise.all([
    fetchTable('lifecycle_stages'),
    fetchTable('industries'),
    fetchTable('solution_areas'),
    fetchTable('categories')
  ])
  .then(([lifecycleStages, industries, solutionAreas, categories]) => {
    res.render('admin', {
      title: 'Admin',
      lifecycleStages,
      industries,
      solutionAreas,
      categories
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Database error');
  });
});

app.post('/admin/reset-tables', (req, res) => {
  const { lifecycleStages, industries, solutionareas, categories } = appSettings;

  db.serialize(() => {
    // Drop tables if they exist
    db.run("DROP TABLE IF EXISTS lifecycle_stages");
    db.run("DROP TABLE IF EXISTS industries");
    db.run("DROP TABLE IF EXISTS solution_areas");
    db.run("DROP TABLE IF EXISTS categories");

    // Create tables
    db.run("CREATE TABLE lifecycle_stages (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT NOT NULL, label TEXT NOT NULL)");
    db.run("CREATE TABLE industries (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT NOT NULL, label TEXT NOT NULL)");
    db.run("CREATE TABLE solution_areas (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT NOT NULL, label TEXT NOT NULL)");
    db.run("CREATE TABLE categories (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT NOT NULL, label TEXT NOT NULL)");
    
    // Insert data
    const insert = (table, data) => {
      const stmt = db.prepare(`INSERT INTO ${table} (value, label) VALUES (?, ?)`);
      data.forEach(item => stmt.run(item.value, item.label));
      stmt.finalize();
    };

    insert('lifecycle_stages', lifecycleStages);
    insert('industries', industries);
    insert('solution_areas', solutionareas);
    insert('categories', categories);
  });

  res.send('Tables reset and populated successfully.');
});

app.post('/admin/reset-ideas', (req, res) => {
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS ideas");
    db.run(`
      CREATE TABLE ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        benefit TEXT,
        alliances TEXT,
        industry TEXT,
        solution_area TEXT,
        category TEXT,
        lifecycle_stage TEXT,
        consulting_skills TEXT,
        status TEXT,
        action TEXT,
        created_by TEXT,
        create_date TEXT,
        create_time TEXT
      )
    `, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to reset ideas table");
      }
      res.send("Ideas table has been reset with extended fields.");
    });
  });
});

app.post('/admin/reset-user-tables', (req, res) => {
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS contacts");
    db.run("DROP TABLE IF EXISTS logins");
    db.run("DROP TABLE IF EXISTS profiles");
    db.run("DROP TABLE IF EXISTS signups");

    db.run(`CREATE TABLE contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      message TEXT,
      timestamp TEXT
    )`);

    db.run(`CREATE TABLE logins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      password TEXT,
      timestamp TEXT
    )`);

    db.run(`CREATE TABLE profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      surname TEXT,
      company TEXT,
      email TEXT,
      phone TEXT,
      timestamp TEXT
    )`);

    db.run(`CREATE TABLE signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      surname TEXT,
      company TEXT,
      email TEXT,
      phone TEXT,
      timestamp TEXT
    )`);

    res.send('User-related tables reset successfully.');
  });
});

app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;
  const timestamp = new Date().toISOString();
  db.run(`INSERT INTO contacts (name, email, message, timestamp) VALUES (?, ?, ?, ?)`,
    [name, email, message, timestamp], function(err) {
      if (err) return res.status(500).send("Error saving contact");
      res.sendStatus(200);
    });
});

app.post('/submit-login', (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();
  db.run(`INSERT INTO logins (email, password, timestamp) VALUES (?, ?, ?)`,
    [email, password, timestamp], function(err) {
      if (err) return res.status(500).send("Error saving login");
      res.sendStatus(200);
    });
});

app.post('/submit-profile', (req, res) => {
  const { firstName, surname, company, email, phone } = req.body;
  const timestamp = new Date().toISOString();
  db.run(`INSERT INTO profiles (firstName, surname, company, email, phone, timestamp) VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, surname, company, email, phone, timestamp], function(err) {
      if (err) return res.status(500).send("Error saving profile");
      res.sendStatus(200);
    });
});

app.post('/submit-signup', (req, res) => {
  const { firstName, surname, company, email, phone } = req.body;
  const timestamp = new Date().toISOString();
  db.run(`INSERT INTO signups (firstName, surname, company, email, phone, timestamp) VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, surname, company, email, phone, timestamp], function(err) {
      if (err) return res.status(500).send("Error saving signup");
      res.sendStatus(200);
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
