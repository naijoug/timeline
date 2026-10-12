import type { ExplorerPresentation } from "../../core/explorer";

export const writersPresentation: ExplorerPresentation = {
  subtitle: "刘慈欣、紫金陈、马伯庸代表作品出版时间线与内容简介",
  defaultRange: [1999, 2026],
  defaultEvent: "liu-cixin-wandering-earth",
  latestEvent: "ma-bo-yong-food-of-the-south",
  landmark: {
    year: 2006,
    position: 2006,
    title: "《三体》开始连载",
    event: "liu-cixin-three-body-1",
  },
  footer: "作品出版记录、期刊首发与图书版本随节点保留",
};
