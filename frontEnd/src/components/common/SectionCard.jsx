export default function SectionCard({ title, children }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-lg font-bold mb-4">
        {title}
      </h2>

      {children}
    </div>
  );
}