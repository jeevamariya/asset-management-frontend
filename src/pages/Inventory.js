import { useEffect, useState } from "react";

import Table from "../components/Table";
import Form from "../components/Form";

import api from "../api/api";

function Inventory() {
  const isAdmin =
    localStorage.getItem("is_staff") === "true";

  const [inventoryItems, setInventoryItems] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const fields = [
    {
      name: "item_type",
      label: "Item Type",
      type: "text",
      placeholder: "Enter item type",
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Enter quantity",
    },
    {
      name: "threshold",
      label: "Threshold",
      type: "number",
      placeholder: "Enter threshold",
    },
  ];

  const columns = [
    { key: "id", label: "ID" },
    { key: "item_type", label: "Item Type" },
    { key: "quantity", label: "Quantity" },
    { key: "threshold", label: "Threshold" },
  ];

  const fetchInventory = async (page) => {
    try {
      const response = await api.get(
        `/inventory/?page=${page}`
      );

      setInventoryItems(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);

      setError("");
    } catch (error) {
      setError("Unable to load inventory.");
    }
  };

  useEffect(() => {
    fetchInventory(currentPage);
  }, [currentPage]);

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      const inventoryData = {
        item_type: data.item_type,
        quantity: Number(data.quantity),
        threshold: Number(data.threshold),
      };

      if (editingItem) {
        const response = await api.put(
          `/inventory/${editingItem.id}/`,
          inventoryData
        );

        setInventoryItems((current) =>
          current.map((item) =>
            item.id === editingItem.id
              ? response.data
              : item
          )
        );
      } else {
        const response = await api.post(
          "/inventory/",
          inventoryData
        );

        setInventoryItems((current) => [
          ...current,
          response.data,
        ]);
      }

      setShowForm(false);
      setEditingItem(null);
      setError("");
    } catch (error) {
      setError("Unable to save inventory item.");
    }
  };

  const handleDelete = async (item) => {
    try {
      await api.delete(`/inventory/${item.id}/`);

      setInventoryItems((current) =>
        current.filter(
          (inventory) => inventory.id !== item.id
        )
      );

      setError("");
    } catch (error) {
      setError("Unable to delete inventory item.");
    }
  };

  return (
    <div>
      <h1>Inventory</h1>

      {error && <p>{error}</p>}

      {isAdmin && (
        <button onClick={handleAdd}>
          Add Inventory Item
        </button>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {editingItem
                ? "Edit Inventory Item"
                : "Add Inventory Item"}
            </h2>

            <Form
              fields={fields}
              onSubmit={handleSubmit}
              initialData={editingItem}
            />

            <button
              onClick={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Table
        columns={columns}
        data={inventoryItems}
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

export default Inventory;