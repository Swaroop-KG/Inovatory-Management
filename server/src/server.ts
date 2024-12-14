import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(config.database_url as string);
    console.log('Connected to the database.');

    // For local development, start a traditional server
    if (process.env.NODE_ENV !== 'production') {
      app.listen(config.port, () => {
        console.log(`App is listening on port ${config.port}`);
      });
    }
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
}

// Call the main function to initialize the server
main();

// Export the app for serverless deployment
export default app;
