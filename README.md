
# ![FlowChart JS](https://balkangraph.com/content/img/icon-FlowChartJS.png) FlowChart JS
Create flowcharts in seconds with BALKAN FlowChart JS.



![FlowChart JS](https://balkan.app/Content/Img/fc.png)

## [Demos](https://balkan.app/FlowChartJS/Demos)  &nbsp;&nbsp;&nbsp;&nbsp;  [Docs](https://balkan.app/FlowChartJS/Docs)  &nbsp;&nbsp;&nbsp;&nbsp;  [Download](https://balkan.app/FlowChartJS/Download) &nbsp;&nbsp;&nbsp;&nbsp;  [Support](https://balkan.app/FlowChartJS/Support)

## Features
- Supports both local data and remote data (JSON)

## Installation
Option 1 - [standalone build](https://balkan.app/FlowChartJS/Docs/GettingStarted)

Option 2 - NPM
```
npm i @balkangraph/flowchart.js
```


## Usage
```
<script src="https://balkan.app/js/flowchart.js"></script>
<style>
    html, body, #chart{
        width: 100%;
        height: 100%;
        margin: 0;
    }
</style>
<div id="chart"></div>
<script>
let chart = new FlowChart('#chart');
chart.onChanged(function(){
    var data = chart.json();
    //post data to server
});
chart.load({
        nodes: [
            { id: 1, templateId: 'process', x: 400, y: 150, fill: "#FFCA28" },
            { id: 2, templateId: 'decision', x: 400, y: 350, fill: "#F57C00" },
            { id: 3, templateId: 'process', x: 700, y: 350 }
        ],
        links: [
            { from: 1, to: 2 },
            { from: 2, to: 3 }
        ]
    }
); 
</script> 
```

## 1 click to talk 2 us

[![FlowChart](https://balkan.app/content/img/phone-icon4.png)](https://webcall.me/BALKANGraph)


