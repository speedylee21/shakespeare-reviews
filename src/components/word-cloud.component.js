import React from 'react';
import {TagCloud} from "react-tagcloud";

const WordCloud = React.memo(({data, onClick}) => {

    const toWordCloud = (wordCounts) => {
        return Object.keys(wordCounts).map(key => {
            return {
                value: key,
                count: wordCounts[key]
            }
        });
    };

    return (
        <TagCloud
            minSize={18}
            maxSize={48}
            onClick={onClick}
            colorOptions={{luminosity: 'dark', hue: 'green'}}
            tags={toWordCloud(data)}>
        </TagCloud>);
}, (prevProps, nextProps) => {
    return Object.keys(nextProps.data).length === Object.keys(prevProps.data).length
});

export default WordCloud;