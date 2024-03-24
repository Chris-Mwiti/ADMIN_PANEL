const chartData = {
  Sales: [
    {
      id: "1",
      WeeklySales: {
        series: [
          {
            name: "Festive Bread",
            data: [300, 200, 400, 120, 250, 120, 125].reverse(),
          },
          {
            name: "Broadways",
            data: [210, 125, 160, 240, 300, 125, 100].reverse(),
          },
          {
            name: "Superloaf",
            data: [500, 140, 210, 145, 325, 135, 178].reverse(),
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "line",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 20,
              left: 7,
              blur: 10,
              opacity: 0.3,
            },
            toolbar: {
              show: true,
            },
          },
          colors: ["#ffd044", "#5a03d5", "#ef5a7f"],
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            theme: "dark",
          },
          stroke: {
            curve: "smooth",
          },
          title: {
            text: "Week Sales",
            align: "left",
            style: {
              color: "#ad1ce2",
            },
          },
          grid: {
            borderColor: "#f1f9fe",
            strokeDashArray: 5,
          },
          markers: {
            size: 0,
          },
          xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
            title: {
              text: "Days Of Week",
              style: {
                color: "#74ffb3",
              },
            },
            labels: {
              style: {
                colors: "#74ffb3",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            title: {
              text: "Sales",
              style: {
                color: "#74ffb3",
              },
            },
            labels: {
              style: {
                colors: "#74ffb3",
              },
            },
            axisBorder: {
              show: false,
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
            floating: true,
            offsetY: -25,
            offsetX: 5,
          },
        },
      },
    },
    {
      id: "2",
      MonthlySales: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "January",
            data: [200, 145, 300, 310],
            fill: false,
            borderColor: "#f59e0b",
            tension: 0.5,
          },
          {
            label: "February",
            data: [300, 210, 165, 205],
            fill: false,
            borderColor: "#2dd4bf",
            tension: 0.5,
          },
        ],
      },
    },
  ],
  ProductSales: [
    {
      id: "1",
      sales: [
        {
          type: "pie",
          series: [200, 500, 300],
          options: {
            chart: {
              width: 300,
              type: "pie",
            },
            labels: [
              "Festive Bread",
              "Super Loaf",
              "Broadways",
            ],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 320,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1024,
                options: {
                  chart: {
                    width: 340,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        },
      ],
    },
  ],
};

export default chartData