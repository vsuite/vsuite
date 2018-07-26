const req = require.context('./components', true, /\.stories\.js$/);

req.keys().forEach(filename => req(filename));
