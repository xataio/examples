// Generated by Xata Codegen 0.18.0. Please do not edit.
import {
  BaseClientOptions,
  buildClient,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "solid_with_xata_example",
    columns: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "url", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type SolidWithXataExample = InferredTypes["solid_with_xata_example"];
export type SolidWithXataExampleRecord = SolidWithXataExample & XataRecord;

export type DatabaseSchema = {
  solid_with_xata_example: SolidWithXataExampleRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://fabien-ph3r1h.eu-west-1.xata.sh/db/next-xata-app",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
