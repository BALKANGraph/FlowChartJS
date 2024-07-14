# Flow Chart JS
Create flow charts in seconds with BALKAN FlowChartJS.



![Flow Chart JS](https://balkan.app/Content/Img/fc.png)

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
    <div id="chart"></div>
    <script> 
//JavaScript
var chart = new FlowChart(document.getElementById("chart"));

chart.load({
        nodes: [
            { id: 1, templateId: 'startEnd', x: 0, y: 0, text: 'Start'},
            { id: 2, templateId: 'decision', x: 0, y: 200, text: "Question?" },
            { id: 3, templateId: 'inOut', x: 300, y: 200, text: 'Step'},

        ],
        links: [
            { from: 1, to: 2, toPort: 'top' },
            { from: 2, to: 3 },
        ],
        labels: [
            { from: 2, to: 3, position: 50, text: 'Yes' },
        ]
    }
);

chart.onChanged(function(){
    var data = chart.json();
    //post data to server to keep changes
});


chart.nodes.get(2).selected = true;


    </script>
```

## 1 click to talk 2 us

[![FlowChart](https://balkan.app/content/img/phone-icon4.png)](https://webcall.me/BALKANGraph)


