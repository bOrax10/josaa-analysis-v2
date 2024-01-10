import React, { useState, useEffect } from 'react';
import CsvTable from './ParseBranch';

const BranchWiseCutoff = () => {
    const [branchValue, setBranchValue] = useState('');
    const [seatValue, setSeatValue] = useState('OPEN');
    const [genderValue, setGenderValue] = useState('Gender-Neutral');
    const [roundValue, setRoundValue] = useState('');
    const [minRank, setMinRank] = useState('');
    const [maxRank, setMaxRank] = useState('');
    const [tableData, setTableData] = useState([]);
    const [branchDropdownButtonText, setBranchDropdownButtonText] = useState('Select');
    const [seatDropdownButtonText, setSeatDropdownButtonText] = useState(seatValue);
    const [genderDropdownButtonText, setGenderDropdownButtonText] = useState(genderValue);
    const [roundDropdownButtonText, setRoundDropdownButtonText] = useState('All Rounds');
    const [loading, setLoading] = useState(false);
    const branches=['Clear', 'Civil', 'Computer', 'Electrical', 'Electronics', 'Mechanical',
    'Metallurgy', 'Material Science', 'Aerospace', 'Chemical', 'Energy',
    'Physics', 'Biotechnology', 'Mathematics', 'Computing', 'Production', 'Industrial', 'Textile',
    'Agricultural and Food', 'Geology', 'Architecture', 'Economics', 'Instrumentation',
    'Manufacturing', 'Mining', 'Ocean and Naval', 'Design', 'Miscellaneous', 'Polymer', 
    'Environmental', 'Mineral', 'Petroleum', 'Ceramic', 'Metallurgy', 'Pharmaceutics',
    'Data Science', 'Artificial Intelligence', 'Statistics']
    
    const seatTypes=['OPEN', 'OBC-NCL', 'SC', 'ST', 'OPEN (PwD)', 'OBC-NCL (PwD)',
    'SC (PwD)', 'ST (PwD)', 'EWS', 'EWS (PwD)'];

    const [pageNumber,setPageNumber] = useState(1);
    useEffect(() => {
        setLoading(true);
        // Add a one-second delay before making the API call
        const delay = setTimeout(() => {
            fetchData(branchValue, seatValue, genderValue, roundValue, minRank, maxRank, pageNumber);
        }, 300); // 1000 milliseconds = 1 second
    
        // Clear the timeout if the component unmounts or the dependencies change
        return () => clearTimeout(delay);
    }, [branchValue, seatValue, genderValue, roundValue, minRank, maxRank, pageNumber]);

    const handleBranchDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        console.log(value);
        setBranchValue(value);
        setBranchDropdownButtonText(value);
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

    const handleRoundDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        if (value === 'All Rounds') {
            setRoundValue('');
            setRoundDropdownButtonText('All Rounds');
        } 
        else { 
            setRoundValue(value);
            setRoundDropdownButtonText(value);
        }
    };
    
    const handleMinRankChange = (event) => {
        const value = event.target.value;
        setMinRank(value);
    };

    const handleMaxRankChange = (event) => {
        const value = event.target.value;
        setMaxRank(value);
    };

    const fetchData = (branch, seat, gender, round, minRank, maxRank, pageNumber) => {
        fetch(`http://localhost:5000/get_csv_by_branch?branch=${branch}&seat=${seat}&gender=${gender}&round=${round}&minrank=${minRank}&maxrank=${maxRank}&pageno=${pageNumber}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTableData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="institutes">
            <h2 className="display-7 text-light fw-bold mx-3 mt-3">View Branch-wise Cut-offs</h2>
            <p className="text-light ms-3">Filter by branch allows you to filter the cut-off data with the selected branch and further narrow down with your choice of institutes. </p>


            <div className="row m-4">
                <div className="col-md-4">
                    <div className="dropdown">
                        <div className="branch">
                            <p className="text-light">Branch</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {branchDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {branches.map((branch, index) => (
                                    <li>
                                        <a className="dropdown-item" key={index} data-value={branch} href="#" onClick={handleBranchDropdownChange}>
                                            {branch}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
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

                <div className="col-md-4">
                    <div className="dropdown">
                        <div className="gender">
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
                </div>

                <div className="col-md-4 mt-3">
                    <div className="dropdown">
                        <div className="display-rounds">
                            <p className="text-light">Display Rounds</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {roundDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <li>
                                    <a className="dropdown-item" href="#" data-value="All Rounds" onClick={handleRoundDropdownChange}>
                                        All Rounds
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Last round only" onClick={handleRoundDropdownChange}>
                                        Last round only
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 1" onClick={handleRoundDropdownChange}>
                                        Round 1
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 2" onClick={handleRoundDropdownChange}>
                                        Round 2
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 3" onClick={handleRoundDropdownChange}>
                                        Round 3
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 4" onClick={handleRoundDropdownChange}>
                                        Round 4
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 5" onClick={handleRoundDropdownChange}>
                                        Round 5
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 6" onClick={handleRoundDropdownChange}>
                                        Round 6
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 7" onClick={handleRoundDropdownChange}>
                                        Round 7
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-3">
                    <div className="min-rank">
                        <p className="text-light">Minimum Rank</p>
                        <input
                            type="text"
                            className="form-control bg-secondary text-light border-0"
                            value={minRank}
                            onChange={(event) => {
                                handleMinRankChange(event);
                            }}
                        />
                    </div>
                </div>
                
                <div className="col-md-4 mt-3">
                    <div className="max-rank ">
                        <p className="text-light">Maximum Rank</p>
                        <input
                            type="text"
                            className="form-control bg-secondary text-light border-0"
                            value={maxRank}
                            onChange={(event) => {
                                handleMaxRankChange(event);
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="table text-light">
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <CsvTable data={tableData} branchValue={branchValue} seatValue={seatValue} genderValue={genderValue} roundValue={roundValue} minRank={minRank} maxRank={maxRank} pageNumber={pageNumber}/>
                )}
            </div>
        </div>
);
}

export default BranchWiseCutoff;