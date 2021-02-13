import app from '../src/app.ts';
import 'https://deno.land/x/dotenv/load.ts';

// Get the PORT from the environment variables and store in Opine.
const port = parseInt(Deno.env.get('PORT') ?? '3000');
app.set('port', port);

// Get the DENO_ENV from the environment variables and pass it to Opine.
const env = Deno.env.get('ENV') ?? 'development';
app.set('env', env);

// Start our Opine server on the provided or default port.
app.listen(port, () => {
    console.log('================Start server================');
    //console.clear();
    console.log(
        `%cListening on port ${port}, ${env}`,
        'background: #222; color: #bada55'
    );
    console.log(`%cServer open`, 'background-color: green;');
});
