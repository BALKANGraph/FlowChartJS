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
    static SEPARATOR: string;
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
    svg(): string;
    exportSVG(): void;

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
    ripple(shape: FlowChart.Shape, color: string, callback?: () => void): void;
    makeShapeVisible(shape: FlowChart.Shape, callback?: () => void): void;
    onInit(listener: (this: FlowChart, args: {}) => void): FlowChart;
    onChanged(listener: (this: FlowChart, args: {}) => void): FlowChart;
    onUndoRedoChanged(listener: (this: FlowChart, args: {}) => void): FlowChart;
    onSelectedShapesChanged(listener: (this: FlowChart, args: {}) => void): FlowChart;    
    onSelectedPortChanged(listener: (this: FlowChart, args: {}) => void): FlowChart;    
    onShortcut(listener: (this: FlowChart, args: {
        name: string,
        event: Event
    }) => void): FlowChart;    
    onMenuItemClick(listener: (this: FlowChart, args: {
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
        readonly id?: string | number;
        templateId?: string
        points?: Array<Point>; 
        from: number | string;
        to: number | string;
        readonly fromPort?: number | string;
        readonly toPort?: number | string;    
        element?: HTMLElement;    
    }
}declare module FlowChart {
    interface LinkCollection {
        constructor(chart: FlowChart);    


        readonly length: number;
        readonly last: FlowChart.Link;
        readonly first: FlowChart.Link;

        addRange(links: Array<FlowChart.Link>): Array<FlowChart.Link>;
        add(link: FlowChart.Link): FlowChart.Link;        
        get(from: string, to: string, fromPort: string, toPort: string): FlowChart.Link;
        getById(linkId: string): FlowChart.Link;        
        getByShape(shape: FlowChart.Shape): FlowChart.Link;
        clear(): void;
        removeRange(links: Array<FlowChart.Link>): void;
        remove(link: FlowChart.Link): void;
    }
}declare module FlowChart {
    interface Options {
        mode?: string;
        startPosition?: FlowChart.startPosition;
        startScale?: number;
        interactive?: boolean;
        loadFromSession?: boolean;
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
  
        getElement(nodeId: string | number): HTMLElement;
        getById(shapeIdPortId: string): FlowChart.Port;
        getByPosition(shape: FlowChart.Shape, position: FlowChart.position): Array<FlowChart.Port>;
        getByOpositeOfPosition(shapeId: string | number, position: FlowChart.position): Array<FlowChart.Port>;
        getByLink(link: FlowChart.link) : {
            fromShape: FlowChart.Shape,
            toShape: FlowChart.Shape,
            fromPort: FlowChart.Port,
            toPort: FlowChart.Port
        };
        get(shapeId: string | number, portId: string): FlowChart.Port;
    }
}declare module FlowChart {
    interface SelectedShapeCollection{

        constructor(chart: FlowChart);  



        readonly last: FlowChart.Shape;
        readonly first: FlowChart.Shape;
        readonly nodes: Array<FlowChart.Node>;
        readonly labels: Array<FlowChart.Label>;
        readonly length: number;
        
        add(shape: FlowChart.Shape): FlowChart.Shape;        
        addRange(shapes: Array<FlowChart.Shape>): Array<FlowChart.Shape>; 
        remove(shape: FlowChart.Shape): void;
        clear(): void;

 
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
        fill?: string;
        stroke?:string;
        strokeWidth?:number;
        minWidth?:number;
        minHeight?:number;
        resizable?:boolean;
        ports?: [name: string, FlowChart.Point];
        [name: string]: any;
    }

    interface Label extends Shape{
        readonly id?: string | number;
        from: number | string;
        to: number | string;
        readonly fromPort?: number | string;
        readonly toPort?: number | string;
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

        readonly top: number;  
        readonly bottom: number;  
        readonly left: number;  
        readonly right: number;  

                /**
         * Gets the last Shape from the collection
         */
        readonly last: FlowChart.Shape;

        /**
         * Gets the first Shape from the collection
         */
        readonly first: FlowChart.Shape;     

        /**
         * Gets the number of shapes in the collection.
         */
        readonly length: number;
        /**
         * Adds the Shapes of the specified collection to the end of the collection.
         * @param shapes The collection whose elements should be added to the end of the ShapeCollection. The collection itself cannot be null, but it can contain elements that are null.
         */
        addRange(shapes: Array<FlowChart.Shape>, makeVisible: boolean): Array<FlowChart.Shape>;         
        /**
         * Adds an Shape to the end of the collection.
         * @param shape The shape to be added to the end of the collection. The value cannot be null.
         */
        add(shape: FlowChart.Shape, makeVisible: boolean): FlowChart.Shape;    
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
        ports?: {[key: string]: {x: number, y: number}};
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
        displayColorPalette: boolean;
        constructor(chart: FlowChart)
        init(): void;
        addItem(options: {
            name: string,
            icon: string,
            title: string
        }): FlowChart.UIMenuBar;
        removeItem(name: string): FlowChart.UIMenuBar;
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