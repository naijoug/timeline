import { useMemo } from 'react';
import Explorer from './timeline/Explorer';
import { aiAtlasData, toCoreEvent, aiCatalog } from '../topics/ai/adapter';
import { aiExplorerPresentation } from '../topics/ai/explorer';
import type { AtlasState } from '../lib/atlas';

/** AI supplies content and compatibility adapters to the shared topic explorer. */
export default function Atlas({ initialLane = 'all', data = aiAtlasData }: { initialLane?: AtlasState['lane']; data?: typeof aiAtlasData }) {
  const catalog = useMemo(() => ({ ...aiCatalog, events: data.events.map(toCoreEvent), entities: data.entities, sources: Object.values(data.sourceMap) }), [data]);
  const presentation = useMemo(() => aiExplorerPresentation(data), [data]);
  return <Explorer catalog={catalog} initialCategory={initialLane === 'all' ? '' : initialLane} presentation={presentation} />;
}
