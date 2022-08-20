export const settings = {
  server: {
    baseUrl: process.env.REACT_APP_SERVER_BASE_URL!,
  },
  fhir: {
    baseUrl: process.env.REACT_APP_FHIR_BASE_URL!,
    websocketUrl: process.env.REACT_APP_FHIR_WEBSOCKET_URL!,
    profileBaseUrl: process.env.REACT_APP_FHIR_PROFILE_BASE_URL!,
  },
  keycloak: {
    authServerUrl: process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL!,
    realm: process.env.REACT_APP_KEYCLOAK_REALM!,
    resource: process.env.REACT_APP_KEYCLOAK_RESOURCE!,
  },
};
