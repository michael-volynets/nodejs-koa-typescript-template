import app from './app';
import environment from './config/environment';

const port = environment.port || 3000;
app.listen(port);

console.log('App is listening at ' + port)