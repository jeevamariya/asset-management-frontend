import { useEffect, useState } from "react";

import Table from "../components/Table";
import Form from "../components/Form";

import api from "../api/api";

function Assignments() {
  const isAdmin =
    localStorage.getItem("is_staff") === "true";

  const [assignments, setAssignments] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] =
    useState(null);

  const [error, setError] = useState("");

  const columns = [
    { key: "asset", label: "Asset ID" },
    { key: "employee", label: "Employee ID" },
    { key: "date_assigned", label: "Date Assigned" },
    { key: "date_returned", label: "Date Returned" },
  ];

 const fetchAssignments = async (page) => {
  try {
    const response = await api.get(
      `/assignments/?page=${page}`
    );

    setAssignments(response.data.results);
    setNextPage(response.data.next);
    setPreviousPage(response.data.previous);
    setError("");
  } catch (error) {
    setError("Unable to load assignments.");
  }
};

  const fetchAssets = async () => {
    try {
      const response = await api.get(
        "/assets/?page_size=100"
      );

      setAssets(response.data.results);
    } catch (error) {
      setError("Unable to load assets.");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/users/");

      setEmployees(response.data);
    } catch (error) {
      setError("Unable to load employees.");
    }
  };

  useEffect(() => {
    fetchAssignments(currentPage);
    fetchAssets();
    fetchEmployees();
  }, [currentPage]);

  const fields = [
    {
      name: "asset",
      label: "Asset",
      type: "select",
      options: assets.map((asset) => ({
        value: asset.id,
        label: `${asset.name} - ${asset.serial_number}`,
      })),
    },
    {
      name: "employee",
      label: "Employee",
      type: "select",
      options: employees.map((employee) => ({
        value: employee.id,
        label: employee.username,
      })),
    },
    {
      name: "date_assigned",
      label: "Date Assigned",
      type: "date",
    },
    {
      name: "date_returned",
      label: "Date Returned",
      type: "date",
      required: false
    },
  ];

  const handleAdd = () => {
    setEditingAssignment(null);
    setShowForm(true);
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      const assignmentData = {
        asset: Number(data.asset),
        employee: Number(data.employee),
        date_assigned: data.date_assigned,
        date_returned: data.date_returned || null,
      };

      if (editingAssignment) {
        const response = await api.put(
          `/assignments/${editingAssignment.id}/`,
          assignmentData
        );

        setAssignments((current) =>
          current.map((assignment) =>
            assignment.id === editingAssignment.id
              ? response.data
              : assignment
          )
        );
      } else {
        const response = await api.post(
          "/assignments/",
          assignmentData
        );

        setAssignments((current) => [
          ...current,
          response.data,
        ]);
      }

      setShowForm(false);
      setEditingAssignment(null);
      setError("");
    } catch (error) {
      setError("Unable to save assignment.");
    }
  };

  const handleDelete = async (assignment) => {
    try {
      await api.delete(
        `/assignments/${assignment.id}/`
      );

      setAssignments((current) =>
        current.filter(
          (item) => item.id !== assignment.id
        )
      );

      setError("");
    } catch (error) {
      setError("Unable to delete assignment.");
    }
  };

  return (
    <div>
      <h1>Assignments</h1>

      {error && <p>{error}</p>}

      {isAdmin && (
        <button onClick={handleAdd}>
          Create Assignment
        </button>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {editingAssignment
                ? "Edit Assignment"
                : "Create Assignment"}
            </h2>

            <Form
              fields={fields}
              onSubmit={handleSubmit}
              initialData={editingAssignment}
            />

            <button
              onClick={() => {
                setShowForm(false);
                setEditingAssignment(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Table
        columns={columns}
        data={assignments}
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

export default Assignments;