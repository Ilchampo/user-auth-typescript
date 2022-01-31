// Import express app and database connection
import app from './app';
import './database';

// Start express app
app.listen(app.get('port'), () => {
	console.log('Express app listening on port', app.get('port'));
});
