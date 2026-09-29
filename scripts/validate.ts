import { events } from '../src/data/events';
import { entities, relations } from '../src/data/entities';
import { sources } from '../src/data/sources';
import { validateCatalog } from '../src/lib/validate';
const errors = validateCatalog(events, entities, sources, relations);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Content validated: ${events.length} events, ${entities.length} entities, ${sources.length} sources, ${relations.length} relations.`);
