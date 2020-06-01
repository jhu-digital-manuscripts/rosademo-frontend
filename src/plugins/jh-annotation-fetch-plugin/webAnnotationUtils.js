export function fetchAnnotationCollection(collectionId) {
  console.assert(
    !!collectionId,
    'webAnnotationUtils#fetchAnnotationCollection : parameter "collectionId" must be defined'
  );

  if (!collectionId) {
    return;
  }

  return fetch(collectionId, { method: 'GET' })
    .then(result => jsonify(result))
    .catch(error => console.log(`%c${collectionId} : ${error}`, 'color: red;'));
}

/**
 *
 * @param {string} url target URL for the annotation page
 * @returns {Promise} with the resulting JSON data pre-parsed
 */
export function fetchAnnotationPage(url) {
  return fetch(url, { method: 'GET' })
    .then((result) => jsonify(result))
    .catch((error) => console.log(`Error getting ${url}: ${error}`));
}

/**
 * Convert a fetch API Response to JSON data
 *
 * @param {Response} response a Response object from a 'fetch' call
 * @returns {Promise} resolves to the response as JSON data
 */
export function jsonify(response) {
  if (!response.ok) {
    return Promise.reject(`${response.status} : ${response.statusText}`);
  }

  return response.json();
}
