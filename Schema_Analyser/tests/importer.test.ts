import { environment } from "./environment/environment";
import { Importer, UrlImporter } from "../src/classes/schema-importer";
import { beforeAll, describe, expect, it } from "vitest";

describe("Importer", () => {
  let EXPECTED_CREDENTIAL_SUBJECT_FROM_URL: any;

  beforeAll(async () => {
    let schema: any = {};
    await fetch(environment.SCHEMA_URL)
      .then((res) => res.json())
      .then((out) => (schema = out))
      .catch((err) => console.log(err));

    EXPECTED_CREDENTIAL_SUBJECT_FROM_URL = schema;
  });

  it("UrlImporter should deserialize the schema from link", async () => {
    var importer = new UrlImporter();
    await importer.deserialize(environment.SCHEMA_URL);

    expect(importer.credentialSubject).toEqual(
      EXPECTED_CREDENTIAL_SUBJECT_FROM_URL
    );
  });

  it("Importer should deserialize the schema schema object", async () => {
    var importer = new Importer();
    await importer.deserialize(environment.SCHEMA_JSON);

    expect(importer.credentialSubject).toEqual(environment.SCHEMA_JSON);
  });
});
