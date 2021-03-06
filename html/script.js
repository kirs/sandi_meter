function plotDonut(value1, value2, label1, label2, id) {
  Morris.Donut({
    element: id,
    data: [
      {value: value1, label: label1},
      {value: value2, label: label2},
    ],
    colors: [
      '#0C0',
      '#F00'
    ]
  })
}

function plotLine(id, data, ykeys, labels) {
  Morris.Line({
    element: id,
    data: data,
    xkey: 'timestamp',
    ykeys: ykeys,
    labels: labels,
    lineColors: [
      '#0C0',
      '#F00'
    ],
    dateFormat: function (x) { return new Date(x).toDateString(); }
  });
}

function latestReport(data) {
  return data.sort(function(a, b){
    var keyA = new Date(a.timestamp),
    keyB = new Date(b.timestamp);

    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
  }).slice(-1)[0];
}

function dateHeader(last_report) {
  var d = Date(last_report.timestamp).toString().split(' ');
  return date_string = [d[3], d[1], d[2], d[4]].join(' ');
}

function setHeader(last_report) {
  $('.report_date').html("Latest report from " + dateHeader(latest_report));
}

$(document).ready(function(){
  latest_report = latestReport(data);

  setHeader();

  plotDonut(latest_report.r10, latest_report.r11, '1. Classes under 100 lines.', '1. Classes more than 100 lines.', 'pie1');
  plotDonut(latest_report.r20, latest_report.r21, '2. Methods under 5 lines.', '2. Methods more than 5 lines.', 'pie2');
  plotDonut(latest_report.r30, latest_report.r31, '3. Method calls with less than 4 params.', '3. Method calls with more than 4 params.', 'pie3');
  plotDonut(latest_report.r40, latest_report.r41, '4. Controllers with one instance variable.', '4. Controllers with many instance variables.', 'pie4');

  plotLine('plot1', data, ['r10', 'r11'], ['Classes under 100 lines', 'Classes more than 100 lines.']);
  plotLine('plot2', data, ['r20', 'r21'], ['Methods under 5 lines', 'Methods more than 5 lines']);
  plotLine('plot3', data, ['r30', 'r31'], ['Method calls with less than 4 params', 'Method calls with more than 4 params']);
  plotLine('plot4', data, ['r40', 'r41'], ['Controllers with one instance variable', 'Controllers with many instance variables']);
})
