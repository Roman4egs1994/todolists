import React, {CSSProperties} from 'react';
import Button from '@mui/material/Button';

/** Универсальная компонента :Button (Использует стили Material UI)
 *
 * Обязательные параметры: Название кнопки (title), действие на мышку (CallBack)
 * Необязательные параметры: ClassName (класс для стилей), style (инлайн стили), variant (cтили Material UI)
 *
 * */


type ButtonPropsType = {
    disabled?: boolean
    title: string
    callBack: () => void
    className?: string
    style?: object
    variant?: "text" | "outlined" | "contained"
}


export const ButtonHandler: React.FC<ButtonPropsType> = (props) => {
    const {title, callBack, className, disabled,style,variant,...otherProps} = props

    const onclickButtonHandler = () => {
        callBack()
    }


    return (
        <Button
            style={style}
            variant={variant}
            className={className}
            disabled={disabled}
            onClick={onclickButtonHandler}
        >
            {title}
        </Button>
    );
};

