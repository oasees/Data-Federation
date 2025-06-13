# Schema Analyser

This software is designed to contrast credential Schemas and credentials for the OASEES project.

## Instalation

Make sure that you have nodeJS instaled in your device. After downloading execute the `npm install` command.

## Elements

This module has to classes: The importer for schema gathering and the analyser. The following is an example of the usage of these components.

```ts
var importer = new UrlImporter();
await importer.deserialize("<schema_url>");
schema = importer.getCredentialSubject();

var analyser = new Analyser(schema);

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/suites/jws-2020/v1",
  ],
  type: ["VerifiableCredential"],
  credentialSubject: {
    uri: "http://www.pierobon.org/iis/review1.htm.html#one",
  },
};

// For credential validation

const result = analyser.analyse(data).

// For attribute extraction from credential

const attributes = analyser.extractAttributesFromPresentation(data);
```

## Testing

For executing the tests run `npm run test`. The environment variables expected for the tests and are expected to be in the directory `tests/environment` and the expected values are the same as in the `environment.ts` example above.
