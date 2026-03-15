import { Fragment } from 'react'
export default function Loader() {
    return (
        <Fragment>
            <div className="loader">
                <span><span></span><span></span><span></span><span></span></span>
                <div className="base">
                    <span></span>
                    <div className="face"></div>
                </div>
            </div>
            <div className="longfazers">
                <span></span><span></span><span></span><span></span>
            </div>
        </Fragment >

    );
}