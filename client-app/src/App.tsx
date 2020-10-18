import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Header, Icon, List } from "semantic-ui-react";

const App = () => {
  const [values, setValues] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/values").then((response) => {
      setValues(response.data);
    });
  }, []);

  return (
    <div>
      <Header as='h2' icon>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {values.map((value: any) => (
          <List.Item key={value.id}>{value.name}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
