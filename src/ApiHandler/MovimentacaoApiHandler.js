import axios from 'axios'

const getAll = () => {
  return axios.get('http://localhost:8080/api/v1/movimentacoes/get', {});
};

const saveRow = (row) => {
  return axios.patch('http://localhost:8080/api/v1/movimentacoes/add', row);
};

const deleteRow = (rowId) => {
  return axios.delete(`http://localhost:8080/api/v1/containers/movimentacoes/${rowId}`);
};

export default {
  getAll,
  saveRow,
  deleteRow
};
