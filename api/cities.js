const db = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        res.json(db.cities);
        return;
    }

    if (req.method === 'POST') {
        const newCity = {
            ...req.body,
            id: Math.random().toString(36).substr(2, 4) // Generate a random ID
        };
        db.cities.push(newCity);
        res.json(newCity);
        return;
    }

    if (req.method === 'DELETE') {
        const cityId = req.query.id;
        const index = db.cities.findIndex(city => city.id === cityId);
        if (index !== -1) {
            db.cities.splice(index, 1);
            res.status(200).json({ message: 'City deleted successfully' });
        } else {
            res.status(404).json({ message: 'City not found' });
        }
        return;
    }

    res.status(405).json({ message: 'Method not allowed' });
}; 