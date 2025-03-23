const http = require('http');

var users = [
    { id: 1, name: "Abel", email: "abel@gmail.com" },
    { id: 2, name: "Bereket", email: "bereket@gmail.com" }
];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // GET /users - Return all users
    if (method === 'GET' && url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }

    // POST /users - Add a new user
    else if (method === 'POST' && url === '/users') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const newUser = JSON.parse(body);
            newUser.id = users.length + 1; // Simple ID assignment
            users.push(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });
    }

    // PUT /users/:id - Update a user's details
    else if (method === 'PUT' && url.startsWith('/users/')) {
        const id = parseInt(url.split('/')[2]);
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const userIndex = users.findIndex(user => user.id === id);

            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...updatedData };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users[userIndex]));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('User not found');
            }
        });
    }

    // DELETE /users/:id - Remove a user
    else if (method === 'DELETE' && url.startsWith('/users/')) {
        const id = parseInt(url.split('/')[2]);
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('User deleted');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('User not found');
        }
    }

    // unknown routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
