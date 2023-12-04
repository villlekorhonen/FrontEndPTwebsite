import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Stats = ({ trainings }) => {
  const [activityStats, setActivityStats] = useState([]);

  useEffect(() => {
    calculateActivityStats();
  }, [trainings]);

  const calculateActivityStats = () => {
    const stats = trainings.reduce((acc, training) => {
      const activity = training.activity;
      const duration = training.duration || 0; 
      acc[activity] = (acc[activity] || 0) + duration;
      return acc;
    }, {});

    const statsArray = Object.keys(stats).map((activity) => ({
      name: activity,
      value: stats[activity],
    }));

    setActivityStats(statsArray);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div>
      <h6>Activity Statistics</h6>
      <div style={{ display: "flex", marginLeft: "100px" }}>
        <div>
          <PieChart width={600} height={600}>
            <Pie
              data={activityStats}
              cx="50%"
              cy="50%"
              outerRadius={250}
              fill="#8884d8"
              label
              dataKey="value"
            >
              {activityStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} min`, name]} />
          </PieChart>
        </div>
        <div style={{ marginLeft: "100px", marginTop: "100px", fontSize: 30 }}>
          <ul>
            {activityStats.map((entry, index) => (
              <li key={`list-${index}`}>
                {entry.name}: {entry.value} min
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stats;
