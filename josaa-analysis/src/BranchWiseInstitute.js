import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BranchWiseInstitute = () => {
    const { branch: selectedBranch } = useParams();
    console.log(selectedBranch);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/get_iits_by_branch?branch=${selectedBranch}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedBranch]);

    useEffect(() => {
        // Call the function to adjust card heights after data is loaded
        if (!loading) {
            adjustCardHeights();
        }
    }, [loading, data]);

    const createCardsForArray = (key, array) => {
        return array.map((item, itemIndex) => (
            <div key={itemIndex} className="col-md-6 col-lg-4 col-xl-3 mt-4">
                <div className="card bg-dark text-light" style={{ width: '100%' }}>
                    <div className="card-header">
                        <h5 className="card-title">{key}</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text text-secondary">{item}</p>
                    </div>
                </div>
            </div>
        ));
    };

    const adjustCardHeights = () => {
        const rows = document.querySelectorAll('.row.m-5');

        rows.forEach(row => {
            const cardsInRow = row.querySelectorAll('.card');

            let maxHeight = 0;
            cardsInRow.forEach(card => {
                const cardHeight = card.offsetHeight;
                if (cardHeight > maxHeight) {
                    maxHeight = cardHeight;
                }
            });

            cardsInRow.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="row m-5">
            {Object.keys(data).map((key, index) => (
                Array.isArray(data[key]) ? (
                    createCardsForArray(key, data[key])
                ) : (
                    <div key={index} className="col-md-6 col-lg-4 col-xl-3 mt-4">
                        <div className="card bg-dark text-light" style={{ width: '100%' }}>
                            <div className="card-header">
                                <h5 className="card-title">{key}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text text-secondary">{data[key]}</p>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default BranchWiseInstitute;
