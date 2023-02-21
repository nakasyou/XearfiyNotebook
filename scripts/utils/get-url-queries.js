export default function getUrlQueries(){
  const queryStr = window.location.search.slice(1);
  const queries = {};
  if(!queryStr){
    return queries;
  }
  queryStr.split('&').forEach(function(queryStr) {
    let queryArr = queryStr.split('=');
    queries[queryArr[0]] = queryArr[1];
  });
  return queries;
}