import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "../components/Table";
import Form from "../components/Form";

import {
  addTicket,
  fetchTickets,
  updateTicket,
  deleteTicket,
} from "../store/ticketsSlice";

function Tickets() {
  const isAdmin = localStorage.getItem("is_staff") === "true";
  const tickets = useSelector(
  (state) => state.tickets.items
  );

  const nextPage = useSelector(
    (state) => state.tickets.next
  );

  const previousPage = useSelector(
    (state) => state.tickets.previous
  );
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    dispatch(fetchTickets(currentPage));
  }, [dispatch, currentPage]);

  const columns = [
    { key: "asset", label: "Asset ID" },
    { key: "issue", label: "Issue" },
    { key: "status", label: "Status" },
    {
      key: "assigned_technician",
      label: "Technician ID",
    },
  ];

  const fields = [
    {
      name: "asset",
      label: "Asset ID",
      type: "number",
      placeholder: "Enter asset ID",
    },
    {
      name: "issue",
      label: "Issue",
      type: "text",
      placeholder: "Describe the issue",
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      placeholder: "Enter status",
    },
    {
      name: "assigned_technician",
      label: "Technician User ID",
      type: "number",
      placeholder: "Enter technician user ID",
    },
  ];

  const handleAdd = () => {
    setEditingTicket(null);
    setShowForm(true);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  const handleSubmit = (data) => {
    const ticketData = {
      asset: Number(data.asset),
      issue: data.issue,
      status: data.status,
      assigned_technician: data.assigned_technician
        ? Number(data.assigned_technician)
        : null,
    };

    if (editingTicket) {
      dispatch(
        updateTicket({
          id: editingTicket.id,
          ...ticketData,
        })
      );
    } else {
      dispatch(addTicket(ticketData));
    }

    setShowForm(false);
    setEditingTicket(null);
  };

  const handleDelete = (ticket) => {
    dispatch(deleteTicket(ticket.id));
  };

  return (
    <div>
      <h1>Tickets</h1>

      {isAdmin && (
        <button onClick={handleAdd}>
          Create Ticket
        </button>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {editingTicket
                ? "Edit Ticket"
                : "Create Ticket"}
            </h2>

            <Form
              fields={fields}
              onSubmit={handleSubmit}
              initialData={editingTicket}
            />

            <button
              onClick={() => {
                setShowForm(false);
                setEditingTicket(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Table
        columns={columns}
        data={tickets}
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

export default Tickets;