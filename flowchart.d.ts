declare module FlowChart {
    interface Editor {
        constructor(chart: FlowChart);
        exit(): void;
        editNextField(): void;
        removeField(shapeId: string | number, field: string): void;
        addField(shapeId: string | number, field: string): void;
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
        fitHeight,
        fitWidth,
        fit,
        centerTop,
        centerBottom,
        centerLeft,
        centerRight
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
    shapeContextMenu: FlowChart.UIMenu;
    editor: FlowChart.Editor;
    readonly nodes: FlowChart.ShapeCollection;   
    readonly labels: FlowChart.ShapeCollection;   
    readonly links: FlowChart.LinkCollection;        
    readonly ports: FlowChart.PortCollection;  
    selectedShapes: FlowChart.SelectedShapeCollection; 
    viewBox: Array<number>; 
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
    static shortcuts: { [key: string]: FlowChart.shortcut }
    static isNEU(val: any): boolean;
    static isMobile(): boolean;
    static animate (elements: Array<HTMLElement | SVGElement>, attrStart: Object, attrEnd: Object, duration: number, func: FlowChart.anim, callback?: Function, tick?: boolean): void;
    static linkTemplates: {
        base: FlowChart.LinkTemplate;
        [name: string]: FlowChart.LinkTemplate;
    }

    static shapeTemplates: {
        base: FlowChart.ShapeTemplate;
        startend: FlowChart.ShapeTemplate;
        rectangle: FlowChart.ShapeTemplate;
        diamond: FlowChart.ShapeTemplate;
        label: FlowChart.ShapeTemplate;
        [name: string]: FlowChart.ShapeTemplate;
    }

    constructor(element: HTMLElement | string, options?: FlowChart.Options);

    load(data: {
        nodes: Array<FlowChart.Shape>,
        labels: Array<FlowChart.Shape>,
        links: Array<FlowChart.Link>,
    }): void;

    json(options?: Array<string>): JSON;
    text(options?: Array<string>): string;
    getShape(id: string | number): FlowChart.Shape;
    generateId(): string;
    undo(): void;
    redo(): void;
    undoStepsCount(): number;
    redoStepsCount(): number;
    clearRedo(): void;
    clearUndo(): void;
    alignShapes(shapes: Array<FlowChart.Shape>, alignPosition: FlowChart.position, alignToTheFirstNode?: boolean): void;
    reposition(position?: FlowChart.startPosition) : void;
    onInit(listener: (this: FlowChart, args: {}) => void): FlowChart;
    onChanged(listener: (this: FlowChart, args: {}) => void): FlowChart;
    onUndoRedoChanged(listener: (this: FlowChart, args: {}) => void): FlowChart;
    onSelectedShapesChanged(listener: (this: FlowChart, args: {}) => void): FlowChart;    
    onSelectedPortChanged(listener: (this: FlowChart, args: {}) => void): FlowChart;    
    onShortcut(listener: (this: FlowChart, args: {
        name: string,
        event: Event
    }) => void): FlowChart;    
}


declare module FlowChart {
    
    interface Point{
        x: number;
        y: number;
    }

    interface Link{
        templateId?: string
        points?: Array<Point>;
        readonly fromPortId?: string | number;
        readonly fromNodeId?: string | number;
        readonly toPortId?: string | number;
        readonly toNodeId?: string | number;  
        from: string;      
        to: string;      
        element?: HTMLElement;    
    }
}declare module FlowChart {
    class LinkCollection implements Iterable<FlowChart.Shape>{
        constructor(chart: FlowChart);    
        [Symbol.iterator](): Iterator<FlowChart.Shape>;


        readonly length: number;

        addRange(links: Array<FlowChart.Link>): Array<FlowChart.Link>;
        add(link: FlowChart.Link): FlowChart.Link;        
        get(from: string , to: string ): FlowChart.Link;
        getByShape(shape: FlowChart.Shape): FlowChart.Link;
        clear(): void;
        removeRange(links: Array<FlowChart.Link>): void;
        remove(link: FlowChart.Link): void;
        last(): FlowChart.Link;
        first(): FlowChart.Link;
    }
}declare module FlowChart {
    interface Options {
        mode?: string;
        startPosition?: FlowChart.startPosition;
        startScale?: number;
        loadFromSession?: boolean;
        readOnly?: boolean;
        shapeBar?: boolean;
        menuBar?: boolean;
        statusBar?: boolean;
        colors?: Array<string>;
        scaleMax?: number;
        scaleMin?: number;
        nodeSeparation?: number;
        zoom?: {
            speed: number;
            smooth: number
        }
    }
}
declare module FlowChart {
    interface Port{
        shape: FlowChart.Shape;
        x: number;
        y: number;
        position : FlowChart.position;
    }
}declare module FlowChart {
    interface PortCollection {
        constructor(chart: FlowChart);    


        readonly length: number;
       
        getById(id: string): FlowChart.Port;
        getElement(nodeId: string | number): HTMLElement;
        getByPosition(node: FlowChart.Shape, position: FlowChart.position): Array<FlowChart.Port>;
        getByOpositeOfPosition(nodeId: string | number, position: FlowChart.position): Array<FlowChart.Port>;
        get(shapeId: string | number, portId: string): FlowChart.Port;
    }
}declare module FlowChart {
    interface SelectedShapeCollection{

        constructor(chart: FlowChart);  




        readonly length: number;
        
        add(shape: FlowChart.Shape): FlowChart.Shape;        
        addRange(shapes: Array<FlowChart.Shape>): Array<FlowChart.Shape>; 
        remove(shape: FlowChart.Shape): void;
        clear(): void;
        last(): FlowChart.Shape;
        first(): FlowChart.Shape;
        nodes(): Array<FlowChart.Node>;
        labels(): Array<FlowChart.Label>;
        contains(shapeId: string | number): boolean;
        get(shapeId: string | number): FlowChart.Shape;
        selectNodeRight(deselectAll: boolean): void;
        selectNodeLeft(deselectAll: boolean): void;
        selectNodeAbove(deselectAll: boolean): void;
        selectNodeBelow(deselectAll: boolean): void;
    }
}
declare module FlowChart {
    interface Shape{
        templateId?: string;
        readonly left?: number;
        readonly right?: number;
        readonly top?: number;
        readonly bottom?: number;      
        width?: number;        
        height?: number;        
        type?: string;        
        selected?: boolean;        
        element?: HTMLElement;
        [name: string]: any;
    }

    interface Label extends Shape{
        from: string;
        to: string;
        position: number;
    }
    
    interface Node extends Shape{        
        id: string | number;
        x: number;
        y: number;  
    }
}declare module FlowChart {
    interface ShapeCollection{

        constructor(chart: FlowChart);  

        /**
         * Gets the number of shapes in the collection.
         */
        readonly length: number;
        /**
         * Adds the Shapes of the specified collection to the end of the collection.
         * @param shapes The collection whose elements should be added to the end of the ShapeCollection. The collection itself cannot be null, but it can contain elements that are null.
         */
        addRange(shapes: Array<FlowChart.Shape>): Array<FlowChart.Shape>;         
        /**
         * Adds an Shape to the end of the collection.
         * @param shape The shape to be added to the end of the collection. The value cannot be null.
         */
        add(shape: FlowChart.Shape): FlowChart.Shape;    
        /**
         * Gets Shape by its id.
         * @param shapeId Shape identification number
         */    
        get(shapeId: string | number): FlowChart.Shape; 
        /**
         * Removes all Shapes from the collection.
         */               
        clear(): void;        
        /**
         * Removes Shape from the collection.
         * @param shape The Shape to remove from the collection. The value cannot be null.
         */
        remove(shape: FlowChart.Shape): void;
        /**
         * Removes a range of Shapes from the collection.
         * @param shapes Shapes to be removed from the collection. 
         */
        removeRange(shapes: Array<FlowChart.Shape>): void;
        /**
         * Determines whether an Shape ith shapeId is in the collection.
         * @param shapeId The Shape id to locate in the collection. The value cannot be null.
         */
        contains(shapeId: string | number): boolean;
        /**
         * Gets the last Shape from the collection
         */
        last(): FlowChart.Shape;
        /**
         * Gets the first Shape from the collection
         */
        first(): FlowChart.Shape;     
    }
}
declare module FlowChart {
    interface shortcut{
        keysPressed: Array<string>;       
        mouseActions: Array<string>;       
        activeComponentType: string;
    }
}declare module FlowChart {
    interface ShapeTemplate{
        displayName: string;
        svg(link: FlowChart.Shape) : string;
        html(link: FlowChart.Shape) : string;
        ports?: [name: string, FlowChart.Point];
        width?: number;
        height?: number;
        minWidth?: number;
        minHeight?: number;
        fill?: string;
        stroke?: string;            
        strokeWidth?: number;            
        widthFitContent?: boolean;
        heightFitContent?: boolean;
        displayInShapeBar?: boolean;
        displayInPortShapeBar?: boolean;
        resizable?: boolean;
    }

    interface LinkTemplate{
        svg(link: FlowChart.Link) : string;
        stroke?: string;
        strokeWidth?: number;
    }


}declare module FlowChart {
    interface UIMenu {
        constructor(chart: FlowChart);
        init(): void;
        hide(): void;
        show(x: number, y: number, nodeId: string | number, menu: any): void;
    }
}declare module FlowChart {
    interface UIMenuBar {
        constructor(chart: FlowChart)
        init(): void;
        html(): string;
    }
}declare module FlowChart {
    interface UIStatusBar {
        constructor(chart: FlowChart);
        init(): void;
        html(): string;
    }
}declare module FlowChart {
    interface UIShapeBar {
        constructor(chart: FlowChart);
        init(): void;
        html(): string;
    }
}export default FlowChart