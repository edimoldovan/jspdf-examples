(function() {

  var page = {
    width: 446,
    height: 630,
    columnWidth: 170,
    footer: {
      textSize: 10,
      family: "arial",
      style: "normal",
      text: "Published by Local Times"
    }
  }
  
  function footer(pdf) {
    pdf.setTextColor(0)
      .setFontSize(page.footer.textSize)
      .setFont(page.footer.family, page.footer.style)
      .text(20, page.height - 5 + page.footer.textSize / 3, 1 + "")
      .setLineWidth(0.2)
      .line(0, page.height - 10, page.width, page.height - 10)
      .text(page.width / 2 - pdf.getStringUnitWidth(page.footer.text) * page.footer.textSize / pdf.internal.scaleFactor / 2, page.height - 5 + page.footer.textSize / 3, page.footer.text);
  }
  
  function title(pdf, title) {
    pdf.setTextColor(0)
      .setFont("times", "bold")
      .setFontSize(40)
      .text(20, 40, title)
      .setLineWidth(0.2);
  }
  
  function subtitle(pdf, subtitle) {
    
    pdf.setTextColor(0)
      .setFont("times", "normal")
      .setFontSize(12)
      .text(20, 70, subtitle)
      .setLineWidth(0.2)
      .line(0, 53, page.width, 53);
  }
  
  function body(x, y, pdf, body) {
    var lines = pdf.setFontSize(10)
      .setFont("arial", "normal")
      .setTextColor(0)
      .splitTextToSize(body, page.columnWidth);
    pdf.text(x, y, lines);
  }
  
  function barChart(x, y, pdf, data) {
    var chartWidth = page.columnWidth + 10;
    var totalLength = data.length;
    var stepSize = chartWidth / totalLength;

    pdf.line(x, y + 90, x + chartWidth, y + 90)
      .setLineWidth(20)
      .setDrawColor(79, 151, 196);
    
    for (i = 0; i < totalLength; i++) {
      pdf.line((i + 1) * stepSize, y + 90, (i + 1) * stepSize, y + 90 - data[i].value)
        .setFont("arial", "normal")
        .setTextColor(0)
        .setFontSize(6)
        .text((i + 1) * stepSize - pdf.getStringUnitWidth(data[i].label) * 6 / pdf.internal.scaleFactor / 2, y + 95, data[i].label)
        .setFontSize(12)
        .text((i + 1) * stepSize - pdf.getStringUnitWidth(data[i].value) * 12 / pdf.internal.scaleFactor / 2 - 5, y + 85 - data[i].value, data[i].value + "");
    }
  }
  
  function roundChart(x, y, pdf, data) {
    pdf.rect(x, y, page.columnWidth + 10, 100);
  }
  
  function quote(x, y, pdf, text) {
    var lines = pdf.setFontSize(20)
      .setFont("times", "italic")
      .setTextColor(0)
      .splitTextToSize("\"" + text + "\"", page.columnWidth);
    pdf.text(x + 10, y, lines);
      
  }
  
  document.getElementById("generate").addEventListener("click", function(event) {
    event.preventDefault();

    var pdf = new jsPDF("portrait", "px", "a4");
    var barsData = [
      {
        label: "text",
        value: 10
      },
      {
        label: "more text",
        value: 52
      },
      {
        label: "some text",
        value: 42
      },
      {
        label: "other text",
        value: 15
      },
      {
        label: "no text",
        value: 57
      }
    ];
    
    pdf.addFont("Coustard", "Coustard", "normal", "StandardEncoding");
    pdf.addFont("KreonRegular", "Kreon Regular", "normal", "StandardEncoding");
    pdf.addFont("ComicSansMS", "Comic Sans", "normal", "StandardEncoding");
    pdf.addFont("Helvetica-Bold", "helvetica", "bold", "StandardEncoding");
    
    footer(pdf);
    title(pdf, "Newspaper Title");
    subtitle(pdf, "by Eduard Moldovan");
    body(20, 90, pdf, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ligula nisl, lobortis non varius ac, aliquet ac quam. Nam vel ligula placerat, condimentum orci quis, euismod nisi. Ut consequat neque aliquam viverra dictum. Nunc dui tellus, blandit et commodo non, consectetur ac ipsum. In tristique eu elit ac iaculis. Nulla bibendum quam libero, id blandit risus commodo volutpat. Mauris eget efficitur ex. Donec luctus urna dapibus cursus efficitur. Nam nec sodales sem. Fusce vel elit eu erat egestas interdum. Sed ut malesuada odio.");
    body(page.columnWidth + 50, 90, pdf, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ligula nisl, lobortis non varius ac, aliquet ac quam. Nam vel ligula placerat, condimentum orci quis, euismod nisi. Ut consequat neque aliquam viverra dictum. Nunc dui tellus, blandit et commodo non, consectetur ac ipsum. In tristique eu elit ac iaculis.");
    barChart(20, 175, pdf, barsData);
    roundChart(page.columnWidth + 50, 140, pdf, {});
    body(20, 290, pdf, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ligula nisl, lobortis non varius ac, aliquet ac quam. Nam vel ligula placerat, condimentum orci quis, euismod nisi. Ut consequat neque aliquam viverra dictum. Nunc dui tellus, blandit et commodo non, consectetur ac ipsum. In tristique eu elit ac iaculis. Nulla bibendum quam libero, id blandit risus commodo volutpat. Mauris eget efficitur ex. Donec luctus urna dapibus cursus efficitur. Nam nec sodales sem. Fusce vel elit eu erat egestas interdum. Sed ut malesuada odio.");
    body(page.columnWidth + 50, 250, pdf, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ligula nisl, lobortis non varius ac, aliquet ac quam. Nam vel ligula placerat, condimentum orci quis, euismod nisi. Ut consequat neque aliquam viverra dictum. Nunc dui tellus, blandit et commodo non, consectetur ac ipsum. In tristique eu elit ac iaculis. Nulla bibendum quam libero, id blandit risus commodo volutpat. Mauris eget efficitur ex. Donec luctus urna dapibus cursus efficitur. Nam nec sodales sem. Fusce vel elit eu erat egestas interdum. Sed ut malesuada odio.\n\nProin lorem nisl, volutpat placerat massa vel, placerat porta nunc. Quisque augue nisi, aliquam faucibus semper sit amet, blandit sit amet lorem. Aenean sapien ligula, semper vitae fringilla eget, mattis vitae felis. Integer sed risus a ligula aliquet mollis eu at neque. Nullam sagittis lobortis mi, a volutpat orci gravida vitae. Proin mi elit, viverra non facilisis sed, lobortis vel mauris. Nulla facilisi. Praesent ultricies lorem vitae ultricies tincidunt. Donec placerat sit amet purus vitae rhoncus. In quam arcu, ultricies vitae sem nec, vestibulum commodo nisi. Curabitur rutrum leo quis porta ullamcorper. Vivamus quis hendrerit est, ac faucibus lacus. In hac habitasse platea dictumst. Sed posuere neque non purus maximus, vitae sodales erat varius. Praesent ut sapien congue, maximus erat non, euismod orci.\n\nProin lorem nisl, volutpat placerat massa vel, placerat porta nunc. Quisque augue nisi, aliquam faucibus semper sit amet, blandit sit amet lorem. Aenean sapien ligula, semper vitae fringilla eget, mattis vitae felis. Integer sed risus a ligula aliquet mollis eu at neque. Nullam sagittis lobortis mi, a volutpat orci gravida vitae. Proin mi elit, viverra non facilisis sed, lobortis vel mauris. Nulla facilisi. Praesent ultricies lorem vitae ultricies tincidunt. Donec placerat sit amet purus vitae rhoncus. In quam arcu, ultricies vitae sem nec, vestibulum commodo nisi. Curabitur rutrum leo quis porta ullamcorper. Vivamus quis hendrerit est, ac faucibus lacus. ");
    quote(20, 395, pdf, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ligula nisl, lobortis non varius ac, aliquet ac quam.");
    barChart(20, 475, pdf, []);
    
    pdf.save("newspaper.pdf");
    
  }, false)
  
}());