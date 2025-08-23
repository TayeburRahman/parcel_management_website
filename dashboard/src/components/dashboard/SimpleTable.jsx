"use client";

const SimpleTable = ({ companies }) => {
  return (
      <table className="min-w-full text-sm">
        <thead className="text-gray-100 bg-primary sticky top-0 w-full">
          <tr className="*:font-normal *:px-4 *:py-2 ">
            <th>SI</th>
            <th>Company Name</th>
            <th>Plants</th>
            <th>Active Employees</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {companies.slice(0, 9).map((company, index) => (
            <tr
              key={index}
              className="hover:bg-primary/10 text-xs *:px-4 *:py-2 *:font-normal *:text-center *:border-b *:border-gray-200 transition-all duration-200 "
            >
              <td>{index + 1}</td>
              <td>{company?.companyName}</td>
              <td>{company?.plants}</td>
              <td>{company?.activeEmployees}</td>
              <td>{company?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default SimpleTable;
