import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const IITDetails = () => {
    const { iit } = useParams();
    console.log(iit);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/get_iit?iit=${iit}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
            console.log(data);  
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [iit]);


    return (
        <div>
            <h2 className='display-7 text-light m-3'>{iit}</h2>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row mx-5 mb-5">
                    {data.map((item, index) => {
                        //console.log(item);
                        const ind=item.indexOf('(');
                        const branch=item.slice(0,ind-1);
                        const course=item.slice(ind+1,item.length-1);
                        console.log(branch);
                        // Set a fixed width for each card
                        const cardStyle = {
                            width: '100%', // Adjust the width as needed
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '100%'
                        };

                        return (
                            <div className="col-md-6 col-lg-4 col-xl-3 d-flex mt-4" key={index}>
                                <Link to={`${iit}/${item}`} style={{ textDecoration: 'none', width:'100%'}}>
                                    <div className="card bg-dark text-light d-flex flex-column" style={cardStyle}>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{branch}</h5>
                                            <p className="card-text mt-auto text-secondary">{course}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default IITDetails;
