import React from 'react';
import TagsInput from "react-tagsinput";

const TagList = ({tags, onChange}) => {

    const renderTagInput = () => {
        return <span/>
    };

    return (
        <div>
            <TagsInput
                value={tags}
                onChange={onChange}
                renderInput={renderTagInput}>
            </TagsInput>
        </div>
    );
}

export default TagList;