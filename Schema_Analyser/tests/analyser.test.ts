import { environment } from "./environment/environment";
import { Analyser } from "../src/classes/schema-analyser";
import { Importer } from "../src/classes/schema-importer";
import { beforeAll, describe, expect, it } from "vitest";
import * as user_schema from "../src/schemas/test-schema.json";

describe("Analyser", () => {
  let schema: object,
    uriSchema: object,
    allOfSchema: object,
    anyOfSchema: object,
    userSchema: object;

  beforeAll(async () => {
    var importer = new Importer();
    await importer.deserialize(environment.SCHEMA_JSON);
    schema = importer.getCredentialSubject();
    await importer.deserialize(environment.ALLOF_SCHEMA_JSON);
    allOfSchema = importer.getCredentialSubject();
    await importer.deserialize(environment.URI_SCHEMA_JSON);
    uriSchema = importer.getCredentialSubject();
    await importer.deserialize(environment.ANYOF_SCHEMA_JSON);
    anyOfSchema = importer.getCredentialSubject();
    await importer.deserialize(user_schema);
    userSchema = importer.getCredentialSubject();
  });

  it("Analyser with URI format in schema should pass", async () => {
    var analyser = new Analyser(uriSchema);

    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      type: ["VerifiableCredential"],
      credentialSubject: {
        uri: "http://www.pierobon.org/iis/review1.htm.html#one",
      },
    };

    expect(analyser.analyse(data).result).toBe(true);
  });

  it("Analyser with URI format in schema should not pass", async () => {
    var analyser = new Analyser(uriSchema);

    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      type: ["VerifiableCredential"],
      id: "did:web:registration.lab.gaia-x.eu:v1:b1da1222-4729-493d-8b4a-173e9d177c7c",
      issuer: "did:web:registration.lab.gaia-x.eu:v1",
      issuanceDate: "2024-05-13T14:45:16.516Z",
      credentialSubject: {
        "@context":
          "https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#",
        type: "gx:legalRegistrationNumber",
        id: "https://gaiax.oasees.digital.tecnalia.dev/.well-known/lrn.json",
        "gx:vatID": "ESG48975767",
        "gx:vatID-countryCode": "ES",
        uri: "asosimaimn",
      },
      evidence: [
        {
          "gx:evidenceURL":
            "http://ec.europa.eu/taxation_customs/vies/services/checkVatService",
          "gx:executionDate": "2024-05-13T14:45:16.513Z",
          "gx:evidenceOf": "gx:vatID",
        },
      ],
      proof: {
        type: "JsonWebSignature2020",
        created: "2024-05-13T14:45:16.838Z",
        proofPurpose: "assertionMethod",
        verificationMethod:
          "did:web:registration.lab.gaia-x.eu:v1#X509-JWK2020",
        jws: "eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..H8hsTxfeOdfusahjb9iqazu8uRh9dY-Z2kUbyP-7J6wtRJCkxkLOHzHb5diVgUhnEx4sCZ6VSVJZLz0ZnXd9lRNNhT9xTXccJpW77qxo3eyOQXqwj8P0By-1IdLg8VtzTwXPy7361qdmwCbWxxbn2yzco5rRdRt3T-sw8d8EZ3Cr2HAz-4oZ9FZh8tJkc6IAlubRFn71fMk_xXUfLnPuKAxtxWUbKQPFJOw9lexFwoUFzFnpZTzt_w5hHkt0uwpO6aLnZYU1S9IhpOS4EjMAerx76nftl_EURA-3F92uT4jABxyEzVS1BTGTC6XN17bWXlbi2WQumzhTpSZLVTjPhQ",
      },
    };

    expect(analyser.analyse(data).errors).toEqual([
      {
        instancePath: "/credentialSubject/uri",
        keyword: "format",
        message: 'must match format "uri"',
        params: { format: "uri" },
        schemaPath: "#/properties/credentialSubject/properties/uri/format",
      },
    ]);
  });

  it("Analyser with allOf property in schema should pass", async () => {
    var analyser = new Analyser(allOfSchema);

    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        name: "Alice",
        employeeID: "asdasd7",
        position: "Project Manager",
        department: "HR",
      },
    };

    expect(analyser.analyse(data).result).toBe(true);
  });

  it("Analyser with allOf property in schema should not pass", async () => {
    var analyser = new Analyser(allOfSchema);

    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        name: "Alice",
        position: "Project Manager",
        department: "HR",
      },
    };

    const data2 = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        name: "Alice",
        employeeID: "asdasd7",
        department: "HR",
      },
    };
    const data3 = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        employeeID: "asdasd7",
        department: "HR",
      },
    };

    const result = analyser.analyse(data);
    expect(result.result).toEqual(false);
    expect(result.errors).toEqual([
      {
        instancePath: "/credentialSubject",
        keyword: "required",
        message: "must have required property 'employeeID'",
        params: {
          missingProperty: "employeeID",
        },
        schemaPath: "#/properties/credentialSubject/allOf/0/required",
      },
    ]);

    const result2 = analyser.analyse(data2);
    expect(result2.result).toEqual(false);
    expect(result2.errors).toEqual([
      {
        instancePath: "/credentialSubject",
        keyword: "required",
        message: "must have required property 'position'",
        params: {
          missingProperty: "position",
        },
        schemaPath: "#/properties/credentialSubject/allOf/1/required",
      },
    ]);

    const result3 = analyser.analyse(data3);
    expect(result3.result).toEqual(false);
    expect(result3.errors).toEqual([
      {
        instancePath: "/credentialSubject",
        keyword: "required",
        message: "must have required property 'name'",
        params: {
          missingProperty: "name",
        },
        schemaPath: "#/properties/credentialSubject/allOf/0/required",
      },
    ]);
  });

  it("Analyser with anyOf property in schema should pass", async () => {
    var analyser = new Analyser(anyOfSchema);

    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        name: "Alice",
        employeeID: "asdasd7",
      },
    };

    expect(analyser.analyse(data).result).toBe(true);
  });

  it("Analyser with anyOf property in schema should not pass", async () => {
    var analyser = new Analyser(anyOfSchema);

    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        name: "Alice",
      },
    };

    const result = analyser.analyse(data);
    expect(result.result).toBe(false);
    expect(result.errors).toContainEqual({
      instancePath: "/credentialSubject",
      keyword: "required",
      message: "must have required property 'employeeID'",
      params: {
        missingProperty: "employeeID",
      },
      schemaPath: "#/properties/credentialSubject/anyOf/0/required",
    });

    expect(result.errors).toContainEqual({
      instancePath: "/credentialSubject",
      schemaPath: "#/properties/credentialSubject/anyOf/1/required",
      keyword: "required",
      params: { missingProperty: "position" },
      message: "must have required property 'position'",
    });
  });

  it("Analyser with custom medical schema should pass", async () => {
    var analyser = new Analyser(userSchema);

    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        role: "researcher",
        organization: {
          institute: "cea",
          department: "diasi",
        },
      },
    };

    expect(analyser.analyse(data).result).toBe(true);
  });

  it("Analyser with custom medical schema should not pass", async () => {
    var analyser = new Analyser(userSchema);

    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        role: "research",
      },
    };

    const data2 = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        organization: {
          institute: "ce",
        },
      },
    };

    const data3 = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiableCredential"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      credentialSubject: {
        organization: {
          institute: "cea",
        },
        fakeCredential: "fake value",
      },
    };

    const result1 = analyser.analyse(data);
    expect(result1.result).toEqual(false);
    expect(result1.errors).toContainEqual({
      instancePath: "/credentialSubject/role",
      keyword: "enum",
      message: "must be equal to one of the allowed values",
      params: {
        allowedValues: ["speech therapist", "doctor", "researcher"],
      },
      schemaPath: "#/properties/credentialSubject/properties/role/enum",
    });

    const result2 = analyser.analyse(data2);
    expect(result2.result).toEqual(false);
    expect(result2.errors).toContainEqual({
      instancePath: "/credentialSubject/organization/institute",
      keyword: "enum",
      message: "must be equal to one of the allowed values",
      params: {
        allowedValues: ["cea"],
      },
      schemaPath:
        "#/properties/credentialSubject/properties/organization/properties/institute/enum",
    });

    const result3 = analyser.analyse(data3);
    expect(result3.result).toEqual(false);
    expect(result3.errors).toContainEqual({
      instancePath: "/credentialSubject",
      keyword: "additionalProperties",
      message: "must NOT have additional properties",
      params: {
        additionalProperty: "fakeCredential",
      },
      schemaPath: "#/properties/credentialSubject/additionalProperties",
    });
  });

  it("Analyser with custom medical schema should not with faulty Verifiable Presentations", async () => {
    var analyser = new Analyser(userSchema);
    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiablePresentation", "ExamplePresentation"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      verifiableCredential: [
        {
          credentialSubject: {
            organization: {
              institute: "cea",
              department: "diasi",
            },
          },
        },
        {
          credentialSubject: {
            role: "research",
          },
        },
      ],
    };

    const data2 = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiablePresentation", "ExamplePresentation"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      verifiableCredential: [
        {
          credentialSubject: {
            organization: {
              institute: "ce",
              department: "diasi",
            },
          },
        },
        {
          credentialSubject: {
            role: "researcher",
          },
        },
      ],
    };

    const result1 = analyser.analyse(data);
    expect(result1.result).toEqual(false);
    expect(result1.errors).toContainEqual({
      instancePath: "/credentialSubject/role",
      keyword: "enum",
      message: "must be equal to one of the allowed values",
      params: {
        allowedValues: ["speech therapist", "doctor", "researcher"],
      },
      schemaPath: "#/properties/credentialSubject/properties/role/enum",
    });

    const result2 = analyser.analyse(data2);
    expect(result2.result).toEqual(false);
    expect(result2.errors).toContainEqual({
      instancePath: "/credentialSubject/organization/institute",
      keyword: "enum",
      message: "must be equal to one of the allowed values",
      params: {
        allowedValues: ["cea"],
      },
      schemaPath:
        "#/properties/credentialSubject/properties/organization/properties/institute/enum",
    });
  });

  it("Analyser with should extract attributes from Verifiable Presentation", async () => {
    var analyser = new Analyser(userSchema);
    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiablePresentation", "ExamplePresentation"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      verifiableCredential: [
        {
          credentialSubject: {
            test1: "testvalue1",
            test2: {
              test3: {
                test4: "testvalue4",
                test5: "testvalue5",
                test6: {
                  test7: "testvalue7",
                },
              },
            },
          },
        },
      ],
    };

    let result = analyser.extractAttributesFromPresentation(data);
    expect(result).toContain("test1:testvalue1");
    expect(result).toContain("test2:test3:test4:testvalue4");
    expect(result).toContain("test2:test3:test5:testvalue5");
    expect(result).toContain("test2:test3:test6:test7:testvalue7");
  });

  it("Analyser with should analyse attributes and extract them", async () => {
    var analyser = new Analyser(userSchema);
    const data = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/security/suites/jws-2020/v1",
      ],
      id: "4995c86c-851f-43a6-9dd2-03dc891091fd",
      type: ["VerifiablePresentation", "ExamplePresentation"],
      issuer: "did:example:1234",
      validFrom: "2023-01-01T05:05:05Z",
      verifiableCredential: [
        {
          credentialSubject: {
            organization: {
              institute: "cea",
              department: "diasi",
            },
          },
        },
        {
          credentialSubject: {
            role: "researcher",
          },
        },
      ],
    };

    expect(analyser.analyse(data).result).toBe(true);

    let result = analyser.extractAttributesFromPresentation(data);
    expect(result).toContain("role:researcher");
    expect(result).toContain("organization:institute:cea");
    expect(result).toContain("organization:department:diasi");
  });
});
