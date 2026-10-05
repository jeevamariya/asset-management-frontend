import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "../components/Table";
import Form from "../components/Form";

import { addAsset, updateAsset, deleteAsset, fetchAssets } from "../store/assetsSlice";

function Assets() {
  const isAdmin = localStorage.getItem("is_staff") === "true";
  const assets = useSelector((state) => state.assets.items);
  const nextPage = useSelector((state) => state.assets.next);
  const previousPage = useSelector((state) => state.assets.previous);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(
    fetchAssets({
      page: currentPage,
      search,
      status: statusFilter,
      type: typeFilter,
    })
  );
}, [
  dispatch,
  currentPage,
  search,
  statusFilter,
  typeFilter,
]);

  const [showModal, setShowModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const columns = [
    { key: "id", lable: "ID"},
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "serial_number", label: "Serial Number" },
    { key: "status", label: "Status" },
  ];

  const fields = [
    {
      name: "name",
      label: "Asset Name",
      type: "text",
      placeholder: "Enter asset name",
    },
    {
      name: "type",
      label: "Asset Type",
      type: "text",
      placeholder: "Enter asset type",
    },
    {
      name: "serial_number",
      label: "Serial Number",
      type: "text",
      placeholder: "Enter serial number",
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      placeholder: "Enter status",
    },
    {
      name: "purchase_date",
      label: "Purchase Date",
      type: "date",
    },
  ];

  const handleAdd = () => {
    setEditingAsset(null);
    setShowModal(true);
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setShowModal(true);
  };

  const handleSubmit = (data) => {
    if (editingAsset) {
      dispatch(
        updateAsset({
          id: editingAsset.id,
          ...data,
        })
      );
    } else {
      dispatch(
        addAsset({
          id: Date.now(),
          ...data,
        })
      );
    }

    setShowModal(false);
    setEditingAsset(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingAsset(null);
  };

  const handleDelete = (asset) => {
    dispatch(deleteAsset(asset.id));
  };

  return (
    <div>
      <h1>Assets</h1>

      {isAdmin && (
        <button onClick={handleAdd}>Add Asset</button>
      )}

      {showModal && (
        <div className="modal">
            <div className="modal-content">
            <h2>
                {editingAsset ? "Edit Asset" : "Add Asset"}
            </h2>

            <Form
                fields={fields}
                onSubmit={handleSubmit}
                initialData={editingAsset}
            />

            <button onClick={handleCancel}>
                Cancel
            </button>
          </div>
        </div>
      )}

      <div className="asset-filters">
      <input
        type="text"
        placeholder="Search assets..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setCurrentPage(1);
        }}
      />

      <select
        value={statusFilter}
        onChange={(event) => {
          setStatusFilter(event.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="">All Statuses</option>
        <option value="Available">Available</option>
        <option value="Assigned">Assigned</option>
        <option value="Repair">Repair</option>
      </select>

      <select
        value={typeFilter}
        onChange={(event) => {
          setTypeFilter(event.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="">All Types</option>
        <option value="Laptop">Laptop</option>
        <option value="Monitor">Monitor</option>
        <option value="Printer">Printer</option>
        <option value="Keyboard">Keyboard</option>
      </select>
    </div>

      <Table
        columns={columns}
        data={assets}
        onEdit={isAdmin ? handleEdit : undefined}
        onDelete={isAdmin ? handleDelete : undefined}
      />
      <div className="pagination">
      <button
        onClick={() =>
          setCurrentPage((page) => page - 1)
        }
        disabled={!previousPage}
      >
        Previous
      </button>

      <span>
        {" "} Page {currentPage} {" "}
      </span>

      <button
        onClick={() =>
          setCurrentPage((page) => page + 1)
        }
        disabled={!nextPage}
      >
        Next
      </button>
    </div>
    </div>
  );
}

export default Assets;