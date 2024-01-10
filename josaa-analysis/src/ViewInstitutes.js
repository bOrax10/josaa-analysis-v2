import React from 'react';

const ViewInstitutes = () => {
    const iits = [
        'IIT Bhubaneswar', 'IIT Bombay', 'IIT Mandi', 'IIT Delhi', 'IIT Indore', 'IIT Kharagpur', 'IIT Hyderabad',
        'IIT Jodhpur', 'IIT Kanpur', 'IIT Madras', 'IIT Gandhinagar', 'IIT Patna', 'IIT Roorkee', 'IIT Ropar',
        'IIT (BHU) Varanasi', 'IIT Guwahati', 'IIT Bhilai', 'IIT Goa', 'IIT Palakkad', 'IIT Tirupati', 'IIT Jammu',
        'IIT Dharwad', 'IIT (ISM) Dhanbad'
    ];

    const sortedIits = [...iits].sort(); // Create a sorted copy of the array.

    const iitMap = new Map([
        ['IIT Bhubaneswar', 'Odisha'],
        ['IIT Bombay', 'Maharashtra'],
        ['IIT Mandi', 'Himachal Pradesh'],
        ['IIT Delhi', 'Delhi'],
        ['IIT Indore', 'Madhya Pradesh'],
        ['IIT Kharagpur', 'West Bengal'],
        ['IIT Hyderabad', 'Telangana'],
        ['IIT Jodhpur', 'Rajasthan'],
        ['IIT Kanpur', 'Uttar Pradesh'],
        ['IIT Madras', 'Tamil Nadu'],
        ['IIT Gandhinagar', 'Gujarat'],
        ['IIT Patna', 'Bihar'],
        ['IIT Roorkee', 'Uttarakhand'],
        ['IIT Ropar', 'Punjab'],
        ['IIT (BHU) Varanasi', 'Uttar Pradesh'],
        ['IIT Guwahati', 'Assam'],
        ['IIT Bhilai', 'Chhattisgarh'],
        ['IIT Goa', 'Goa'],
        ['IIT Palakkad', 'Kerala'],
        ['IIT Tirupati', 'Andhra Pradesh'],
        ['IIT Jammu', 'Jammu and Kashmir'],
        ['IIT Dharwad', 'Karnataka'],
        ['IIT (ISM) Dhanbad', 'Jharkhand']
    ]);

    return (
        <div>
            <h2 className="display-7 text-light fw-bold mx-3 mt-3">View All Institutes</h2>
            <p className="text-light ms-3">List of Institutes participating in JoSAA counseling.</p>

            <div className="container mt-5">
                <div className="row">
                    {sortedIits.map((iit, index) => (
                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3" key={index}>
                            <a href={`institutes/${iit}`} className="custom-card-anchor text-decoration-none">
                                <div className="custom-card">
                                    <div className="card bg-dark d-flex flex-column w-100 custom-card-hover">
                                        <div className="card-body d-flex flex-column align-items-center">
                                            <h5 className="card-title text-light">{iit}</h5>
                                            <p className="card-text" style={{ color: '#929690' }}>{iitMap.get(iit)}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewInstitutes;
