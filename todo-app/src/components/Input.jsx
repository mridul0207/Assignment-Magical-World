const Input = ({ label, ...props }) => (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input className="border p-2 w-full rounded" {...props} />
    </div>
  );
  