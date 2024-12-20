import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
      console.log(`connected to database `)
    });
  } catch (err) {
    console.log(err);
  }
}



main();

process.on('unhandledRejection', (err) => {
  console.log(`unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
app.get('/',(req,res)=>{
  res.send('API IS WORKING')
})