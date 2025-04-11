import React, { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ModuleForm from "./ModuleForm";
import AllModules from "./AllModules";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [refresh, setRefresh] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50 p-4">
        <ModuleForm
          setRefresh={setRefresh}
          openCreate={openCreate}
          setOpenCreate={setOpenCreate}
        />
        <AllModules
          refresh={refresh}
          setRefresh={setRefresh}
          setOpenCreate={setOpenCreate}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
