import * as React from "react";

const GenericError: React.FC = ({ children }): JSX.Element => {
    return <div className="text-red-700 font-bold bg-red-100 p-2 mb-4 text-center rounded">{children}</div>;
};

export default GenericError;
