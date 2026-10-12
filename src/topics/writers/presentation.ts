import type { ExplorerPresentation } from "../../core/explorer";
import { writersCatalog } from "./catalog";

const scopeEventIds = (entityId: string) =>
  writersCatalog.events.filter(e => e.entityIds.includes(entityId)).map(e => e.id);

export const writersPresentation: ExplorerPresentation = {
  subtitle: "刘慈欣、紫金陈、马伯庸代表作品出版时间线与内容简介",
  defaultRange: [1999, 2026],
  defaultEvent: "liu-cixin-wandering-earth",
  latestEvent: "ma-bo-yong-food-of-the-south",
  scopes: [
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
  footer: "作品出版记录、期刊首发与图书版本随节点保留",
};
