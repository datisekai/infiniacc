import React, { useMemo, useState } from "react";

type Props = {
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    backgroundColor?: string;
    hover?: boolean;
    active?: boolean;
    hoverBorderColor?: string;
    hoverBackgroundColor?: string;
    focus?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
};

const BorderGradient: React.FC<Props> = ({
    borderWidth = 1,
    borderColor = "linear-gradient(rgb(46, 50, 63) 0%, rgb(53, 58, 78) 100%)",
    borderRadius = 8,
    backgroundColor = "linear-gradient(90deg, rgb(24, 27, 35) 0%, rgb(36, 40, 53) 100%)",
    hover = false,
    active = false,
    hoverBorderColor = "linear-gradient(63.37deg, rgba(0, 0, 0, 0) -71.44%, rgba(22, 61, 36, 0.7) 23.66%, #2EBE80 63.28%, rgba(13, 165, 82, 0.1) 87.06%)",
    hoverBackgroundColor = "#13151C",
    focus = false,
    children,
    onClick
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const wrapperStyle = useMemo(() => {
        return {
            borderRadius: `${borderRadius}px`,
            background: ((isFocused && focus) || (isHovered && hover) || active) ? hoverBorderColor : borderColor,
            padding: `${borderWidth}px`,
            cursor: "pointer",
            outline: "none", // Remove default focus outline
        };
    }, [borderRadius, isHovered, isFocused, hover, focus, active, hoverBorderColor, borderColor, borderWidth]);

    const contentStyle = useMemo(() => {
        return {
            borderRadius: `${borderRadius}px`,
            background: ((isFocused && focus) || (isHovered && hover) || active) ? hoverBackgroundColor : backgroundColor,
        };
    }, [borderRadius, isHovered, isFocused, hover, focus, active, hoverBackgroundColor, backgroundColor]);

    return (
        <div
            tabIndex={focus ? 0 : -1} // Makes the div focusable only if focus is enabled
            onClick={onClick}
            style={wrapperStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <div style={contentStyle}>{children}</div>
        </div>
    );
};

export default React.memo(BorderGradient);