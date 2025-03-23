const http=require('http');

const port= 8080;

const server= http.createServer((req,res) =>{

  if(req.url==="/hello" && req.method==="GET"){
    res.writeHead(200, { 'Content-Type': 'text/pain' });
    res.end('Hello world!');
  }
  else if(req.url==="/data" && req.method==="POST"){
    let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ received: JSON.parse(body) }));
        });
  }
  else{
    res.writeHead(404, { 'Content-Type': 'text/pain' });
    res.end('Not Found!');
  }
})

server.listen(port,() =>{
console.log(`The surver is running on the port ${port}`);
})
