import React from "react";
import Tasks from "./tasks";
import { ApolloProvider } from "@apollo/client";

import client from "./clientApollo";

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Tasks />
        </ApolloProvider>
    );
};

export default App;
