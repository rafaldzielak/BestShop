// const paginateResults = async (model, query, sort, populate) => {
const paginateResults = async (query) => {
  const page = 1;
  const limit = 20;
  const startIndex = page * limit - limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const results = await query();

  const pagination = {};

  if (endIndex < total) pagination.next = { page: page + 1, limit };
  if (startIndex > 0) pagination.prev = { page: page - 1, limit };
  results.pagination = pagination;
  return results;
};

export default paginateResults;
