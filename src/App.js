import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import {
  FaCar, FaRoad, FaHome, FaLeaf, FaCalculator, FaChartPie, FaLightbulb, FaWalking, FaRecycle, FaTree
} from 'react-icons/fa';
import { GiMeat } from "react-icons/gi";
import { MdDirectionsBus } from "react-icons/md";
import { MdFlight } from "react-icons/md";
import { IoFlash } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { PiPlugChargingFill } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { GiShinyApple } from "react-icons/gi";
import { LuMilestone } from "react-icons/lu";



// Import the CSS file (assuming it's named App.css in the same directory)
import './App.css';

function App() {
  const [vehicleType, setVehicleType] = useState('');
  const [milesPerMonth, setMilesPerMonth] = useState('');
  const [publicTransportHours, setPublicTransportHours] = useState('');
  const [flightsPerYear, setFlightsPerYear] = useState('');

  const [homeSize, setHomeSize] = useState('');
  const [energySource, setEnergySource] = useState('');
  const [monthlyElectricBill, setMonthlyElectricBill] = useState('');
  const [heatingType, setHeatingType] = useState('');

  const [dietType, setDietType] = useState('');
  const [recyclingFrequency, setRecyclingFrequency] = useState('');

  const [totalEmissions, setTotalEmissions] = useState(null);
  const [transportationEmissions, setTransportationEmissions] = useState(null);
  const [homeEnergyEmissions, setHomeEnergyEmissions] = useState(null);
  const [lifestyleEmissions, setLifestyleEmissions] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Emission Factors (simplified for demonstration purposes)
  const EMISSION_FACTORS = {
    transportation: {
      vehicle: {
        'Gasoline Car': 0.2, // kg CO2 per mile
        'Electric Car': 0.05, // kg CO2 per mile (assuming grid mix)
        'Motorcycle': 0.1, // kg CO2 per mile
        '': 0, // Default for no selection
      },
      publicTransport: 0.05, // kg CO2 per hour
      flight: 100, // kg CO2 per flight (assuming average flight distance)
    },
    homeEnergy: {
      homeSize: 0.005, // kg CO2 per sq ft per month
      energySource: {
        'Grid Electricity': 0.5, // kg CO2 per dollar
        'Solar': 0.01, // kg CO2 per dollar (minimal, for system manufacturing)
        'Wind': 0.01, // kg CO2 per dollar
        '': 0, // Default for no selection
      },
      heatingType: {
        'Electric Heating': 0.5, // kg CO2 per dollar
        'Natural Gas': 0.05, // kg CO2 per dollar
        'Oil': 0.08, // kg CO2 per dollar
        'Wood': 0.03, // kg CO2 per dollar
        '': 0, // Default for no selection
      },
    },
    lifestyle: {
      diet: {
        'Meat Lover': 200, // kg CO2 per month
        'Vegetarian': 100, // kg CO2 per month
        'Vegan': 50, // kg CO2 per month
        '': 0, // Default for no selection
      },
      recycling: {
        'Always': -20, // kg CO2 reduction per month
        'Sometimes': -10, // kg CO2 reduction per month
        'Never': 0, // kg CO2
        '': 0, // Default for no selection
      },
    },
  };

  const calculateEmissions = () => {
    let transportCo2 = 0;
    let homeCo2 = 0;
    let lifestyleCo2 = 0;

    // Transportation Calculation
    if (vehicleType && milesPerMonth) {
      transportCo2 += parseFloat(milesPerMonth) * EMISSION_FACTORS.transportation.vehicle[vehicleType];
    }
    if (publicTransportHours) {
      transportCo2 += parseFloat(publicTransportHours) * EMISSION_FACTORS.transportation.publicTransport;
    }
    if (flightsPerYear) {
      transportCo2 += parseFloat(flightsPerYear) * EMISSION_FACTORS.transportation.flight / 12; // Per month
    }

    // Home Energy Calculation
    if (homeSize) {
      homeCo2 += parseFloat(homeSize) * EMISSION_FACTORS.homeEnergy.homeSize;
    }
    if (energySource && monthlyElectricBill) {
      homeCo2 += parseFloat(monthlyElectricBill) * EMISSION_FACTORS.homeEnergy.energySource[energySource];
    }
    if (heatingType && monthlyElectricBill) { // Assuming heating bill is part of or proportional to electric bill for simplicity
      homeCo2 += parseFloat(monthlyElectricBill) * EMISSION_FACTORS.homeEnergy.heatingType[heatingType];
    }

    // Lifestyle Calculation
    if (dietType) {
      lifestyleCo2 += EMISSION_FACTORS.lifestyle.diet[dietType];
    }
    if (recyclingFrequency) {
      lifestyleCo2 += EMISSION_FACTORS.lifestyle.recycling[recyclingFrequency];
    }

    const totalCo2 = (transportCo2 + homeCo2 + lifestyleCo2) / 1000; // Convert kg to tons

    setTransportationEmissions(transportCo2 / 1000);
    setHomeEnergyEmissions(homeCo2 / 1000);
    setLifestyleEmissions(lifestyleCo2 / 1000);
    setTotalEmissions(totalCo2);
    setShowResults(true);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 10000); // Confetti lasts for 5 seconds
  };

  return (
    <div className="app-container">
      {showConfetti && <Confetti recycle={false} numberOfPieces={2000} />}
    
      <div className="main-content-wrapper">
        {/* Main Content Area */}

        <div className="main-content-area">
          <h1 className="title">CO2 Emission Calculator</h1>
          <p className="subtitle">Calculate your carbon footprint and discover ways to reduce your environmental impact</p>
          

          {/* Calculate Your Emissions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="emissions-calculator-section"
          >
            <h2 className="section-title">
              <FaCalculator className="icon-margin green-icon" /> Calculate Your Co2 Emissions
            </h2>

            {/* Transportation */}
            <div className="category-section">
              <h3 className="category-title">
                <FaCar className="icon-margin blue-icon" /> Transportation
              </h3>
              <div className="input-grid">
                <div>
                  <div style={{display:"flex"}}>
                  <FaRoad style={{color:"#13ea62"}}/> &nbsp;&nbsp;
                  <label htmlFor="vehicleType" className="input-label">Vehicle Type</label>
                  </div>
                  <select
                    id="vehicleType"
                    className="input-field select-field"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="">Select vehicle type</option>
                    <option value="Gasoline Car">Gasoline Car</option>
                    <option value="Electric Car">Electric Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                  </select>
                </div>
                <div>
                  <div style={{display:"flex"}}>
                  <LuMilestone style={{color:"#13ea62"}} /> &nbsp;&nbsp;
                  <label htmlFor="milesPerMonth" className="input-label">Miles per Month</label>
                  </div>
                  <input
                    type="number"
                    id="milesPerMonth"
                    className="input-field"
                    placeholder="Enter miles"
                    value={milesPerMonth}
                    onChange={(e) => setMilesPerMonth(e.target.value)}
                  />
                </div>
                <div>
                  <div style={{display:"flex"}}>
                  <MdDirectionsBus style={{color:"#13ea62"}} /> &nbsp;&nbsp;
                  <label htmlFor="publicTransportHours" className="input-label">Public Transport (hours/week)</label>
                  </div>
                  <input
                    type="number"
                    id="publicTransportHours"
                    className="input-field"
                    placeholder="Hours per week"
                    value={publicTransportHours}
                    onChange={(e) => setPublicTransportHours(e.target.value)}
                  />
                </div>
                <div>
                  <div style={{display:"flex"}}>
                  <MdFlight style={{color:"#13ea62"}} /> &nbsp;&nbsp;
                  <label htmlFor="flightsPerYear" className="input-label">Flights per Year</label>
                  </div>
                  <input
                    type="number"
                    id="flightsPerYear"
                    className="input-field"
                    placeholder="Number of flights"
                    value={flightsPerYear}
                    onChange={(e) => setFlightsPerYear(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Home Energy */}
            <div className="category-section">
              <h3 className="category-title">
                <IoFlash className="icon-margin orange-icon" /> Home Energy
              </h3>
              <div className="input-grid">
                <div>
                  <div style={{display:"flex"}}>
                  <MdHome style={{color:"#13ea62"}} /> &nbsp;&nbsp;
                  <label htmlFor="homeSize" className="input-label">Home Size (sq ft)</label>
                  </div>
                  <input
                    type="number"
                    id="homeSize"
                    className="input-field"
                    placeholder="Square feet"
                    value={homeSize}
                    onChange={(e) => setHomeSize(e.target.value)}
                  />
                </div>
                <div>
                  <div style={{display:"flex"}}>
                  <PiPlugChargingFill style={{color:"#13ea62"}}/> &nbsp;&nbsp;
                  <label htmlFor="energySource" className="input-label">Energy Source</label>
                  </div>
                  <select
                    id="energySource"
                    className="input-field select-field"
                    value={energySource}
                    onChange={(e) => setEnergySource(e.target.value)}
                  >
                    <option value="">Select energy source</option>
                    <option value="Grid Electricity">Grid Electricity</option>
                    <option value="Solar">Solar</option>
                    <option value="Wind">Wind</option>
                  </select>
                </div>
                <div>
                  <div style={{display:"flex"}}>
                  <FaDollarSign style={{color:"#13ea62"}}/> &nbsp;&nbsp;
                  <label htmlFor="monthlyElectricBill" className="input-label">Monthly Electric Bill ($)</label>
                  </div>
                  <input
                    type="number"
                    id="monthlyElectricBill"
                    className="input-field"
                    placeholder="Dollar amount"
                    value={monthlyElectricBill}
                    onChange={(e) => setMonthlyElectricBill(e.target.value)}
                  />
                </div>
                <div>
                  <div style={{display:"flex"}}>
                  <FaFire style={{color:"#13ea62"}}/> &nbsp;&nbsp;
                  <label htmlFor="heatingType" className="input-label">Heating Type</label>
                  </div>
                  <select
                    id="heatingType"
                    className="input-field select-field"
                    value={heatingType}
                    onChange={(e) => setHeatingType(e.target.value)}
                  >
                    <option value="">Select heating type</option>
                    <option value="Electric Heating">Electric Heating</option>
                    <option value="Natural Gas">Natural Gas</option>
                    <option value="Oil">Oil</option>
                    <option value="Wood">Wood</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="category-section">
              <h3 className="category-title">
                <GiForkKnifeSpoon className="icon-margin purple-icon" /> Lifestyle
              </h3>
              <div className="input-grid">
                <div>
                   <div style={{display:"flex"}}>
                  <GiShinyApple style={{color:"#13ea62"}} /> &nbsp;&nbsp;
                  <label htmlFor="dietType" className="input-label">Diet Type</label>
                  </div>
                  <select
                    id="dietType"
                    className="input-field select-field"
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                  >
                    <option value="">Select diet type</option>
                    <option value="Meat Lover">Meat Lover</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>
                <div>
                   <div style={{display:"flex"}}>
                   <FaRecycle style={{color:"#13ea62"}}/> &nbsp;&nbsp;
                  <label htmlFor="recyclingFrequency" className="input-label">Recycling Frequency</label>
                  </div>
                  <select
                    id="recyclingFrequency"
                    className="input-field select-field"
                    value={recyclingFrequency}
                    onChange={(e) => setRecyclingFrequency(e.target.value)}
                  >
                    <option value="">Select frequency</option>
                    <option value="Always">Always</option>
                    <option value="Sometimes">Sometimes</option>
                    <option value="Never">Never</option>
                  </select>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="calculate-button"
              onClick={calculateEmissions}
            >
              <FaCalculator className="icon-margin" /> Calculate My Carbon Footprint
            </motion.button>
          </motion.div>
        </div>
        {/* Sidebar - Your Carbon Footprint & Quick Tips */}
        <div className="sidebar-container">
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="carbon-footprint-section"
          >
            <h2 className="section-title">
              <FaChartPie className="icon-margin indigo-icon" /> Your Carbon Footprint
            </h2>
            <div className="footprint-display">
              <p className="footprint-value">
                {showResults && totalEmissions !== null ? totalEmissions.toFixed(2) : '--'}
              </p>
              <p className="footprint-unit">tons CO2 per year</p>
            </div>
            {!showResults && (
              <p className="results-placeholder">Complete the form to see your results</p>
            )}

            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="category-title">
                  <FaChartPie className="icon-margin indigo-icon" /> Breakdown
                </h3>
                <ul className="breakdown-list">
                  <li className="breakdown-item">
                    <span className="breakdown-label"><FaCar className="icon-margin blue-icon" /> Transportation</span>
                    <span>{transportationEmissions !== null ? transportationEmissions.toFixed(2) : '--'} tons</span>
                  </li>
                  <li className="breakdown-item">
                    <span className="breakdown-label"><FaHome className="icon-margin orange-icon" /> Home Energy</span>
                    <span>{homeEnergyEmissions !== null ? homeEnergyEmissions.toFixed(2) : '--'} tons</span>
                  </li>
                  <li className="breakdown-item">
                    <span className="breakdown-label"><FaLeaf className="icon-margin purple-icon" /> Lifestyle</span>
                    <span>{lifestyleEmissions !== null ? lifestyleEmissions.toFixed(2) : '--'} tons</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Quick Tips Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="quick-tips-section"
          >
            <h2 className="section-title">
              <FaLightbulb className="icon-margin yellow-icon" /> Quick Tips
            </h2>
            <ul className="tips-list">
              <li className="tip-item">
                <FaLightbulb className="tip-icon yellow-icon" />
                <span>Switch to LED bulbs to reduce energy consumption</span>
              </li>
              <li className="tip-item">
                <FaWalking className="tip-icon green-icon" />
                <span>Use public transport or bike for short trips</span>
              </li>
              <li className="tip-item">
                <FaRecycle className="tip-icon blue-icon" />
                <span>Recycle and compost to reduce waste</span>
              </li>
              <li className="tip-item">
                <FaTree className="tip-icon dark-green-icon" />
                <span>Choose renewable energy sources when possible</span>
              </li>
              <li className="tip-item">
                <GiMeat className="tip-icon red-icon" />
                <span>Consider a plant-based diet to lower food-related emissions</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;