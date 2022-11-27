import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({value, onChange}) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);
    const [error, setError] = useState<string | null>(null)

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(value);
    }, [])

    const activateViewMode = useCallback(() => {
        setEditMode(false);
        onChange(title);
    }, [onChange, title])

    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length <= 100) {
            setError(null);
            setTitle(e.currentTarget.value);
        } else setError('Too many symbols')
    }, [])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onChange(title)
            setEditMode(false)
        }
    }, [])

    return editMode
        ? <TextField
            value={title}
            onChange={changeTitle}
            onKeyPress={onKeyPressHandler}
            autoFocus
            error={!!error}
            onBlur={activateViewMode}
            helperText={error ? error : 'Title of todo should have less then 100 symbols'}/>
        : <span onDoubleClick={activateEditMode}>{value}</span>
});

export default EditableSpan;