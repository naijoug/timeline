import type { ExplorerPresentation } from "../../core/explorer";
import { entities, events } from "./catalog";

const languageScopes = entities
  .map(language => ({
    id: language.id,
    title: language.name,
    eventIds: events
      .filter(event => event.entityIds.includes(language.id))
      .sort((a, b) => a.time.start.year - b.time.start.year)
      .map(event => event.id),
  }))
  .filter(scope => scope.eventIds.length >= 2)
  .sort((a, b) => a.title.localeCompare(b.title, "zh-Hans-CN"))
  .map((scope, index) => ({
    ...scope,
    title: `${String(index + 1).padStart(2, "0")} ${scope.title}`,
  }));

export const languagePresentation: ExplorerPresentation = {
  subtitle: "从 FORTRAN 的编译器到现代语言的安全性与平台能力",
  defaultRange: [1957, 2026],
  defaultEvent: "fortran-i",
  latestEvent: "python-313",
  scopes: languageScopes,
  scopeLabel: "语言",
  scopeAllLabel: "全部语言",
  landmark: {
    year: 1995,
    position: 1995,
    title: "Web 语言元年",
    event: "java-public",
  },
  footer: "官方文档、报告与论文随节点保留",
};
