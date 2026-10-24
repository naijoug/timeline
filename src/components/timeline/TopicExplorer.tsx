import { useState } from 'react';
import Explorer from './Explorer';
import { payloadJson } from '../../core/payload-json';
import type { createExplorerPayload } from '../../core/explorer-payload';
import type { ExplorerTopic } from '../../core/topic-payloads.server';

// Vite removes this branch and its catalog dependency graph from client output.
// The small index is emitted AFTER the readable SSR content, not in a huge
// Astro props attribute before the page. No extra fetch or custom hydrator.
const server = import.meta.env.SSR ? await import('../../core/topic-payloads.server') : undefined;
type Payload = ReturnType<typeof createExplorerPayload>;
export default function TopicExplorer({ topicId, ...view }: {
  topicId: ExplorerTopic; initialPeriod?: string; initialCategory?: string; viewPath?: string;
}) {
  const [payload] = useState<Payload>(() => {
    if (server) return server.topicPayload(topicId);
    const element = document.getElementById(`timeline-payload-${topicId}`);
    if (!element?.textContent) throw new Error(`Missing timeline index: ${topicId}`);
    return JSON.parse(element.textContent) as Payload;
  });
  return <>
    <Explorer {...payload} {...view} />
    <script id={`timeline-payload-${topicId}`} type="application/json" dangerouslySetInnerHTML={{ __html: payloadJson(payload) }} />
  </>;
}
