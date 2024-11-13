require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
//const sql = require('mssql')

app.use(express.static('public'));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/googleapikey', (req, res) => {
  res.json({ key: process.env.googleapikey });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html
});

/**
const config = {
    server: 'pvsqld001', 
    database: 'sandbox',
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    },
  driver: 'msnodesqlv8'
};

sql.connect(config)
    .then(() => {
        console.log('SQL connection established successfully.');
    })
    .catch(err => {
        console.error('SQL connection error:', err);
    });

app.get('/here/:rate_id', async (req, res) => {
    const rateId = req.params.rate_id; // Extract rate_id from the URL
    try {
        const result = await sql.query`SELECT polyline1, polyline2, polyline3 FROM ref.tblIframeTest WHERE rate_id = ${rateId}`;
        if (result.recordset.length === 0) {
            return res.status(404).send('No data found for this rate_id');
        }
        res.json(result.recordset); // Send the data back as JSON
    } catch (error) {
        console.error('SQL error', error);
        res.status(500).send('Error retrieving data from the database');
    } finally {
        sql.close(); // Close the SQL connection after the request is complete
    }
});
*/

const listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});