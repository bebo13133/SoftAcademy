const userRouter = require('./user.js');
const quoteRouter = require('./quote.js')

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/quote', quoteRouter)
};
