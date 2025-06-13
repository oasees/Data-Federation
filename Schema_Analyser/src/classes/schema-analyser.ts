import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Ajv2020 } from "ajv/dist/2020"; // Default is JSON schema from 2007

interface AnalysisResult {
  result: boolean;
  errors?: any[] | null;
  errorMessage?: string;
}

export class Analyser {
  schema: any = {};
  ajv: Ajv;
  constructor(schema: any) {
    this.schema = schema;
    this.ajv = new Ajv2020();
    addFormats(this.ajv);
  }

  analyse(credential: any): AnalysisResult {
    // Checking that the type of the JSON is a Verifiable Credential
    if (
      (credential as any).type &&
      (credential as any).type instanceof Array &&
      (credential as any).type.indexOf("VerifiableCredential") == -1 &&
      (credential as any).type.indexOf("VerifiablePresentation") == -1
    )
      return {
        result: false,
        errorMessage:
          "The given credential must have the type 'VerifiableCredential' or 'VerifiablePresentation'",
      };

    const validate = this.ajv.compile(this.schema);

    if ((credential as any).type.indexOf("VerifiablePresentation") !== -1) {
      let i = 0;
      let valid = true;
      while (i < credential.verifiableCredential?.length && valid) {
        valid = validate(credential.verifiableCredential[i]);
        i++;
      }
      if (!valid) {
        return { result: false, errors: validate.errors };
      } else {
        return { result: true };
      }
    } else {
      const valid = validate(credential);
      if (!valid) {
        return { result: false, errors: validate.errors };
      } else {
        return { result: true };
      }
    }
  }

  extractAttributesFromCredential(
    attr: string | any,
    root?: string
  ): string | string[] {
    let attrList: any[] = [];
    if (attr instanceof Object) {
      for (let a of Object.keys(attr)) {
        if (root) {
          attrList = attrList.concat(
            this.extractAttributesFromCredential(attr[a], `${root}:${a}`)
          );
        } else {
          attrList = attrList.concat(
            this.extractAttributesFromCredential(attr[a], a)
          );
        }
      }
      return attrList;
    } else {
      // It isn't an instance of Object
      if (root) {
        let result = `${root}:${attr}`;
        return result;
      } else {
        return attr;
      }
    }
  }

  extractAttributesFromPresentation(credential: any): string[] {
    let attributes: string[] = [];
    credential.verifiableCredential.forEach((credential: any) => {
      attributes = attributes.concat(
        this.extractAttributesFromCredential(credential.credentialSubject)
      );
    });
    return attributes;
  }
}
