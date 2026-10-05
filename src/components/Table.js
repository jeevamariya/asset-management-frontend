function Table({ columns, data, onEdit, onDelete }) {
  const showActions = onEdit || onDelete;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}

          {showActions && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key}>{item[column.key]}</td>
            ))}

            {showActions && (
              <td>
                {onEdit && (
                  <button onClick={() => onEdit(item)}>
                    Edit
                  </button>
                )}

                {onDelete && (
                  <button onClick={() => onDelete(item)}>
                    Delete
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;