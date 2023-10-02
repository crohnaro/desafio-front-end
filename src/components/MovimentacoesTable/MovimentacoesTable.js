import * as React from "react";
import FullEditDataGrid from "mui-datagrid-full-edit";
import { useEffect, useState } from "react";
import sellerController from "../../ApiHandler/MovimentacaoApiHandler";
import { Box } from "@mui/material";

export default function SellerManageGrid() {
  const [rows, setRawRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const setRows = (data) => {
    const modifiedRows = data.map((item, i) => {
      const { id, dataHoraInicio, dataHoraFim, containerEntity, tipoMovimentacao } = item;
      const containerId = containerEntity ? containerEntity.id : ''
      const categoria = containerEntity ? containerEntity.categoria : ''
      const numero = containerEntity ? containerEntity.numero : ''
      const cliente = containerEntity ? containerEntity.cliente : ''

      return {
        id: id,
        containerId: containerId,
        categoria: categoria,
        cliente: cliente,
        numero: numero,
        tipoMovimentacao: tipoMovimentacao,
        dataHoraInicio: dataHoraInicio,
        dataHoraFim: dataHoraFim
      }
    })

    return setRawRows(modifiedRows)
    
  };
  useEffect(() => {
    setLoading(true);
    sellerController
      .getAll()
      .then((res) => {
        setRows(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
    sellerController
      .saveRow(updatedRow)
      .then((res) => {
        const dbRow = res.data;
        setRows(oldRows.map((r) => (r.id === updatedRow.id ? { ...dbRow } : r)));
      })
      .catch((err) => {
        setRows(oldRows);
      });
  };

  const onDeleteRow = (id, oldRow, oldRows) => {
    sellerController
      .deleteRow(id)
      .then((res) => {
        const dbRowId = res.data.id;
        setRows(oldRows.filter((r) => r.id !== dbRowId));
      })
      .catch((err) => {
        setRows(oldRows);
      });
  };

  const createRowData = (rows) => {
    const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
    const newNo = Math.max(...rows.map((r) => (r.no ? r.no : 0) * 1)) + 1;
    return { id: newId, no: newNo };
  };

  return (
    <Box sx={{ height: 500}}>
      <FullEditDataGrid
      columns={columns}
      rows={rows}
      onSaveRow={onSaveRow}
      onDeleteRow={onDeleteRow}
      createRowData={createRowData}
      loading={loading}
    />
    </Box>
    
  );
}

const columns = [
  {
    field: "id",
    headerName: "ID da Movimentação",
    width: 50,
    hide: true,
    align: "center",
    type: "number",
  },
  {
    field: "containerId",
    headerName: "ID do Container",
    width: 50,
    hide: true,
    align: "center",
    type: "number",
  },
  {
    field: "categoria",
    headerName: "Categoria",
    width: 150,
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ['Importação', 'Exportação'],
    editable: true,
    align: "center",
    
  },
  {
    field: "cliente",
    headerName: "Cliente",
    width: 150,
    hide: true,
    align: "center",
    type: "string",
  },
  {
    field: "numero",
    headerName: "Numero do Container",
    width: 150,
    hide: true,
    align: "center",
    type: "string",
  },
  {
    field: "tipoMovimentacao",
    headerName: "Tipo da Movimentação",
    width: 150,
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ['Embarque', 'Descarga', 'Gate In ', 'Gate Out', 'Reposicionamento', 'Pesagem', 'Scanner'],
    align: "center",
    editable: true
  },
  {
    field: "dataHoraInicio",
    headerName: "Data e Hora do Inicio",
    width: 150,
    headerAlign: "center",
    type: "dateTime",
    align: "center",
    valueFormatter: params => new Date(params?.value).toLocaleString(),
    editable: true
  },
  {
    field: "dataHoraFim",
    headerName: "Data e Hora do Fim",
    width: 150,
    headerAlign: "center",
    type: "dateTime",
    valueFormatter: params => new Date(params?.value).toLocaleString(),
    align: "center",
    editable: true
  },
  
];