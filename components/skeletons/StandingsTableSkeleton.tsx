// components/league/StandingsTableSkeleton.tsx
export default function StandingsTableSkeleton() {
  const skeletonRows = Array.from({ length: 8 });

  return (
    <div className="rounded-lg bg-[#1d222a] text-white animate-pulse">
      {/* Table */}
      <div className="p-6 pt-0 px-0 pb-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-cyan-700">
                <th className="h-12 px-4 text-center font-medium text-gray-400 w-10">
                  #
                </th>
                <th className="h-12 px-4 text-left font-medium text-gray-400">
                  Team
                </th>
                <th className="h-12 px-4 text-center font-medium text-gray-400 w-10">
                  P
                </th>
                <th className="h-12 px-4 text-center font-medium text-gray-400 w-10">
                  W
                </th>
                <th className="h-12 px-4 text-center font-medium text-gray-400 w-10">
                  D
                </th>
                <th className="h-12 px-4 text-center font-medium text-gray-400 w-10">
                  L
                </th>
                <th className="h-12 px-4 text-center font-medium text-gray-400 w-10">
                  GD
                </th>
                <th className="h-12 px-4 text-center font-medium text-gray-400 w-12">
                  Pts
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr:last-child]:border-0">
              {skeletonRows.map((_, idx) => (
                <tr key={idx} className="border-b border-cyan-700">
                  <td className="p-4 w-10 text-center">
                    <div className="h-4 w-4 bg-gray-600 rounded-full mx-auto" />
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    <div className="h-6 w-6 bg-gray-600 rounded-full" />
                    <div className="h-4 w-24 bg-gray-600 rounded" />
                  </td>
                  <td className="p-4 w-10 text-center">
                    <div className="h-4 w-6 bg-gray-600 rounded mx-auto" />
                  </td>
                  <td className="p-4 w-10 text-center">
                    <div className="h-4 w-6 bg-gray-600 rounded mx-auto" />
                  </td>
                  <td className="p-4 w-10 text-center">
                    <div className="h-4 w-6 bg-gray-600 rounded mx-auto" />
                  </td>
                  <td className="p-4 w-10 text-center">
                    <div className="h-4 w-6 bg-gray-600 rounded mx-auto" />
                  </td>
                  <td className="p-4 w-10 text-center">
                    <div className="h-4 w-6 bg-gray-600 rounded mx-auto" />
                  </td>
                  <td className="p-4 w-12 text-center">
                    <div className="h-4 w-6 bg-gray-600 rounded mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
