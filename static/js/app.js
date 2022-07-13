//1) Use the D3 library to read in samples.json from the URL
function buildCharts(patientID) {
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  d3.json(url).then((samplesData => {
    var samples = samplesData.samples
    var metadata = samplesData.metadata
    var filmetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]
    var filSample = samples.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]
    var sample_values = filSample.sample_values
    var otu_ids = filSample.otu_ids
    var otu_labels = filSample.otu_labels

  //2) Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    var bartracedata = [{
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h',
      marker: {
        color: 'rgb(120, 205, 10)'
      },
    }]
    var layout = {
      title: "Top 10 OTU",
    };
    Plotly.newPlot('barchartplot', bartracedata, layout)


//3) Create a bubble chart that displays each sample.
    var bubbletracedata = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: 'Earth'
      }
    }];
    var bubblelayout = {
      xaxis: { title: "OTU IDs" }
    };
    Plotly.newPlot('bubbleplot', bubbletracedata, bubblelayout)


//Advanced Challenge Assignment (Optional)
    var washFreq = filmetadata.wfreq
    var gaugetracedata = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          bar: {color: 'white'},
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 1], color: 'rgb(143, 188, 143)' },
            { range: [1, 2], color: 'rgb(152, 251, 152)' },
            { range: [2, 3], color: 'rgb(144, 238, 144)' },
            { range: [3, 4], color: 'rgb(173, 255, 47)' },
            { range: [4, 5], color: 'rgb(0, 255, 0)' },
            { range: [5, 6], color: 'rgb(0, 250, 0)' },
            { range: [6, 7], color: 'rgb(50, 205, 50)' },
            { range: [7, 8], color: 'rgb(34, 139, 34)' },
            { range: [8, 9], color: 'rgb(0, 100, 0)' },
          ],
        }
      }
    ];
    var gaugelayout = { width: 700, height: 400, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gaugeplot', gaugetracedata, gaugelayout);

  }))
}

//4) Display the sample metadata, i.e., an individual's demographic information.
function demography(patientID) {

  var demobox = d3.select("#sample-metadata");
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  d3.json(url).then(samplesData => {
      var metadata = samplesData.metadata
      var filmetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]

      console.log(filmetadata)
      Object.entries(filmetadata).forEach(([key, value]) => {
          demobox.append("p").text(`${key}: ${value}`)
      })
  })
}

function optionChanged(patientID) {
  console.log(patientID);
  buildCharts(patientID);
  demography(patientID);
}

//5) Display each key-value pair from the metadata JSON object somewhere on the page.
function Dashboard() {
  var dropdown = d3.select("#selDataset")
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  
  d3.json(url).then(samplesData => {
      var patientIDs = samplesData.names;
      patientIDs.forEach(patientID => {
          dropdown.append("option").text(patientID).property("value", patientID)
      })
      buildCharts(patientIDs[0]);
      demography(patientIDs[0]);
  });
};

Dashboard();