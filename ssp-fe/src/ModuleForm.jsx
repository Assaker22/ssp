import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_MODULE = gql`
  mutation CreateModule(
    $project: String!
    $resources: [String!]!
    $tasks: [String!]!
    $evidenceText: String
    $mediaUrls: [String!]
  ) {
    createModule(
      project: $project
      resources: $resources
      tasks: $tasks
      evidenceText: $evidenceText
      mediaUrls: $mediaUrls
    ) {
      id
      project
    }
  }
`;

function ModuleForm({ setRefresh, openCreate, setOpenCreate }) {
  const [project, setProject] = useState("");
  const [resources, setResources] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [evidenceText, setEvidenceText] = useState("");
  const [mediaUrls, setMediaUrls] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [createModule, { loading }] = useMutation(CREATE_MODULE);

  const handleResourceChange = (value, index) => {
    const newResources = [...resources];
    newResources[index] = value;
    setResources(newResources);
  };

  const addResource = () => {
    setResources([...resources, ""]);
  };

  const removeResource = (index) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  const handleTaskChange = (value, index) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const addTask = () => {
    setTasks([...tasks, ""]);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleAddMediaUrl = () => {
    setMediaUrls([...mediaUrls, ""]);
  };

  const handleMediaUrlChange = (value, index) => {
    const newMediaUrls = [...mediaUrls];
    newMediaUrls[index] = value;
    setMediaUrls(newMediaUrls);
  };

  const removeMediaUrl = (index) => {
    const newMediaUrls = mediaUrls.filter((_, i) => i !== index);
    setMediaUrls(newMediaUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!project.trim()) {
      setErrorMessage("Project field is required.");
      return;
    }

    try {
      const { data } = await createModule({
        variables: {
          project,
          resources,
          tasks,
          evidenceText,
          mediaUrls,
        },
      });

      if (data?.createModule?.id) {
        setSuccessMessage("Module created successfully!");
        setProject("");
        setResources([]);
        setTasks([]);
        setEvidenceText("");
        setMediaUrls([]);
        setRefresh(Math.random());
        setOpenCreate(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error creating module.");
    }
  };

  useEffect(() => {
    if (openCreate) {
      setSuccessMessage("");
      setProject("");
      setResources([]);
      setTasks([]);
      setEvidenceText("");
      setMediaUrls([]);
    }
  }, [openCreate]);

  if (openCreate)
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.15)] flex items-center justify-center">
        <div className="min-w-xl mx-auto p-4 bg-white shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Create Module</h1>

          {successMessage && (
            <div className="mb-4 text-green-600">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="mb-4 text-red-600">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Project</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Project name or description"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Resources</label>
              {resources.map((res, idx) => (
                <div key={idx} className="flex mb-2">
                  <input
                    type="text"
                    value={res}
                    onChange={(e) => handleResourceChange(e.target.value, idx)}
                    className="flex-1 border border-gray-300 rounded p-2 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeResource(idx)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addResource}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Add Resource
              </button>
            </div>

            <div>
              <label className="block mb-1 font-medium">Tasks</label>
              {tasks.map((task, idx) => (
                <div key={idx} className="flex mb-2">
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => handleTaskChange(e.target.value, idx)}
                    className="flex-1 border border-gray-300 rounded p-2 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeTask(idx)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTask}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Add Task
              </button>
            </div>

            <div>
              <label className="block mb-1 font-medium">Evidence</label>
              <textarea
                className="w-full border border-gray-300 rounded p-2"
                value={evidenceText}
                onChange={(e) => setEvidenceText(e.target.value)}
                placeholder="Evidence description or notes"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Media URLs (Optional)
              </label>
              {mediaUrls.map((url, idx) => (
                <div key={idx} className="flex mb-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleMediaUrlChange(e.target.value, idx)}
                    className="flex-1 border border-gray-300 rounded p-2 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeMediaUrl(idx)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMediaUrl}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Add Media URL
              </button>
            </div>

            <div className="flex flex-row items-start justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => {
                  setOpenCreate(false);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default ModuleForm;
