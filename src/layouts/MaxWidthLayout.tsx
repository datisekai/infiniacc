import React from 'react'

type Props = {
    maxWidth?: number | string,
    children?: React.ReactNode,
    padding?: string | number
}
const MaxWidthLayout: React.FC<Props> = ({ maxWidth = 800, children, padding = 0 }) => {
    return (
        <div className='mx-auto' style={{ maxWidth, padding }}>
            {children}
        </div>
    )
}

export default MaxWidthLayout