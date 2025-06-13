export const environment = {
  // https://raw.githubusercontent.com/w3c/vc-data-model/main/schema/verifiable-credential/verifiable-credential-schema.json
  ALLOF_SCHEMA_JSON: {
    type: "object",
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      credentialSubject: {
        allOf: [
          {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Full name of the employee",
              },
              employeeID: {
                type: "string",
                description: "Unique identifier for the employee",
              },
            },
            required: ["name", "employeeID"],
          },
          {
            type: "object",
            properties: {
              position: {
                type: "string",
                description: "Job position of the employee",
              },
              department: {
                type: "string",
                description: "Department where the employee works",
              },
            },
            required: ["position", "department"],
          },
        ],
      },
    },
  },

  ANYOF_SCHEMA_JSON: {
    type: "object",
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      credentialSubject: {
        anyOf: [
          {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Full name of the employee",
              },
              employeeID: {
                type: "string",
                description: "Unique identifier for the employee",
              },
            },
            required: ["name", "employeeID"],
          },
          {
            type: "object",
            properties: {
              position: {
                type: "string",
                description: "Job position of the employee",
              },
              department: {
                type: "string",
                description: "Department where the employee works",
              },
            },
            required: ["position", "department"],
          },
        ],
      },
    },
  },

  SCHEMA_JSON: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "EBSI Legal Entity Verifiable ID",
    description: "Schema of an EBSI Verifiable ID for a legal entity",
    type: "object",

    properties: {
      credentialSubject: {
        description:
          "Defines information about the subject that is described by the Verifiable ID",
        type: "object",
        properties: {
          id: {
            description:
              "Defines the DID of the subject that is described by the Verifiable Attestation",
            type: "string",
            format: "taxID",
          },
          legalPersonIdentifier: {
            description:
              "National/Legal Identifier of Credential Subject (constructed by the sending Member State in accordance with the technical specifications for the purposes of cross-border identification and which is as persistent as possible in time)",
            type: "string",
          },
          legalName: {
            description: "Official legal name of Credential Subject",
            type: "string",
          },
          legalAddress: {
            description: "Official legal address of Credential Subject",
            type: "string",
          },
          VATRegistration: {
            description: "VAT number  of Credential Subject",
            type: "string",
          },
          taxReference: {
            description: "Official tax reference number of Credential Subject",
            type: "string",
          },
          LEI: {
            description:
              "Official legal entity identifier (LEI) of Credential Subject (referred to in Commission Implementing Regulation (EU) No 1247/2012)",
            type: "string",
          },
          EORI: {
            description:
              "Economic Operator Registration and Identification (EORI) of Credential Subject (referred to in Commission Implementing Regulation (EU) No 1352/2013)",
            type: "string",
          },
          SEED: {
            description:
              "System for Exchange of Excise Data (SEED) of Credential Subject (i.e. excise number provided in Article 2(12) of Council Regulation (EC) No 389/2012)",
            type: "string",
          },
          SIC: {
            description:
              "Standard Industrial Classification (SIC) of Credential Subject (Article 3(1) of Directive 2009/101/EC of the European Parliament and of the Council.)",
            type: "string",
          },
          domainName: {
            description: "Domain name  of Credential Subject",
            type: "string",
          },
        },
        required: ["id", "legalName"],
      },
    },
  },
  URI_SCHEMA_JSON: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "URI schema example",
    description: "Schema of an EBSI Verifiable ID for a legal entity",
    type: "object",
    properties: {
      credentialSubject: {
        description:
          "Defines information about the subject that is described by the URI",
        type: "object",
        properties: {
          uri: {
            description:
              "Defines the DID of the subject that is described by the Verifiable Attestation",
            type: "string",
            format: "uri",
          },
        },
        required: ["uri"],
      },
    },
  },
  SCHEMA_URL:
    "https://rsksmart.github.io/vc-json-schemas/EmailCredentialSchema/v1.0/schema.json",
  DATA: {
    id: "http://www.pierobon.org/iis/review1.htm.html#one",
    legalName: "John Doe",
  },
};
