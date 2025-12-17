// src/components/admin/tables/TableHeader.jsx

const TableHeader = ({ headers }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((h, index) => (
          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;