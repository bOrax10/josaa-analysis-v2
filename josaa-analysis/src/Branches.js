import React from "react";

const Branches = () => {
  const branches = ['Civil', 'Computer', 'Electrical', 'Electronics', 'Mechanical',
    'Metallurgy', 'Material Science', 'Aerospace', 'Chemical', 'Energy',
    'Physics', 'Biotechnology', 'Mathematics', 'Computing', 'Production', 'Industrial', 'Textile',
    'Agricultural and Food', 'Geology', 'Architecture', 'Economics', 'Instrumentation',
    'Manufacturing', 'Mining', 'Ocean and Naval', 'Design', 'Miscellaneous', 'Polymer',
    'Environmental', 'Mineral', 'Petroleum', 'Ceramic', 'Metallurgy', 'Pharmaceutics',
    'Data Science', 'Artificial Intelligence', 'Statistics'];
  	branches.sort()
  	return (
    	<div>
      		<h2 className="display-7 text-light fw-bold mx-3 mt-3">View All Branches</h2>
      		<p className="text-light ms-3">List of branches available in JoSAA counselling. </p>

      		<div className="container-lg mt-5 mb-4">
        		<div className="row d-flex">
          			{branches.map((branch) => (
	            		<div className="col-sm-6 col-md-6 col-lg-4 mb-3" key={branch}>
              				<a href={`/branches/${branch}`} className="text-decoration-none">
								<div className="card bg-dark text-light">
									<div className="card-body d-flex align-items-center">
										<h5 className="card-title me-2">{branch}</h5>
										<div className="ms-auto">
											<a href={`/branches/${branch}`} className="btn text-light">→</a>
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
};

export default Branches;
