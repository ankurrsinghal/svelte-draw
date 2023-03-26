import type { SvelteComponent } from "svelte";
import type { SVGAttributes } from "svelte/elements";

export type Point = [number, number];

export interface Camera {
  point: number[];
  zoom: number;
}

export interface Data {
  camera: {
    point: number[]
    zoom: number
  }
  currentPageId: string
  selectedIds: string[]
  pointedId: string
  document: {
    pages: Record<string, Page>
  }
}

export interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width: number
  height: number
}

export interface Page {
  id: string
  type: "page"
  childIndex: number
  name: string
  shapes: Record<string, Shape>
  shapeIds: string[]
}

export enum ShapeType {
  Dot = "dot",
  Circle = "circle",
  Ellipse = "ellipse",
  Line = "line",
  Ray = "ray",
  Polyline = "Polyline",
  Rectangle = "rectangle",
  // Glob = "glob",
  // Spline = "spline",
  // Cubic = "cubic",
  // Conic = "conic",
}

export interface BaseShape {
  id: string
  type: ShapeType
  parentId: string
  childIndex: number
  name: string
  rotation: 0
  point: [number, number]
  style: Partial<SVGAttributes<SVGUseElement>>
}

export interface DotShape extends BaseShape {
  type: ShapeType.Dot
}

export interface CircleShape extends BaseShape {
  type: ShapeType.Circle
  radius: number
}

export interface EllipseShape extends BaseShape {
  type: ShapeType.Ellipse
  radiusX: number
  radiusY: number
}

export interface LineShape extends BaseShape {
  type: ShapeType.Line
  vector: number[]
}

export interface RayShape extends BaseShape {
  type: ShapeType.Ray
  vector: number[]
}

export interface PolylineShape extends BaseShape {
  type: ShapeType.Polyline
  points: number[][]
}

export interface RectangleShape extends BaseShape {
  type: ShapeType.Rectangle
  size: number[]
}

export type Shape =
  | DotShape
  | CircleShape
  | EllipseShape
  | LineShape
  | RayShape
  | PolylineShape
  | RectangleShape

export interface Shapes extends Record<ShapeType, Shape> {
  [ShapeType.Dot]: DotShape
  [ShapeType.Circle]: CircleShape
  [ShapeType.Ellipse]: EllipseShape
  [ShapeType.Line]: LineShape
  [ShapeType.Ray]: RayShape
  [ShapeType.Polyline]: PolylineShape
  [ShapeType.Rectangle]: RectangleShape
}

export interface BaseShapeStyles {
  fill: string
  stroke: string
  strokeWidth: number
}

export type Difference<A, B> = A extends B ? never : A

export type ShapeSpecificProps<T extends Shape> = Pick<
  T,
  Difference<keyof T, keyof BaseShape>
>

export type ShapeProps<T extends Shape> = Partial<BaseShapeStyles> &
  ShapeSpecificProps<T>

export type BaseLibShape<K extends ShapeType> = {
  create(props: Partial<Shapes[K]>): Shapes[K]
  getBounds(shape: Shapes[K]): Bounds
  hitTest(shape: Shapes[K], test: number[]): boolean
  rotate(shape: Shapes[K]): Shapes[K]
  translate(shape: Shapes[K]): Shapes[K]
  scale(shape: Shapes[K], scale: number): Shapes[K]
  stretch(shape: Shapes[K], scaleX: number, scaleY: number): Shapes[K]
  render(shape: Shapes[K]): SvelteComponent
}