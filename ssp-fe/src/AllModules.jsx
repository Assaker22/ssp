import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_MODULES = gql`
  query GetAllModules {
    findAllModules {
      id
      project
      resources
      tasks
      evidenceText
      mediaUrls
    }
  }
`;

function AllModules({ refresh }) {
  const { data, loading, error, refetch } = useQuery(GET_ALL_MODULES);

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh]);

  if (loading) return <div className="p-4">Loading modules...</div>;
  if (error)
    return <div className="p-4 text-red-600">Error loading modules.</div>;

  const modules = data?.findAllModules || [];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Modules</h1>

      {modules.length === 0 ? (
        <div className="text-gray-600">No modules found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="border border-gray-300 p-3 w-1/5 text-left">
                  Project
                </th>
                <th className="border border-gray-300 p-3 w-1/5 text-left">
                  Resources
                </th>
                <th className="border border-gray-300 p-3 w-1/5 text-left">
                  Tasks
                </th>
                <th className="border border-gray-300 p-3 w-1/5 text-left">
                  Evidence
                </th>
                <th className="border border-gray-300 p-3 w-1/5 text-left">
                  Media
                </th>
              </tr>
            </thead>
            <tbody>
              {modules.map((mod) => (
                <tr key={mod.id} className="text-sm text-gray-700">
                  <td className="border border-gray-300 p-3 align-top font-medium">
                    {mod.project}
                  </td>
                  <td className="border border-gray-300 p-3 align-top">
                    <ul className="list-disc pl-5">
                      {mod.resources.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 p-3 align-top">
                    <ul className="list-disc pl-5">
                      {mod.tasks.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 p-3 align-top">
                    {mod.evidenceText || "—"}
                  </td>
                  <td className="border border-gray-300 p-3 align-top text-blue-600">
                    {mod.mediaUrls?.length > 0 ? (
                      <ul className="list-disc pl-5 underline">
                        {mod.mediaUrls.map((url, idx) => (
                          <li key={idx}>
                            <a href={url} target="_blank" rel="noreferrer">
                              {url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllModules;
