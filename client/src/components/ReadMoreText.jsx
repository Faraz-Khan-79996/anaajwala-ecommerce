import React from "react";
import ShowMoreText from "react-show-more-text";

const ReadMoreText = ({ text, lines = 3 }) => {
    return (
        <ShowMoreText
            /* Default options */
            lines={lines} // Number of lines to show before "Read more"
            more="Read more"
            less="Show less"
            className="content-css"
            anchorClass="text-blue-500 cursor-pointer hover:underline"
            expanded={false} // Default state: false (collapsed)
            truncatedEndingComponent={"... "}
        >
            {text}
        </ShowMoreText>
    );
};

export default ReadMoreText;
