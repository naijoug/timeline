import { events } from "../src/data/events";
import { entities, relations } from "../src/data/entities";
import { sources } from "../src/data/sources";
import { validateCatalog } from "../src/lib/validate";
import { validateCatalog as validateCore } from "../src/core/validate";
import { chinaHistory } from "../src/topics/china-history/catalog";
import { aiCatalog } from "../src/topics/ai/adapter";
const errors = [
  ...validateCatalog(events, entities, sources, relations),
  ...validateCore(aiCatalog),
  ...validateCore(chinaHistory),
];
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Content validated: ${events.length} events, ${entities.length} entities, ${sources.length} sources, ${relations.length} relations.`,
);
console.log(
  `Chinese history validated: ${chinaHistory.periods.length} periods, ${chinaHistory.events.length} events, ${chinaHistory.sources.length} sources.`,
);
