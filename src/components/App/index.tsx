import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { Container, LinearProgress, List, Paper } from "@material-ui/core";
import { CONTINENTS } from "../../graphql/queries/Continents";
import {
  Continents,
  Continents_continents,
  Continents_continents_countries,
  Continents_continents_countries_languages,
} from "../../graphql/queries/Continents/__generated__/Continents";
import { Alert } from "@material-ui/lab";
import CollapsibleListItem from "../CollapsibleListItem";

type CloseAllContextType = {
  status?: boolean,
  setCloseAll?: (newVal: boolean) => void;
}

export const CloseAllContext = React.createContext<CloseAllContextType>({});

export default function App() {
  const { data, loading, error } = useQuery<Continents>(CONTINENTS);
  const [closeAll, setCloseAll] = useState<boolean>(false);

  const insides = () => {
    if (loading) return <LinearProgress />;
    if (error || !data) return <Alert severity="error">Error occurred</Alert>;
    const continents = data.continents;
    return (
      <Paper>
        <List component="div" disablePadding>
          {renderContinents(continents)}
        </List>
      </Paper>
    );
  };

  const renderLanguage = (
    languages: Continents_continents_countries_languages[],
  ) => {
    return languages.map((language) => (
      <CollapsibleListItem
        text={language.name || ""}
        key={language.code}
      />
    ));
  };

  const renderCountries = (
    countries: Continents_continents_countries[],
  ) => {
    return countries.map((country) => (
      <CollapsibleListItem
        text={country.name}
        collapsible
        key={country.code}
      >
        {renderLanguage(country.languages)}
      </CollapsibleListItem>
    ));
  };

  const renderContinents = (continents: Continents_continents[]) => {
    return continents.map((continent) => (
      <CollapsibleListItem
        text={continent.name}
        collapsible
        key={continent.code}
      >
        {renderCountries(continent.countries)}
      </CollapsibleListItem>
    ));
  };

  return (
    <CloseAllContext.Provider value={{ status: closeAll, setCloseAll }}>
      <Container maxWidth="sm">{insides()}</Container>
    </CloseAllContext.Provider>
  );
}
