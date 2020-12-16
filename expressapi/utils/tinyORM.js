function findQuery(table, config = {}) {
  let query = '';
  if (!config.include) {
    query += `SELECT * FROM ${table};`;
  } else {
    const fields = config.include.join(', ');
    query += `SELECT ${fields} FROM ${table}`;
  }

  if (config.where) {
    query += `${query} WHERE ${config.where}`;
  }

  return query;
}

// findQuery('users', {
//   include: ['id', 'name', 'email'],
//   where: 'id = 1, name = "Prashant"',
// });
