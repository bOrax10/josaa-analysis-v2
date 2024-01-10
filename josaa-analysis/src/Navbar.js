import OffCanvas from "./OffCanvas";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
			  	<div class="container-fluid">
    			<a class="navbar-brand" href="/">Cutoff Analysis</a>
    			<OffCanvas></OffCanvas>
  			</div>
        </nav>
      );
    }
 
export default Navbar;