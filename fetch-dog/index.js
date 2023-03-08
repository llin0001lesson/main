
  var _urlAPI = '';
  var _response;
  
const _HTTP = require('http');
const _AXIOS = require('axios');
const _URL = require('url');
const _QS = require('querystring');

const server = _HTTP.createServer((req, res) => {
  const { pathname, query } = _URL.parse(req.url);
  const { name } = _QS.parse(query);
  if (req.method === 'GET') {	
		_response = res;
		fetchData();
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

function fetchData() {
	var stringifiedData = '';
	_AXIOS.defaults.headers.common['Content-Type'] = 'application/json';
	_AXIOS.get('https://dog.ceo/api/breeds/image/random')
		  .then((value) => {
				stringifiedData = JSON.stringify(value.data);	
				console.log(stringifiedData);			
				_response.write(stringifiedData);
				_response.end();
		  })
		  .catch((error) => {
			console.error(error);
		  });
}
