/** These lines define the token and url for the remote storage. */
const STORAGE_TOKEN = 'K9SFYBX0R1WD1NS9ZKIOB4W1CL157WB4C579A62K';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/** This function is used to save items in the remote storage. */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/** This function is used to load items from the remote storage */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}