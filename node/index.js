import express from 'express'
import mysql from 'mysql'
import util from 'util'

import { DB_CONFIG } from './constants/dbconfig.js'
import { addPerson } from './actions/addPerson.js'
import { getAllPersons } from './actions/getAllPersons.js'

const app = express()
const port = process.env.APP_PORT || 3000

app.get('/', async (_req, res) => {
    const conn = mysql.createConnection(DB_CONFIG)
    const query = util.promisify(conn.query).bind(conn);
    
    try {
        await addPerson(query)
        const personsList = await getAllPersons(query)

        console.info('All persons: ', personsList.map(p => p.name).join(', '))
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ol>
                ${!!personsList.length ?
                    personsList.map(person => `<li>${person.name}</li>`).join('') :
                    'The persons list is currently empty.'
                }
            </ol>
        `)
    } catch (err) {
        console.error(err)
        res.status(500).send('it was not possible manage people at this time.');
    } finally {
        conn.end()
    }
})

app.listen(port, () => {
	console.log('running at port ' + port)
})