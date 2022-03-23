import { App } from './src/config/server';

const PORT = '3000';

new App().server.listen(PORT, () => {
  console.log('Online');
});
