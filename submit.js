const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET, // Environment variable for your secret
});

exports.handler = async (event) => {
    const data = JSON.parse(event.body);

    try {
        const response = await client.query(
            q.Create(
                q.Collection('users'), // Replace 'users' with your collection name
                { data }
            )
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "User data stored", id: response.ref.id }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error storing data", details: error.message }),
        };
    }
};
