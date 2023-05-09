import React from 'react'

export default function Navbar(props) {
    const { heading, searchValue, setSearchValue } = props;
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">{heading}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
