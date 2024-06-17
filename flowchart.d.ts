declare module FlowChart {
    class Editor {
        constructor(chart: FlowChart);
        exit(): void;
        editNextField(): void;
        edit(nodeId: string | number, fieldName: string): void;
    }
}
declare module FlowChart {
    enum position{
        top,
        bottom,
        left,
        right,
        topLeft,
        topRight,
        bottomLeft, 
        bottomRight
    }

    enum align {
        top,
        bottom,
        left,
        right,
        horizontally,
        vertically
    }

    enum move{
        up,
        down,
        left,
        right
    }

    enum direction{
        vertical,
        horizontal
    }
    
    enum startPosition {
        none,
        meetHeight,
        meetWidth,
        meetBoundary,
        centerTop,
        centerBottom,
        centerLeft,
        centerRight,
        center
    }
}

declare class FlowChart {
    options: FlowChart.Options;
    element: HTMLElement;
    svgElement: SVGElement;
    contentElement: HTMLElement;
    uiShapeBar: FlowChart.UIShapeBar;
    uiMenuBar: FlowChart.UIMenuBar;
    uiStatusBar: FlowChart.UIStatusBar;
    uiShapeContextMenu: FlowChart.UIMenu;
    editor: FlowChart.Editor;
    readonly nodes: FlowChart.ShapeCollection;   
    readonly labels: FlowChart.ShapeCollection;  
    readonly links: FlowChart.LinkCollection;        
    readonly ports: FlowChart.PortCollection;   
    readonly selectedNodes: FlowChart.SelectedShapeCollection;     
    readonly selectedLabels: FlowChart.SelectedShapeCollection;   
    selectedPortShape: FlowChart.Shape;     
    selectedPort: FlowChart.Port;      
    scale: number;      
    readonly VERSION: string;
    static MAGNET_MOVE_PIXELS: number;
    static MAGNET_RESIZE_PIXELS: number;
    static MAGNET_WIN_PIXELS: number;
    static MAGNET_PORT: number;
    static LINK_DITSNANCE: number;
    static LINK_ROUNDED_CORENERS: number;
    static MOVE_NODE_STEP: number;
    static SCALE_FACTOR: number;
    static DEFAULT_LINK_SHAPE_ID: string;
    static DEFAULT_LABEL_SHAPE_ID: string;
    static CHANGED_TIMEOUT: number;
    static PADDING: number;
    static isNEU(val: any): boolean;
    static isMobile(): boolean;
    static animate (elements: Array<HTMLElement | SVGElement>, attrStart: Object, attrEnd: Object, duration: number, func: FlowChart.anim, callback?: Function, tick?: boolean): void;

    constructor(element: HTMLElement | string, options?: FlowChart.Options);

    load(data: {
        nodes: Array<FlowChart.Shape>,
        labels: Array<FlowChart.Shape>,
        links: Array<FlowChart.Link>,
    }): void;

    json(): JSON;
    text(): string;
    getShape(id: string | number): FlowChart.Shape;
    generateId(): string;
    undo(): void;
    redo(): void;
    undoStepsCount(): number;
    redoStepsCount(): number;
    clearRedo(): void;
    clearUndo(): void;
    alignShapes(shapes: Array<FlowChart.Shape>, alignPosition: FlowChart.position, alignToTheFirstNode?: boolean): void;
}


declare module FlowChart {
    
    class Point{
        x: number;
        y: number;
    }

