import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Colors } from 'chart.js';
import Chart from 'chart.js/auto'; 
Chart.register(Colors);

const chartOptions = {
    responsive: true,
    scales: {
        x: {
            type: 'category',
            labels: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5", "Round 6", "Round 7"],
            ticks: {
                color: 'rgba(255, 255, 255, 0.8)', // Light grayish-white for x-axis labels
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Light grayish-white for x-axis gridlines
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: 'rgba(255, 255, 255, 0.8)', // Light grayish-white for y-axis labels
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Light grayish-white for y-axis gridlines
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                color: 'rgba(255, 255, 255, 0.8)', // Light grayish-white for legend labels
            },
        },
    },
};



const AnalyzeRoundWiseTrends = () => {
    const [instituteValue, setInstituteValue] = useState('');
    const [courses, setCourses] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [CourseValue, setCourseValue] = useState('');
    const [programValue, setProgramValue] = useState('');
    const [seatValue, setSeatValue] = useState('OPEN');
    const [genderValue, setGenderValue] = useState('Gender-Neutral');
    const [seatDropdownButtonText, setSeatDropdownButtonText] = useState(seatValue);
    const [genderDropdownButtonText, setGenderDropdownButtonText] = useState(genderValue);
    const [programDropdownButtonText, setProgramDropdownButtonText] = useState(programValue);
    const [instituteDropdownButtonText, setInstituteDropdownButtonText] = useState('Select');
    const [CourseDropdownButtonText, setCourseDropdownButtonText] = useState('Select');
    const [allDropdownsSelected, setAllDropdownsSelected] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true); 

    const branches = ['Civil', 'Computer', 'Electrical', 'Electronics', 'Mechanical',
    'Metallurgy', 'Material Science', 'Aerospace', 'Chemical', 'Energy',
    'Physics', 'Biotechnology', 'Mathematics', 'Computing', 'Production', 'Industrial', 'Textile',
    'Agricultural and Food', 'Geology', 'Architecture', 'Economics', 'Instrumentation',
    'Manufacturing', 'Mining', 'Ocean and Naval', 'Design', 'Miscellaneous', 'Polymer',
    'Environmental', 'Mineral', 'Petroleum', 'Ceramic', 'Metallurgy', 'Pharmaceutics',
    'Data Science', 'Artificial Intelligence', 'Statistics'];
  	branches.sort()
	branches.unshift('Clear');
    const seatTypes=['OPEN', 'OBC-NCL', 'SC', 'ST', 'OPEN (PwD)', 'OBC-NCL (PwD)',
    'SC (PwD)', 'ST (PwD)', 'EWS', 'EWS (PwD)'];

    useEffect(() => {
        // Fetch courses based on the selected institute
        if (instituteValue !== '') {
            fetch(`http://localhost:5000/get_courses_from_institute?institute=${instituteValue}`)
                .then((response) => response.json())
                .then((data) => {
                    setCourses(data);
                    setCourseValue('');
                    setProgramDropdownButtonText('Select');
                    setCourseDropdownButtonText('Select');
                })
                .catch((error) => {
                    console.error('Error fetching courses:', error);
                });
        }
    }, [instituteValue]);

    useEffect(() => {
        // Fetch programs based on the selected course
        if (CourseValue !== '') {
            fetch(`http://localhost:5000/get_programs_from_course?institute=${instituteValue}&course=${CourseValue}`)
                .then((response) => response.json())
                .then((data) => {
                    setPrograms(data);
                    setProgramValue('');
                })
                .catch((error) => {
                    console.error('Error fetching programs:', error);
                });
        }
    }, [CourseValue]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/get_round_chart_data?institute=${instituteValue}&course=${CourseValue}&program=${programValue}&seat_type=${seatValue}&gender=${genderValue}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setChartData(data);
            setLoading(false);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
    
    useEffect(() => {
        fetchData();
    }, [instituteValue, CourseValue, programValue, seatValue, genderValue]);
        
    useEffect(() => {
        setAllDropdownsSelected(instituteValue !== '' && CourseValue !== '' && programValue !== '' && seatValue !== '' && genderValue !== '');
    }, [instituteValue, CourseValue, programValue, seatValue, genderValue]);

    const closingRanksMap = new Map();
    if (Array.isArray(chartData)) {
        chartData.forEach(item => {
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

    const Data = {
        labels: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5", "Round 6", "Round 7"],
        datasets: []
    };

    closingRanksMap.forEach((roundsData, year) => {
        const dataForYear = {
            label: `Year ${year}`,
            data: Data.labels.map(label => {
                const round = parseInt(label.replace("Round ", ""));
                const value = roundsData[round];
                return value;
        }),
        fill: false,
        //borderColor: getRandomColor(),
    };

    Data.datasets.push(dataForYear);
  });


    const handleInstituteDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        console.log(value);
        setCourseValue(''); // Reset the selected course when the institute changes
        setProgramValue(''); // Reset the selected program when the institute changes
        setCourseDropdownButtonText('Select'); // Reset the course dropdown text
        setProgramDropdownButtonText('Select'); // Reset the program dropdown text
        setCourses([]); // Clear the courses data
        setPrograms([]); // Clear the programs data
        setChartData([]);
        if (value !== 'Clear') {
            setInstituteValue(value);
            setInstituteDropdownButtonText(value);

        } else {
            setInstituteValue('');
            setInstituteDropdownButtonText('Select');
        }
    };
    

    const handleCourseDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        setCourseValue(value);
        setCourseDropdownButtonText(value);
        setProgramValue('');
        setProgramDropdownButtonText('Select');
    };

    const handleProgramDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        setProgramValue(value);
        setProgramDropdownButtonText(value);
    };

    const handleSeatDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        setSeatValue(value);
        setSeatDropdownButtonText(value);
    };

    const handleGenderDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        setGenderValue(value);
        setGenderDropdownButtonText(value);
    };

    return ( 
        <div>
            <h2 className="display-7 text-light fw-bold mx-3 mt-3">Analyse Branch-wise Cut-off Trends</h2>
            <p className="text-light ms-3 me-3">Compare the cut-offs for courses in a particular branch of engineering over 6 years in the JoSAA seat allocation process.
This helps understand the popularity and perception of a branch among engineering aspirants, and thus helps understand the demand for a particular branch during the counselling process.</p>

            <div className="row m-4">
                <div className="col-md-4">
                    <div className="dropdown">
                        <div className="institute">
                            <p className="text-light">Branch</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {instituteDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {branches.map((iit, index) => (
                                    <li>
                                        <a className="dropdown-item" key={index} data-value={iit} href="#" onClick={handleInstituteDropdownChange}>
                                            {iit}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-3 mt-md-0" style={{ visibility: instituteValue!='' ? 'visible' : 'hidden' }}>
                    <div className="dropdown">
                        <div className="seat-type">
                            <p className="text-light">Course</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {CourseDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {courses.map((course, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item" href="#" data-value={course} onClick={handleCourseDropdownChange}>
                                            {course}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-3 mt-md-0" style={{ visibility: CourseValue!='' ? 'visible' : 'hidden' }}>
                    <div className="dropdown">
                        <div className="program-type">
                            <p className="text-light">Program</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {programDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {programs.map((program, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item" href="#" data-value={program} onClick={handleProgramDropdownChange}>
                                            {program}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>                                    
                
                <div className="col-md-6 mt-3">
                    <div className="dropdown">
                        <div className="seat-type">
                            <p className="text-light">Seat Type</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {seatDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {seatTypes.map((seat,index) => (
                                    <li>
                                        <a className="dropdown-item" href="#" key={index} data-value={seat} onClick={handleSeatDropdownChange}>
                                            {seat}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>                                    

                <div className="col-md-6 mt-3">
                    <p className="text-light">Gender</p>
                    <button
                        className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        {genderDropdownButtonText}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <li>
                            <a className="dropdown-item" href="#" data-value="Gender-Neutral" onClick={handleGenderDropdownChange}>
                                Gender-Neutral
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#" data-value="Female-only (including Supernumerary)" onClick={handleGenderDropdownChange}>
                                Female-only (including Supernumerary)
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-light m-3 d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <div className="container-lg">
                    {loading ? (
                        <div>Loading...</div>
                    ) : allDropdownsSelected ? (
                        <div>
                            <Line data={Data} options={chartOptions} />
                        </div>
                    ) : (
                        <div className="alert alert-info" role="alert">No data to be shown. Please select all dropdown values.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default AnalyzeRoundWiseTrends;