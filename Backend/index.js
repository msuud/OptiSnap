const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const userRoutes = require('./routes/user.routes')
const picRoutes = require('./routes/pics.routes')

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

app.use(userRoutes)
app.use('/pic',picRoutes)
run();