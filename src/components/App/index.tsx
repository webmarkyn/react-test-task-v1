import React, {useEffect} from "react";
import { useQuery } from "react-apollo";
import {Container, LinearProgress} from "@material-ui/core";
import {CONTINENTS} from "../../graphql/queries/Continents";
import {Continents} from "../../graphql/queries/Continents/__generated__/Continents";
import {Alert} from "@material-ui/lab";

export default function App() {
  const {data, loading, error} = useQuery<Continents>(CONTINENTS);

  const insides = () => {
    if (loading) return (<LinearProgress />)
    if (error) return (<Alert severity="error">Error occurred</Alert>)
    return <h1>Hello</h1>
  }

  return (
    <Container maxWidth="sm">
      {insides()}
    </Container>
  )
}