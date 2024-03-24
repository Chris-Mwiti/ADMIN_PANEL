const chartData = {
  Sales: [
    {
      id: "1",
      WeeklySales: {
        series: [
          {
            data: [500, 600, 700],
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
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
          plotOptions: {
            bar: {
              distributed: true,
              borderRadius: 4,
              horizontal: true,
            },
          },
          colors: ["#ffd044", "#00e396", "#008ffb"],
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            theme: "dark",
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
            categories: ["Festive Bread", "Superloaf", "Broadways"],
            title: {
              text: "Bread types",
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
            legend: {
              position: "bottom",
            },
            labels: ["Festive Bread", "Super Loaf", "Broadways"],
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

export default chartData;
