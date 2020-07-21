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

type CurrentItemType = {
  continentId?: string;
  countryId?: string;
};

type CurrentItemContextType = {
  setCurrentItem?: (newVal: CurrentItemType) => void;
} & CurrentItemType;

export const CurrentItemContext = React.createContext<CurrentItemContextType>(
  {}
);

export default function App() {
  const { data, loading, error } = useQuery<Continents>(CONTINENTS);
  const [currentItem, setCurrentItem] = useState<CurrentItemType>({});

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
    continentId: string,
    countryId: string
  ) => {
    return languages.map((language) => (
      <CollapsibleListItem
        text={language.name || ""}
        continentId={continentId}
        countryId={countryId}
        key={language.code}
      />
    ));
  };

  const renderCountries = (
    countries: Continents_continents_countries[],
    continentId: string
  ) => {
    return countries.map((country) => (
      <CollapsibleListItem
        text={country.name}
        collapsible
        continentId={continentId}
        countryId={country.code}
        key={country.code}
      >
        {renderLanguage(country.languages, continentId, country.code)}
      </CollapsibleListItem>
    ));
  };

  const renderContinents = (continents: Continents_continents[]) => {
    return continents.map((continent) => (
      <CollapsibleListItem
        text={continent.name}
        collapsible
        continentId={continent.code}
        key={continent.code}
      >
        {renderCountries(continent.countries, continent.code)}
      </CollapsibleListItem>
    ));
  };

  return (
    <CurrentItemContext.Provider value={{ ...currentItem, setCurrentItem }}>
      <Container maxWidth="sm">{insides()}</Container>
    </CurrentItemContext.Provider>
  );
}
