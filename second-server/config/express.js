const cors = require('cors');
const whitelist = ['http://localhost:3000', 'https://user-list-demo-react.herokuapp.com/', 'http://localhost:5173'];

module.exports = (app, express) => {
  app.use(express.static('public'));
  //  app.use(cors({ origin: whitelist, credentials: true }));
  app.use(cors());

  app.use(express.json());

  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || 'An unknown error occurred!' });
  });
};
