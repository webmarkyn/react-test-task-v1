import { gql } from 'apollo-boost';

export const CONTINENTS = gql`
    query Continents {
        continents {
            code,
            name,
            countries {
                code,
                name,
                languages {
                    code,
                    name,
                }
            }
        }
    }
`