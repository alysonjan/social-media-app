import React, {Fragment} from "react";


// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <Fragment>
        <img
            src={process.env.PUBLIC_URL + '/spinner.gif'}
            style={{ width: '50px',margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
)