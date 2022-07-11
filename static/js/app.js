//1) Use the D3 library to read in samples.json from the URL
function buildCharts(patientID) {
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

  d3.json(url).then((samplesData => {
    var data = samplesData.samples;
    var metadata = samplesData.metadata;
    var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id ==patientID)[0];
    var filteredSample = data.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0];
    var sample_values = filteredSample.sample_values;
    var otu_ids = filteredSample.otu_ids;
    var otu_labels = filteredSample.otu_labels;
  }
  ));
}

//2) Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//console.log(data[1]);
function buildPlot (dataone){
  let otuIds = dataone.otu_ids;
  let otuLabels = dataone.otu_labels;
  let sampleValues = dataone[0].sample_values;
    console.log(dataone);
  let slicedData = sampleValues.slice(0,10);
  let reversedData = slicedData.reverse();

    var traceData = [{
      x: reversedData.map(object => object.sampleValues),
      y: reversedData.map(object => object.otuIds),
      text: reversedData.map(object => object.otuLabels),
  
      type: "bar",
      orientation: "h",
      marker: {
        color: 'rgb(242, 113, 102)'
      },
    }]
    let layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values"},
      yaxis: { title: "Otu Ids"}
    };
    Plotly.newPlot("barchart", traceData, layout);
  }

//3) Create a bubble chart that displays each sample.
function buildPlot (dataone){
  let otuIds = dataone.otu_ids;
  let otuLabels = dataone.otu_labels;
  let sampleValues = dataone[0].sample_values;
  console.log(dataone);

  let slicedData = sampleValues.slice(0,10);
  let reversedData = slicedData.reverse();

    var tracedata2 = [{
      x: reversedData.map(object => object.otuIds),
      y: reversedData.map(object => object.sampleValues),
      text: reversedData.map(object => object.otuLabels),  
      mode: "markers",
      maker: {
        color: otuIds,
        size: sampleValues,
        colorscale: "Earth"
      }
    }]
    let layout2 = {
      yaxis: { title: "Otu Ids"}
    };
    Plotly.newPlot("bubble", tracedata2, layout2);
  }

//4) Display the sample metadata, i.e., an individual's demographic information.
function demography(patientID) {

  var demobox = d3.select("#sample-metadata");
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  d3.json(url).then(samplesData => {
      var metadata = samplesData.metadata
      var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]

      console.log(filteredMetadata)
      Object.entries(filteredMetadata).forEach(([key, value]) => {
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


