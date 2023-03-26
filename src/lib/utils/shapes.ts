import { type Bounds, ShapeType, type Shapes } from "$lib/types"
import { intersectCircleBounds } from "./intersections"
import * as vec from "./vec"

/**
 * Get whether two bounds collide.
 * @param a Bounds
 * @param b Bounds
 * @returns
 */
export function boundsCollide(a: Bounds, b: Bounds) {
  return !(
    a.maxX < b.minX ||
    a.minX > b.maxX ||
    a.maxY < b.minY ||
    a.minY > b.maxY
  )
}

/**
 * Get whether the bounds of A contain the bounds of B. A perfect match will return true.
 * @param a Bounds
 * @param b Bounds
 * @returns
 */
export function boundsContain(a: Bounds, b: Bounds) {
  return (
    a.minX < b.minX && a.minY < b.minY && a.maxY > b.maxY && a.maxX > b.maxX
  )
}

/**
 * Get whether the bounds of A are contained by the bounds of B.
 * @param a Bounds
 * @param b Bounds
 * @returns
 */
export function boundsContained(a: Bounds, b: Bounds) {
  return boundsContain(b, a)
}

/**
 * Get whether two bounds are identical.
 * @param a Bounds
 * @param b Bounds
 * @returns
 */
export function boundsAreEqual(a: Bounds, b: Bounds) {
  return !(
    b.maxX !== a.maxX ||
    b.minX !== a.minX ||
    b.maxY !== a.maxY ||
    b.minY !== a.minY
  )
}

/**
 * Get whether a point is inside of a bounds.
 * @param A
 * @param b
 * @returns
 */
export function pointInBounds(A: number[], b: Bounds) {
  return !(A[0] < b.minX || A[0] > b.maxX || A[1] < b.minY || A[1] > b.maxY)
}

type BaseShapeUtils<K extends ShapeType> = {
  getBounds(shape: Shapes[K]): Bounds
  hitTest(shape: Shapes[K], test: number[]): boolean
  rotate(shape: Shapes[K]): Shapes[K]
  translate(shape: Shapes[K]): Shapes[K]
  scale(shape: Shapes[K], scale: number): Shapes[K]
  stretch(shape: Shapes[K], scaleX: number, scaleY: number): Shapes[K]
}

/* ----------------------- Dot ---------------------- */

const DotUtils: BaseShapeUtils<ShapeType.Dot> = {
  getBounds(shape) {
    const {
      point: [cx, cy],
    } = shape

    return {
      minX: cx,
      maxX: cx + 4,
      minY: cy,
      maxY: cy + 4,
      width: 4,
      height: 4,
    }
  },

  hitTest(shape, test) {
    return vec.dist(shape.point, test) < 4
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* --------------------- Circle --------------------- */

const CircleUtils: BaseShapeUtils<ShapeType.Circle> = {
  getBounds(shape) {
    const {
      point: [cx, cy],
      radius,
    } = shape

    return {
      minX: cx,
      maxX: cx + radius * 2,
      minY: cy,
      maxY: cy + radius * 2,
      width: radius * 2,
      height: radius * 2,
    }
  },

  hitTest(shape, test) {
    return vec.dist(vec.addScalar(shape.point, shape.radius), test) < shape.radius
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* --------------------- Ellipse -------------------- */

const EllipseUtils: BaseShapeUtils<ShapeType.Ellipse> = {
  getBounds(shape) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* ---------------------- Line ---------------------- */

const LineUtils: BaseShapeUtils<ShapeType.Line> = {
  getBounds(shape) {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* ----------------------- Ray ---------------------- */

const RayUtils: BaseShapeUtils<ShapeType.Ray> = {
  getBounds(shape) {
    return {
      minX: Infinity,
      minY: Infinity,
      maxX: Infinity,
      maxY: Infinity,
      width: Infinity,
      height: Infinity,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* ------------------ Line Segment ------------------ */

const PolylineUtils: BaseShapeUtils<ShapeType.Polyline> = {
  getBounds(shape) {
    let minX = 0
    let minY = 0
    let maxX = 0
    let maxY = 0

    for (let [x, y] of shape.points) {
      minX = Math.min(x, minX)
      minY = Math.min(y, minY)
      maxX = Math.max(x, maxX)
      maxY = Math.max(y, maxY)
    }

    return {
      minX: minX + shape.point[0],
      minY: minY + shape.point[1],
      maxX: maxX + shape.point[0],
      maxY: maxY + shape.point[1],
      width: maxX - minX,
      height: maxY - minY,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

/* -------------------- Rectangle ------------------- */

const RectangleUtils: BaseShapeUtils<ShapeType.Rectangle> = {
  getBounds(shape) {
    const {
      point: [x, y],
      size: [width, height],
    } = shape

    return {
      minX: x,
      maxX: x + width,
      minY: y,
      maxY: y + height,
      width,
      height,
    }
  },

  hitTest(shape) {
    return true
  },

  rotate(shape) {
    return shape
  },

  translate(shape) {
    return shape
  },

  scale(shape, scale: number) {
    return shape
  },

  stretch(shape, scaleX: number, scaleY: number) {
    return shape
  },
}

const shapeUtils: { [K in ShapeType]: BaseShapeUtils<K> } = {
  [ShapeType.Dot]: DotUtils,
  [ShapeType.Circle]: CircleUtils,
  [ShapeType.Ellipse]: EllipseUtils,
  [ShapeType.Line]: LineUtils,
  [ShapeType.Ray]: RayUtils,
  [ShapeType.Polyline]: PolylineUtils,
  [ShapeType.Rectangle]: RectangleUtils,
}

export default shapeUtils