import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM!,
  url: process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL!,
  clientId: process.env.REACT_APP_KEYCLOAK_RESOURCE!,
});

export default keycloak;
