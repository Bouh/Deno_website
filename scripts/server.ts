import 'https://deno.land/x/dotenv/load.ts';
import { HOTRELOAD_ENABLED, ENV, PORT } from '../src/deps.ts';
import { webSocketServerHotReload } from '../scripts/hotReload.ts';
import app from '../src/app.ts';

// Get the PORT from the environment variables and store in Opine.

app.set('port', PORT);

// Get the DENO_ENV from the environment variables and pass it to Opine.
app.set('env', ENV);

// Start our Opine server on the provided or default port.
app.listen(PORT, () => {
    console.log('================Start server================');
    console.log(
        `%cListening on port ${PORT}, ${ENV}`,
        'background: #222; color: #bada55'
    );
    console.log(`%cServer open`, 'background-color: green;');
});

/*
  If not in development ENV server don't use hot reload.
  If in development and hot reload enabled use it, otherwise don't use hot reload
*/
initEnvironment();

function initEnvironment() {
    ENV !== 'development'
        ? webSocketServerHotReload(false)
        : HOTRELOAD_ENABLED
        ? webSocketServerHotReload(true)
        : webSocketServerHotReload(false);
}
