import React from "react";

// Styles
import { Wrapper, Image } from "./Actor.style";

const Actor = ({ name, character, imageUrl }) => (
    <Wrapper>
        <Image src={imageUrl} alt="actor-thumb"></Image>
        <h3>{name}</h3>
        <p>{character}</p>
    </Wrapper>
);

export default Actor;
