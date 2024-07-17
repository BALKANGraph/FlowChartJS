declare module FlowChart {
    interface Editor {
        exit(): void;
        editNextField(): void;
        removeField(shapeId: string | number, field: string): void;
        addField(shapeId: string | number, field: string): void;
        edit(nodeId: string | number, fieldName: string): void;
    }
}
declare module FlowChart {
    enum anim {
        inPow,
        outPow,
        inOutPow,
        inSin,
        outSin,
        inOutSin,
        inExp,
        outExp,
        inOutExp,
        inCirc,
        outCirc,
        inOutCirc,
        rebound,
        inBack,
        outBack,
        inOutBack,
        impulse,
        expPulse
    }
    
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
    uiShapeBar: FlowChart.UIShapeBar;
    uiMenuBar: FlowChart.UIMenuBar;
    uiStatusBar: FlowChart.UIStatusBar;
    shapeContextMenu: FlowChart.UIMenu;
    editor: FlowChart.Editor;
    readonly nodes: FlowChart.NodeCollection;   
    readonly labels: FlowChart.LabelCollection;   
    readonly links: FlowChart.LinkCollection;        
    readonly ports: FlowChart.PortCollection;  



    selectedShapes: FlowChart.SelectedShapeCollection; 
    viewBox: Array<number>; 
    defs: string; 
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
        rounded: FlowChart.LinkTemplate;
        [name: string]: FlowChart.LinkTemplate;
    }

    static shapeTemplates: {
        base: FlowChart.ShapeTemplate;
        startEnd: FlowChart.ShapeTemplate;
        process: FlowChart.ShapeTemplate;
        document : FlowChart.ShapeTemplate;
        decision: FlowChart.ShapeTemplate;
        inOut: FlowChart.ShapeTemplate;
        manualInput: FlowChart.ShapeTemplate;
        preparation: FlowChart.ShapeTemplate;
        connector: FlowChart.ShapeTemplate;
        or: FlowChart.ShapeTemplate;
        data: FlowChart.ShapeTemplate;
        delay: FlowChart.ShapeTemplate;
        display: FlowChart.ShapeTemplate;
        manualLoop: FlowChart.ShapeTemplate;
        loopLimit: FlowChart.ShapeTemplate;
        label: FlowChart.ShapeTemplate;        
        [name: string]: FlowChart.ShapeTemplate;
    }

    constructor(element: HTMLElement | string, options?: FlowChart.Options);

    load(data: {
        nodes?: Array<FlowChart.Shape>,
        labels?: Array<FlowChart.Shape>,
        links?: Array<FlowChart.Link>,
    }): void;

    json(options?: Array<string>): JSON;
    text(options?: Array<string>): string;
    svg(): string;
    exportSVG(): void;
    addNodeWithLink(fromPort: FlowChart.Port, templateId: string, callback?: (node: FlowChart.Node, link: FlowChart.Link) => void): FlowChart.Node;
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
    rippleShape(shape: FlowChart.Shape, color: string, reverse: boolean, callback?: () => void): void;
    makeShapeVisible(shape: FlowChart.Shape, callback?: () => void): void;
    animateShape(shape: FlowChart.Shape, callback?: () => void): void;
    onInit(listener: (this: FlowChart, args: {}) => void): FlowChart;
    onChanged(listener: (this: FlowChart, args: {
        properties?: Array<string>
    }) => void): FlowChart;
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
    interface Options {
        mode?: string;
        startPosition?: FlowChart.startPosition;
        startScale?: number;
        interactive?: boolean;
        loadFromSession?: boolean;
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


        readonly length: number;
  
        getElement(nodeId: string | number): HTMLElement;
        //getById(shapeIdPortId: string): FlowChart.Port;
        getByPosition(shape: FlowChart.Shape, position: FlowChart.position): Array<FlowChart.Port>;
        getByOpositeOfPosition(shapeId: string | number, position: FlowChart.position): Array<FlowChart.Port>;
        getByLink(link: FlowChart.Link) : {
            fromShape: FlowChart.Shape,
            toShape: FlowChart.Shape,
            fromPort: FlowChart.Port,
            toPort: FlowChart.Port
        };
        get(shapeId: string | number, portId: string): FlowChart.Port;
    }
}declare module FlowChart {
    interface SelectedShapeCollection{

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
    interface Point{
        x: number;
        y: number;
    }

    interface Shape{
        readonly id?: string | number;
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
        stroke?:string;
        strokeWidth?:number;
        [name: string]: any;
    }

    interface Label extends Shape{
        minWidth?:number;
        minHeight?:number;
        resizable?:boolean;
        ports?: {[key: string]: {x: number, y: number}};
        fill?: string;
        from: number | string;
        to: number | string;
        fromPort?: number | string;
        toPort?: number | string;
        position: number;
    }
    
    interface Node extends Shape{     
        minWidth?:number;
        minHeight?:number;
        resizable?:boolean;
        ports?: {[key: string]: {x: number, y: number}};  
        fill?: string; 
        id: string | number;
        x: number;
        y: number;  
    }

        
    
    interface Link extends Shape{        
        readonly width?: number;
        readonly height?: number;  
        templateId?: string
        points?: Array<Point>; 
        from: number | string;
        to: number | string;
        fromPort?: number | string;
        toPort?: number | string;    
    }
}declare module FlowChart {
    interface ShapeCollection {
        clear(): void;        
        remove(shape: FlowChart.Shape): void;
        removeRange(shapes: Array<FlowChart.Shape>): void;
        contains(shapeId: string | number): boolean;      
        [index: number]: FlowChart.Shape;
    }

    interface NodeCollection  extends ShapeCollection{
        readonly last: FlowChart.Node;
        readonly first: FlowChart.Node;     
        readonly top: number;  
        readonly bottom: number;  
        readonly left: number;  
        readonly right: number;  
        readonly length: number;
        addRange(nodes: Array<FlowChart.Node>): Array<FlowChart.Node>;         
        add(node: FlowChart.Node): FlowChart.Node;    
        get(nodeId: string | number): FlowChart.Node; 
    }

    interface LabelCollection extends ShapeCollection{
        readonly last: FlowChart.Label;
        readonly first: FlowChart.Label;     
        addRange(labels: Array<FlowChart.Label>): Array<FlowChart.Label>;         
        add(label: FlowChart.Label): FlowChart.Label;    
        get(labelId: string | number): FlowChart.Label; 
    }

    interface LinkCollection  extends ShapeCollection{
        readonly last: FlowChart.Link;
        readonly first: FlowChart.Link;
        addRange(links: Array<FlowChart.Link>): Array<FlowChart.Link>;
        add(link: FlowChart.Link): FlowChart.Link;        
        get(from: string, to: string, fromPort: string, toPort: string): FlowChart.Link;
        getByShape(shape: FlowChart.Shape): FlowChart.Link;
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
        ports(link: FlowChart.Shape) : {[key: string]: {x: number, y: number}};
        offset (shape: FlowChart.Shape) : {x: number, y: number};
        width?: number | string;
        height?: number| string;
        minWidth?: number;
        minHeight?: number;
        fill?: string;
        stroke?: string;            
        strokeWidth?: number;     
        displayInShapeBar?: boolean;
        displayInPortShapeBar?: boolean;
        resizable?: boolean;
    }

    interface LinkTemplate{
        path(link: FlowChart.Link): string;
        svg(link: FlowChart.Link): string;    
        stroke?: string;
        strokeWidth?: number;        
        markerStart?: string;
        markerEnd?: string;
        markerMid?: string;
    }
}declare module FlowChart {
    interface UIMenu {
        init(): void;
        hide(): void;
        show(x: number, y: number, nodeId: string | number, menu: any): void;
    }
}declare module FlowChart {
    interface UIMenuBar {
        init(): void;
        addItem(options: {
            name: string,
            icon: string,
            title: string
        }): FlowChart.UIMenuBar;
        removeItem(name: string): FlowChart.UIMenuBar;
        show(): void;
        hide(): void;
        showColorPalette(): void;
        hideColorPalette(): void;
    }
}declare module FlowChart {
    interface UIShapeBar {
        readonly element: HTMLElement;
        init(): void;
        show(): void;
        hide(): void;
    }
}declare module FlowChart {
    interface UIStatusBar {
        content: string;
        init(): void;
        show(): void;
        hide(): void;
    }
}export default FlowChart