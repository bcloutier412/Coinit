import { Link, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../App";

const Home = () => {
    const { header } = useContext(UIContext);
    return (
        <div>
            <Link to="../price/bitcoin" onClick={() => header.setHeaderText('Bitcoin')}>Bitcoin</Link>
        </div>
    );
};

export default Home;
