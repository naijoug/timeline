import { events } from "../src/data/events";
import { entities, relations } from "../src/data/entities";
import { sources } from "../src/data/sources";
import { validateCatalog } from "../src/lib/validate";
import { validateCatalog as validateCore } from "../src/core/validate";
import { chinaHistory } from "../src/topics/china-history/catalog";
import { aiCatalog } from "../src/topics/ai/adapter";
import { programmingLanguages } from "../src/topics/programming-languages/catalog";
import { writersCatalog } from "../src/topics/writers/catalog";

const errors = [
  ...validateCatalog(events, entities, sources, relations),
  ...validateCore(aiCatalog),
  ...validateCore(chinaHistory),
  ...validateCore(programmingLanguages),
  ...validateCore(writersCatalog),
];
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `AI validated: ${events.length} events, ${entities.length} entities, ${sources.length} sources, ${relations.length} object relations, ${aiCatalog.relations?.length || 0} event evidence relations, ${aiCatalog.collections?.length || 0} collections.`,
);
console.log(
  `Programming languages validated: ${programmingLanguages.periods.length} eras, ${programmingLanguages.events.length} events, ${programmingLanguages.entities.length} entities, ${programmingLanguages.sources.length} sources.`,
);
console.log(
  `Chinese history validated: ${chinaHistory.periods.length} periods, ${chinaHistory.events.length} events, ${chinaHistory.entities.length} entities, ${chinaHistory.sources.length} sources, 0 object relations, ${chinaHistory.relations?.length || 0} event evidence relations, ${chinaHistory.collections?.length || 0} collections.`,
);
console.log(
  `Writers validated: ${writersCatalog.periods.length} eras, ${writersCatalog.events.length} events, ${writersCatalog.entities.length} entities, ${writersCatalog.sources.length} sources.`,
);
