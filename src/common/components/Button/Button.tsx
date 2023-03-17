import React from 'react';

type ButtonPropsType = {
    disabled?:boolean
    title: string
    callBack: () => void
    className?: string
}


export const Button: React.FC<ButtonPropsType> = (props) => {
    const {title,callBack,className,disabled} = props

    const onclickButtonHandler = () => {
        callBack()
    }

    return (
        <button className={className} disabled={disabled} onClick={onclickButtonHandler}>{title}</button>
    );
};

