import axios from "axios";

const getNettruyen = () => axios.get('http://www.nettruyenpro.com/');
export default getNettruyen;
