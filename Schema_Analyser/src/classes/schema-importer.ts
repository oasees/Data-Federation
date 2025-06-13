interface Serializable<T> {
  deserialize(input: any): Promise<T>;
}

class BaseImporter {
  title: string = "";
  credentialSubject: any[] = [];

  getCredentialSubject() {
    return this.credentialSubject;
  }
}

export class Importer extends BaseImporter implements Serializable<Importer> {
  async deserialize(input: any) {
    this.title = input.title;
    this.credentialSubject = input;
    return this;
  }
}

export class UrlImporter
  extends BaseImporter
  implements Serializable<Importer>
{
  async deserialize(input: any) {
    let schema: any = {};
    await fetch(input)
      .then((res) => res.json())
      .then((out) => (schema = out))
      .catch((err) => console.log(err));

    this.title = schema.title;
    this.credentialSubject = schema;
    return this;
  }
}
