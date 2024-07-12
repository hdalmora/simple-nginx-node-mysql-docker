export const getAllPersons = async (query) => {
    const sql = `SELECT id, name FROM people`;

    return query(sql)
}