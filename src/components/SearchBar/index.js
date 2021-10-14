import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Image
import searchIcon from "../../images/search-icon.svg";

// styles
import { Wrapper, Content } from "./SearchBar.style";

const SearchBar = ({ setSearchIerm }) => {
    const [state, setState] = useState("");
    const initial = useRef(true);

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setSearchIerm(state);
        }, 500);

        return () => clearTimeout(timer);
    }, [setSearchIerm, state]);

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon" />
                <input
                    type="text"
                    placeholder="Search Movie"
                    onChange={(event) => setState(event.currentTarget.value)}
                    value={state}
                />
            </Content>
        </Wrapper>
    );
};

SearchBar.propTypes = {
    setSearchIerm: PropTypes.func,
};

export default SearchBar;
