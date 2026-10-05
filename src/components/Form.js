function Form({ fields, onSubmit, initialData }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>

          {field.type === "select" ? (
            <select
              name={field.name}
              defaultValue={initialData?.[field.name] || ""}
              required
            >
              <option value="">
                Select {field.label}
              </option>

              {field.options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              defaultValue={initialData?.[field.name] || ""}
              required={field.required !== false}
            />
          )}
        </div>
      ))}

      <button type="submit">Save</button>
    </form>
  );
}

export default Form;