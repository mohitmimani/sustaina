// This file contains all the data used in the impact components
// You can easily modify these values in the future

// Impact metrics data
export const impactMetrics = {
  water: {
    value: "250L",
    description: "Equivalent to 100 days of drinking water for one person",
    color: "blue"
  },
  trees: {
    value: "20",
    description: "Equivalent to 1.5 acres of forest carbon sequestration",
    color: "emerald"
  },
  co2: {
    value: "95kg",
    description: "Equivalent to 500km of car travel emissions",
    color: "amber"
  }
};

// Monthly impact data for charts
export const monthlyImpactData = [
  { month: "Jan", water: 120, trees: 8, co2: 45 },
  { month: "Feb", water: 150, trees: 10, co2: 55 },
  { month: "Mar", water: 180, trees: 12, co2: 65 },
  { month: "Apr", water: 200, trees: 15, co2: 75 },
  { month: "May", water: 220, trees: 17, co2: 80 },
  { month: "Jun", water: 250, trees: 20, co2: 95 },
];

// Impact distribution data for pie chart
export const impactDistributionData = [
  { name: "Water Saved", value: 250, color: "#3B82F6" },
  { name: "Trees Equivalent", value: 20, color: "#10B981" },
  { name: "CO2 Reduced", value: 95, color: "#F59E0B" },
];

// Timeline data
export const timelineData = [
  {
    month: "January 2023",
    waterSaved: "120L",
    treesEquivalent: "8",
    co2Reduced: "45kg",
  },
  {
    month: "February 2023",
    waterSaved: "150L",
    treesEquivalent: "10",
    co2Reduced: "55kg",
  },
  {
    month: "March 2023",
    waterSaved: "180L",
    treesEquivalent: "12",
    co2Reduced: "65kg",
  },
  {
    month: "April 2023",
    waterSaved: "200L",
    treesEquivalent: "15",
    co2Reduced: "75kg",
  },
  {
    month: "May 2023",
    waterSaved: "220L",
    treesEquivalent: "17",
    co2Reduced: "80kg",
  },
  {
    month: "June 2023",
    waterSaved: "250L",
    treesEquivalent: "20",
    co2Reduced: "95kg",
  },
]; 
