import { VNode, CreateElement } from 'vue';

type RenderFunc = (h: CreateElement) => VNode | VNode[];
type RenderType = string | VNode | RenderFunc;

export type RenderX = string | VNode | RenderFunc | RenderType[];
