// TypeScript-specific features and constructs demo

// Type declarations
type Point = {
    x: number;
    y: number;
};

interface Shape {
    area(): number;
    perimeter(): number;
}

// Generic types and interfaces
interface Container<T> {
    value: T;
    getValue(): T;
}

// Type assertions and type guards
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

// Enums
enum Direction {
    North = 'NORTH',
    South = 'SOUTH',
    East = 'EAST',
    West = 'WEST'
}

// Class with access modifiers and generics
class Box<T> {
    private content: T;
    protected size: number;
    public readonly id: string;

    constructor(content: T, size: number) {
        this.content = content;
        this.size = size;
        this.id = Math.random().toString(36);
    }

    getContent(): T {
        return this.content;
    }
}

// Abstract class
abstract class Vehicle {
    protected speed: number;

    constructor(speed: number) {
        this.speed = speed;
    }

    abstract accelerate(): void;
}

// Class implementing interface
class Circle implements Shape {
    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    area(): number {
        return Math.PI * this.radius ** 2;
    }

    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

// Function with type parameters
function identity<T>(arg: T): T {
    return arg;
}

// Union and intersection types
type StringOrNumber = string | number;
type Point3D = Point & { z: number };

// Mapped types
type ReadonlyPoint = Readonly<Point>;
type PartialPoint = Partial<Point>;

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Decorators
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

// Class with decorators
class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

// Type predicates
function isPoint(obj: any): obj is Point {
    return 'x' in obj && 'y' in obj;
}

// Utility types
type PointKeys = keyof Point;
type PointValues = Point[PointKeys];

// Async/await with TypeScript
async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
}

// Type assertions
const value = 'hello' as const;
const point = { x: 10, y: 20 } as const;

// Namespace
namespace Geometry {
    export interface Point {
        x: number;
        y: number;
    }

    export function distance(p1: Point, p2: Point): number {
        return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    }
}

// Export statements
export {
    Point,
    Shape,
    Circle,
    Box,
    Direction,
    Geometry
};
