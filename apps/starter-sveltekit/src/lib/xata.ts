import { XataClient } from './xata.codegen.server';
import { XATA_API_KEY } from '$env/static/private';

export const xata = new XataClient({ apiKey: XATA_API_KEY });
