/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Continents
// ====================================================

export interface Continents_continents_countries_languages {
  __typename: "Language";
  code: string;
  name: string | null;
}

export interface Continents_continents_countries {
  __typename: "Country";
  code: string;
  name: string;
  languages: Continents_continents_countries_languages[];
}

export interface Continents_continents {
  __typename: "Continent";
  code: string;
  name: string;
  countries: Continents_continents_countries[];
}

export interface Continents {
  continents: Continents_continents[];
}
