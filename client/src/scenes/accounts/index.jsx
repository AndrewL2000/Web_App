import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import {
    DataGrid,
    GridRowModes,
    GridToolbarContainer,
    GridActionsCellItem,
} from "@mui/x-data-grid";
import { useGetAccountsQuery, useMutateAccountsMutation } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import PropTypes from "prop-types";
import {
    AddOutlined,
    EditOutlined,
    DeleteOutlined,
    SaveOutlined,
    CancelOutlined,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

function EditToolbar(props) {
    const { rows, setRows, setRowModesModel } = props;
    const [accountsMutation, ...rest] = useMutateAccountsMutation();
    const handleClick = () => {
        const id = rows[rows.length - 1].id + 1;
        const data = {
            id: id,
            account: "",
            type: "",
            currentValue: 0,
            initialInvestment: 0,
            PL: 0,
            isNew: true,
        };
        setRows((oldRows) => [...oldRows, data]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "account" },
        }));
        accountsMutation({
            id: null,
            data: data,
            method: "POST",
        });
    };

    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                startIcon={<AddOutlined />}
                onClick={handleClick}
            >
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

const Accounts = () => {
    const theme = useTheme();

    const [sort, setSort] = useState([]);
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } = useGetAccountsQuery({
        sort: JSON.stringify(sort),
        search: search,
    });

    const [rows, setRows] = useState(data);
    useEffect(() => {
        setRows(data);
    }, [data]);

    const [rowModesModel, setRowModesModel] = useState({});

    const [accountsMutation, ...rest] = useMutateAccountsMutation();

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        accountsMutation({
            id: id,
            data: "",
            method: "DELETE",
        });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        // Checks for duplicate fields {"account"}
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row.account === newRow.account && row.id !== newRow.id) {
                setRows(rows);
                return row;
            }
        }
        // Updates the row
        let updatedRow = { ...newRow, isNew: false };
        updatedRow.PL = updatedRow.currentValue - updatedRow.initialInvestment;
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        accountsMutation({
            id: updatedRow.id,
            data: updatedRow,
            method: "PUT",
        });
        return updatedRow;
    };
    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "account",
            headerName: "Account",
            flex: 1,
            editable: true,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            editable: true,
        },
        {
            field: "currentValue",
            headerName: "Current Value",
            flex: 1,
            editable: true,
            renderCell: (params) =>
                params.value ? `$${Number(params.value).toFixed(2)}` : null,
            type: "number",
        },
        {
            field: "initialInvestment",
            headerName: "Initial Investment",
            flex: 1,
            renderCell: (params) =>
                params.value ? `$${Number(params.value).toFixed(2)}` : null,
            editable: true,
            type: "number",
        },
        {
            field: "PL",
            headerName: "Profit/Loss",
            flex: 1,
            renderCell: (params) =>
                params.value ? `$${Number(params.value).toFixed(2)}` : null,
            editable: false,
            type: "number",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveOutlined />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelOutlined />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditOutlined />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteOutlined />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Accounts" subtitle="Changes will affect database" />
            <Box
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !rows}
                    rows={rows || []}
                    columns={columns}
                    rowCount={(rows && rows.length) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    paginationMode="server"
                    sortingMode="server"
                    onSortModelChange={(newSortModel) =>
                        setSort(...newSortModel)
                    }
                    components={{ Toolbar: EditToolbar }}
                    componentsProps={{
                        toolbar: {
                            rows,
                            setRows,
                            setRowModesModel,
                        },
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={(newModel) =>
                        setRowModesModel(newModel)
                    }
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                />
            </Box>
        </Box>
    );
};

export default Accounts;
