import { VNode, CreateElement } from 'vue';

export type IconX = string | { viewBox: string; id: string };

type RenderFunc = (h: CreateElement) => VNode | VNode[];
type RenderType = string | VNode | RenderFunc;
export type RenderX = string | VNode | RenderFunc | RenderType[];

type ContainerClass = string;
type ContainerFunc = () => Element;
type ContainerEle = Element;
export type Container = ContainerEle | ContainerClass | ContainerFunc;

export type Classes = string;

export type Styles = object;
