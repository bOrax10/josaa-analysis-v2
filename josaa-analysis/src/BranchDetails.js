import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Colors } from 'chart.js';
import Chart from 'chart.js/auto'; 
Chart.register(Colors);

const BranchDetails = () => {
  const { iit, item } = useParams();
  const branch = item;
  const [branchData, setBranchData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get_branch_data?iit=${iit}&branch=${branch}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setBranchData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [iit, branch]);

  const closingRanksMap = new Map();
  if (Array.isArray(branchData)) {
    branchData.forEach(item => {
      const year = item.Year;
      const round = item.Round;
      const closingRank = item["Closing Rank"];

      if (year >= 2016 && year <= 2022) {
        if (!closingRanksMap.has(year)) {
          closingRanksMap.set(year, {});
        }

        closingRanksMap.get(year)[round] = closingRank;
      }
    });
  }

  const chartData = {
    labels: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5", "Round 6", "Round 7"],
    datasets: []
  };

  closingRanksMap.forEach((roundsData, year) => {
    const dataForYear = {
      label: `Year ${year}`,
      data: chartData.labels.map(label => {
        const round = parseInt(label.replace("Round ", ""));
        const value = roundsData[round];
        return value;
      }),
      fill: false,
      //borderColor: getRandomColor(),
    };

    chartData.datasets.push(dataForYear);
  });

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  return (
    <div className="text-light">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container-lg m-5">
            <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

// Define chart options if needed
const chartOptions = {
  responsive: true,
  scales: {
    x: {
      type: 'category',
      labels: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5", "Round 6", "Round 7"],
    },
    y: {
      beginAtZero: true,
    },
  },
  width: 600,
  height: 600
};

export default BranchDetails;