    class Link{
        templateId: string
        points: Array<Point>;
        fromPortId: string | number;
        fromNodeId: string | number;
        toPortId: string | number;
        toNodeId: string | number;  
        from: string;      
        to: string;      
        readonly length : number;
    }
}declare module FlowChart {
    class LinkCollection implements Iterable<FlowChart.Link>{
        constructor(chart: FlowChart);    

        readonly length: number;

        [Symbol.iterator](): Iterator<FlowChart.Link>;
        
        add(linkOrLinks: FlowChart.Link | Array<FlowChart.Link>): void;
        get(from: string | number, to: string | number): FlowChart.Link;
        getByShape(shape: FlowChart.Shape): FlowChart.Link;
        getElement(link: FlowChart.Link): SVGElement;
        remove(shapeIdOrLinkOrLinks: string | number | FlowChart.Link | Array<FlowChart.Link>): void;
    }
}declare module FlowChart {
    class Options {
        mode: string;
        startPosition: FlowChart.startPosition;
        startScale: number;
        readOnly: boolean;
        shapeBar: boolean;
        menuBar: boolean;
        statusBar: boolean;
        colors: Array<string>;
        scaleMax: number;
        scaleMin: number;
        nodeSeparation: number;
        zoom: {
            speed: number;
            smooth: number
        }
    }
}
declare module FlowChart {
    class Port{
        shape: FlowChart.Shape;
        x: number;
        y: number;
        position : FlowChart.position;
    }
}declare module FlowChart {
    class PortCollection implements Iterable<FlowChart.Port>{
        constructor(chart: FlowChart);    

        [Symbol.iterator](): Iterator<FlowChart.Port>;

        readonly length: number;
       
        getById(id: string): FlowChart.Port;
        getElement(nodeId: string | number): HTMLElement;
        getByPosition(node: FlowChart.Shape, position: FlowChart.position): Array<FlowChart.Port>;
        getByOpositeOfPosition(nodeId: string | number, position: FlowChart.position): Array<FlowChart.Port>;
        get(shapeId: string | number, portId: string): FlowChart.Port;
    }
}declare module FlowChart {
    class SelectedShapeCollection implements Iterable<FlowChart.Shape>{
        constructor(chart: FlowChart);    

        [Symbol.iterator](): Iterator<FlowChart.Shape>;

        readonly length: number;
        
        add(shapeOrShapes: FlowChart.Shape | Array<FlowChart.Shape>): void;
        remove(shapeOrShapes: FlowChart.Shape | Array<FlowChart.Shape>): void;
        clear(): void;
        last(): FlowChart.Shape;
        first(): FlowChart.Shape;
        contains(shape: FlowChart.Shape): boolean;
        html(shape : FlowChart.Shape, scale : number) : string;
    }
}
declare module FlowChart {
    class Shape{
        id: string | number;
        templateId: string;
        readonly left: number;
        readonly right: number;
        readonly top: number;
        readonly bottom: number;
        x: number;
        y: number;        
        width: number;        
        height: number;        
    }
}declare module FlowChart {
    class ShapeCollection implements Iterable<FlowChart.Shape>{
        constructor(chart: FlowChart);    

        [Symbol.iterator](): Iterator<FlowChart.Shape>;

        readonly length: number;
        
        add(shapeOrShapes: FlowChart.Shape | Array<FlowChart.Shape>): void;
        addField(shapeId: string | number, field: string): void;
        removeField(shapeId: string | number, field: string): void;
        get(shapeId: string | number): FlowChart.Shape;
        getElement(shapeId: string | number): SVGElement;
        remove(shapeOrShapes: FlowChart.Shape | Array<FlowChart.Shape>): void;
        has(shapeId: string | number): boolean;
    }
}
declare module FlowChart {
    class Shortcut{
        keysPressed: Array<string>;       
        mouseActions: Array<string>;       
        activeComponentType: string;
    }
}declare module FlowChart {
    class UIMenu {
        constructor(chart: FlowChart);
        init(): void;
        hide(): void;
        show(x: number, y: number, nodeId: string | number, menu: any): void;
    }
}declare module FlowChart {
    class UIMenuBar {
        constructor(chart: FlowChart)
        init(): void;
        html(): string;
    }
}declare module FlowChart {
    class UIStatusBar {
        constructor(chart: FlowChart);
        init(): void;
        html(): string;
    }
}declare module FlowChart {
    class UIShapeBar {
        constructor(chart: FlowChart);
        init(): void;
        html(): string;
    }
}export default FlowChart