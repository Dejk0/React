function AddButton({ onAdd, children }) {
    return (
        <button onClick={onAdd}>{children}</button>
    );
}

export default AddButton;