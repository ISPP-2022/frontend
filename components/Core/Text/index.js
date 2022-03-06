/**
 * Returns the text object.
 * @param  {} {children}
 */
export const Title = ({ children }) => {
    return (
        <h1 className="mx-2 font-bold text-3xl">{children}</h1>
    );
};

/**
 * Returns the text object.
 * @param  {} {children}
 */
export const Subtitle = ({ children }) => {
    return (
        <h3 className="mx-2 font-bold text-xl">{children}</h3>
    );
};

/**
 * Returns the link object.
 * @param  {} children
 * @param  {string} href - Link to be added.
 */
export const Url = ({ children, href }) => {
    return (
        <a href={href} className="mx-2 text-blue-bondi">{children}</a>
    );
};

/**
 * Returns the text object.
 * @param  {} children
 */
export const Paragraph = ({ children }) => {
    return (
        <p className="mx-2 text-base">{children}</p>
    );
};



