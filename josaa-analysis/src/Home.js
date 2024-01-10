const Home = () => {
    return (
        <div className="home m-4">
            <h1 className="display-5 ms-4 ms-lg-5 ps-lg-5 fw-bold sm:text-center lg:text-left">Cutoff Analysis</h1>
            <p className="display-7 ms-4 ms-lg-5 ps-lg-5 sm:text-center lg:text-left">A tool that helps you find your optimal choices for JoSAA counselling.</p>

            <div className="container-lg mt-5">
                <div class="row">
                    <div class="col-sm-6 col-md-6 col-lg-4 mb-3 d-flex">
                        <div class="card bg-dark text-light d-flex flex-column">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">View All Branches</h5>
                                <p class="card-text" style={{ color: '#929690' }}>View all the branches and courses belonging to the branches available for JoSAA counselling.</p>
                                <a href="/branches" class="btn col-8 col-lg-6 col-xl-5 col-md-6 mt-auto btn-primary">Get Started →</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-6 col-lg-4 mb-3 d-flex">
                        <div a class="card bg-dark text-light d-flex flex-column">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">View All Institutes</h5>
                                <p class="card-text" style={{ color: '#929690' }}>View all the institutes participating in JoSAA counselling and the courses offered by them.</p>
                                <a href="/institutes" class="btn col-8 col-lg-6 col-xl-5 col-md-6 mt-auto btn-primary">Get Started →</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-6 col-lg-4 mb-3 d-flex">
                        <div a class="card bg-dark text-light d-flex flex-column">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">View Branch-wise Cut-offs</h5>
                                <p class="card-text" style={{ color: '#929690' }}>View the cut-off data with the selected branches and further narrow down with your choice of institutes.</p>
                                <a href="/branch-wise-cutoff" class="btn col-8 col-lg-6 col-xl-5 col-md-6 mt-auto btn-primary">Get Started →</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-6 col-lg-4 mb-3 d-flex mt-2">
                        <div a class="card bg-dark text-light d-flex flex-column">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">View Institute-wise Cut-offs</h5>
                                <p class="card-text" style={{ color: '#929690' }}>View the cut-off data with the selected institutes and further narrow down with your choice of programs.</p>
                                <a href="/institute-wise-cutoff" class="btn col-8 col-lg-6 col-xl-5 col-md-6 mt-auto btn-primary">Get Started →</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-6 col-lg-4 mb-3 d-flex mt-2">
                        <div a class="card bg-dark text-light d-flex flex-column">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">Analyse Branch-wise Cut-off Trends</h5>
                                <p class="card-text" style={{ color: '#929690' }}>Branch trends highlight the trends of courses in a particular branch over the years. This helps understand the popularity and perception of a branch among engineering aspirants, and thus helps understand the demand for a particular branch during the counselling process.</p>
                                <a href="/analyze-branch-wise-cutoff" class="btn col-8 col-lg-6 col-xl-5 col-md-6 mt-auto btn-primary">Get Started →</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-6 col-lg-4 mb-3 d-flex mt-2">
                        <div a class="card bg-dark text-light d-flex flex-column">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">Analyse Round-wise Cut-off Trends</h5>
                                <p class="card-text" style={{ color: '#929690' }}>Round trends highlight the general trend of closing ranks throughout the rounds of the counselling process. This helps understand the likely range of changes to the closing ranks throught the counselling process.</p>
                                <a href="/analyze-round-wise-cutoff" class="btn col-8 col-lg-6 col-xl-5 col-md-6 mt-auto btn-primary">Get Started →</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Home;
