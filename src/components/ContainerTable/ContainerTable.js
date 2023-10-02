import * as React from "react";
import FullEditDataGrid from "mui-datagrid-full-edit";
import { useEffect, useState } from "react";
import sellerController from "../../ApiHandler/ContainerApiHandler";
import { Box } from "@mui/material";

export default function SellerManageGrid() {
  const [rows, setRawRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const setRows = (rows) => {
    return setRawRows([...rows.map((r, i) => ({ ...r, no: i + 1 }))]);
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
    headerName: "Id",
    width: 50,
    hide: true,
    align: "center",
    type: "number",
  },
  {
    field: "cliente",
    headerName: "Cliente",
    width: 100,
    headerAlign: "center",
    type: "string",
    align: "center",
    editable: true
  },
  {
    field: "numero",
    headerName: "Numero do Container",
    width: 150,
    headerAlign: "center",
    type: "string",
    align: "center",
    editable: true
  },
  {
    field: "tipo",
    headerName: "Tipo",
    width: 50,
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ['20', '40'],
    editable: true
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    headerAlign: "center",
    type: "singleSelect",
    valueOptions: ['Cheio', 'Vazio' ],
    editable: true,
    align: "center",
    
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
    
  }
];