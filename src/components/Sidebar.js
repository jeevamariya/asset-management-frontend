import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <aside className="sidebar">
            <h3>Menu</h3>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/assets">Assets</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/assignments">Assignments</Link>
                <Link to="/tickets">Tickets</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/ai">AI Assistant</Link>
            </nav>
        </aside>
    );
}

export default Sidebar;