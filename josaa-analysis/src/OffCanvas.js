const OffCanvas = () => {
    return (
        <div>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                    <h6 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h6>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div className="container-lg">
                        <div class="row">
                            <div class="col-12 my-2 d-flex">
                                <a class="text-decoration-none" href="/branches">
                                    <div class="card bg-dark text-light d-flex flex-column border-light">
                                        <div class="card-body d-flex flex-column">
                                            <h6 class="card-title">View All Branches</h6>
                                            <small> <p class="card-text" style={{ color: '#929690' }}>View all the branches available in JoSAA counselling.</p> </small>
                                        </div>
                                    </div>
                                </a>
        
                            </div>

                            <div class="col-12 my-2 d-flex">
                                <a class="text-decoration-none" href="/institutes">
                                    <div a class="card bg-dark text-light d-flex flex-column border-light">
                                        <div class="card-body d-flex flex-column">
                                            <h6 class="card-title">View All Institutes</h6>
                                            <small> <p class="card-text" style={{ color: '#929690' }}>View all the institutes participating in JoSAA counselling.</p> </small>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div class="col-12 my-2 d-flex">
                                <a class="text-decoration-none" href="/branch-wise-cutoff">
                                    <div a class="card bg-dark text-light d-flex flex-column border-light ">
                                        <div class="card-body d-flex flex-column me-5">
                                            <h6 class="card-title">View Branch-wise Cut-offs</h6>
                                            <small> <p class="card-text" style={{ color: '#929690' }}>Filter the cut-off data with the selected branch.</p></small>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div class="col-12 my-2 d-flex">
                                <a class="text-decoration-none" href="/institute-wise-cutoff">
                                    <div a class="card bg-dark text-light d-flex flex-column border-light">
                                        <div class="card-body d-flex flex-column me-5">
                                            <h6 class="card-title">View Institute-wise Cut-offs</h6>
                                            <small> <p class="card-text" style={{ color: '#929690' }}>Filter the cut-off data with the selected institutes.</p></small>
                                        </div>
                                    </div>
                                </a>												
                            </div>

                            <div class="col-12 my-2 d-flex">
                                <a class="text-decoration-none" href="/">	
                                    <div a class="card bg-dark text-light d-flex flex-column border-light">
                                        <div class="card-body d-flex flex-column">
                                            <h6 class="card-title">Analyse Branch-wise Cut-off Trends</h6>
                                            <small> <p class="card-text" style={{ color: '#929690' }}>Compare the cutoff trends of courses in a particular branch of engineering.</p></small>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div class="col-12 my-2 d-flex">
                                <a class="text-decoration-none" href="/">
                                    <div a class="card bg-dark text-light d-flex flex-column border-light">
                                        <div class="card-body d-flex flex-column">
                                            <h6 class="card-title">Analyse Round-wise Cut-off Trends</h6>
                                            <small> <p class="card-text" style={{ color: '#929690' }}>Compare the cut-offs of a course in various rounds.</p></small>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default OffCanvas;