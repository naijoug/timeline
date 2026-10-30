import { createExplorerPayload } from './explorer-payload';
import { aiCatalog } from '../topics/ai/adapter';
import { aiExplorerPresentation } from '../topics/ai/explorer';
import { chinaHistory } from '../topics/china-history/catalog';
import { programmingLanguages } from '../topics/programming-languages/catalog';
import { languagePresentation } from '../topics/programming-languages/presentation';
import { writersCatalog } from '../topics/writers/catalog';
import { writersPresentation } from '../topics/writers/presentation';

/** Loaded only by the server branch of TopicExplorer, never by the browser. */
const payloads = {
  ai: createExplorerPayload(aiCatalog, aiExplorerPresentation()),
  'china-history': createExplorerPayload(chinaHistory),
  'programming-languages': createExplorerPayload(programmingLanguages, languagePresentation),
  writers: createExplorerPayload(writersCatalog, writersPresentation),
};
export type ExplorerTopic = keyof typeof payloads;
export function topicPayload(topic: ExplorerTopic) { return payloads[topic]; }
