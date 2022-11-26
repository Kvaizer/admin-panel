import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(function ({value, onChange}) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter') {
            onChange(title)
            setEditMode(false)
        }
    }

    return editMode
        ?    <TextField value={title} onChange={changeTitle} onKeyPress={onKeyPressHandler} autoFocus onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{value}</span>
});

export default EditableSpan;