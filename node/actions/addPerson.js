import { uniqueNamesGenerator, names } from 'unique-names-generator';

const config = {
    dictionaries: [names]
}

export const addPerson = async (query) => {
    const name = uniqueNamesGenerator(config)
    const sql = `INSERT INTO people (name) VALUES ('${name}')`

    console.info('Adding new person: ', name)
    return query(sql)
}