import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

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

const DELETE_MODULE = gql`
  mutation DeleteModule($id: ID!) {
    deleteModule(id: $id) {
      id
      project
    }
  }
`;

function AllModules({ refresh, setRefresh, setOpenCreate }) {
  const { data, loading, error, refetch } = useQuery(GET_ALL_MODULES);
  const [deleteModule] = useMutation(DELETE_MODULE);

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh, refetch]);

  if (loading) {
    return <div className="p-4 text-gray-700">Loading modules...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error loading modules.</div>;
  }

  const modules = data?.findAllModules || [];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-row items-start justify-between">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Modules </h1>
        <button
          onClick={() => {
            setOpenCreate(true);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          New module
        </button>
      </div>
      {modules.length === 0 ? (
        <div className="text-gray-600">No modules found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-row items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {mod.project}
                </h2>
                <button
                  onClick={async () => {
                    try {
                      await deleteModule({ variables: { id: mod.id } });
                      setRefresh(Math.random());
                    } catch (err) {
                      console.error("Delete didn't happen: ", err);
                    }
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>

              <div className="mb-4">
                <span className="font-medium text-gray-700">Resources:</span>
                {mod.resources?.length ? (
                  <ul className="list-disc ml-5 mt-1 text-gray-600">
                    {mod.resources.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">—</p>
                )}
              </div>

              <div className="mb-4">
                <span className="font-medium text-gray-700">Tasks:</span>
                {mod.tasks?.length ? (
                  <ul className="list-disc ml-5 mt-1 text-gray-600">
                    {mod.tasks.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">—</p>
                )}
              </div>

              <div className="mb-4">
                <span className="font-medium text-gray-700">Evidence:</span>
                <p className="mt-1 text-gray-600">{mod.evidenceText || "—"}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Media:</span>
                {mod.mediaUrls?.length > 0 ? (
                  <ul className="list-disc ml-5 mt-1 text-blue-600 underline">
                    {mod.mediaUrls.map((url, idx) => (
                      <li key={idx}>
                        <a href={url} target="_blank" rel="noreferrer">
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">—</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllModules;
