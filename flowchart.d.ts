
declare class FlowChart {
    element: HTMLElement;
    svgElement: SVGElement;
    contentElement: HTMLElement;
    readonly nodes: FlowChart.ShapeCollection;   
    readonly labels: FlowChart.ShapeCollection;  
    readonly links: FlowChart.LinkCollection;        
    readonly ports: FlowChart.PortCollection;   
    readonly selectedNodes: FlowChart.SelectedShapeCollection;     
    readonly selectedLabels: FlowChart.SelectedShapeCollection;   
    selectedPortShape: FlowChart.Shape;     
    selectedPort: FlowChart.Port;      
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
}
declare module FlowChart {
    class Port{
        shape: FlowChart.Shape;
        x: number;
        y: number;
        position : FlowChart.position;
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
}export default FlowChart