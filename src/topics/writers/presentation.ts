import type { ExplorerPresentation } from "../../core/explorer";
import { writersCatalog } from "./catalog";

const scopeEventIds = (entityId: string) =>
  writersCatalog.timelines?.find(line => line.id === entityId)?.entries.map(entry => entry.eventId) || [];

export const writersPresentation: ExplorerPresentation = {
  subtitle: "刘慈欣、紫金陈、马伯庸、李不白的作品、版本与阅读脉络",
  defaultRange: [1999, 2026],
  defaultEvent: "liu-cixin-wandering-earth",
  latestEvent: "ma-bo-yong-food-of-the-south",
  scopes: [
    { id: "li-bu-bai", title: "李不白", eventIds: scopeEventIds("li-bu-bai") },
    { id: "liu-cixin", title: "刘慈欣", eventIds: scopeEventIds("liu-cixin") },
    { id: "zi-jin-chen", title: "紫金陈", eventIds: scopeEventIds("zi-jin-chen") },
    { id: "ma-bo-yong", title: "马伯庸", eventIds: scopeEventIds("ma-bo-yong") },
  ],
  scopeLabel: "作家",
  scopeAllLabel: "全部",
  landmark: {
    year: 2006,
    position: 2006,
    title: "《三体》开始连载",
    event: "liu-cixin-three-body-1",
  },
  footer: "期刊首发、成书、译介与获奖分别记录，日期不混用",
};
