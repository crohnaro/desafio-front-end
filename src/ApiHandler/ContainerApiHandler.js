import axios from 'axios'



const getAll = () => {
  return axios.get('http://localhost:8080/api/v1/containers/get', {});
};

const saveRow = (row) => {
  return axios.patch('http://localhost:8080/api/v1/containers/add', row);
};

const deleteRow = (rowId) => {
  return axios.delete(`http://localhost:8080/api/v1/containers/delete/${rowId}`);
};

export default {
  getAll,
  saveRow,
  deleteRow
};
