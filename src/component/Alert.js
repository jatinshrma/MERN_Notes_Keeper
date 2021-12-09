import React from 'react'

const Alert = (props) => {
    const {alert} = props;
    
    return (
        <>
            {alert && <div id="Alert" className={`alert alert-${alert.type} align-items-center sticky-top`} role="alert" style={{display: "flex", alignItems: "center"}}>
                <div>
                    <strong>{`${alert.head}`}</strong> : {`${alert.msg}`}
                </div>
                <button type="button" id="cross" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{position:"absolute", right: "14px"}}></button>
            </div>}
        </>
    )
}

export default Alert