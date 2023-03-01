// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "pokemon",
    columns: [
      { name: "abilities", type: "string" },
      { name: "againstBug", type: "float" },
      { name: "againstDark", type: "float" },
      { name: "againstDragon", type: "float" },
      { name: "againstElectric", type: "float" },
      { name: "againstFairy", type: "float" },
      { name: "againstFight", type: "float" },
      { name: "againstFire", type: "float" },
      { name: "againstFlying", type: "float" },
      { name: "againstGhost", type: "float" },
      { name: "againstGrass", type: "float" },
      { name: "againstGround", type: "float" },
      { name: "againstIce", type: "float" },
      { name: "againstNormal", type: "float" },
      { name: "againstPoison", type: "float" },
      { name: "againstPsychic", type: "float" },
      { name: "againstRock", type: "float" },
      { name: "againstSteel", type: "float" },
      { name: "againstWater", type: "float" },
      { name: "attack", type: "int" },
      { name: "baseEggSteps", type: "int" },
      { name: "baseHappiness", type: "int" },
      { name: "baseTotal", type: "int" },
      { name: "captureRate", type: "int" },
      { name: "classfication", type: "string" },
      { name: "defense", type: "int" },
      { name: "experienceGrowth", type: "int" },
      { name: "heightM", type: "float" },
      { name: "hp", type: "int" },
      { name: "japaneseName", type: "string" },
      { name: "name", type: "string" },
      { name: "percentageMale", type: "float" },
      { name: "pokedexNumber", type: "int" },
      { name: "spAttack", type: "int" },
      { name: "spDefense", type: "int" },
      { name: "speed", type: "int" },
      { name: "type1", type: "string" },
      { name: "type2", type: "string" },
      { name: "weightKg", type: "float" },
      { name: "generation", type: "int" },
      { name: "isLegendary", type: "int" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Pokemon = InferredTypes["pokemon"];
export type PokemonRecord = Pokemon & XataRecord;

export type DatabaseSchema = {
  pokemon: PokemonRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://sample-databases-v0sn1n.us-east-1.xata.sh/db/pokemon",
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
