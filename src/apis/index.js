import axios from "axios";

const getListHistory = () => axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1');
export default getListHistory;