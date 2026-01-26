import React from 'react'
import { Fragment } from 'react'
import NavBarLanding from '../Header_section/NavBarLanding'
import LandingHome from '../Pages/LandingHome'
import Box from '@mui/material/Box'

function Home() {
    return (
        <Fragment>
            <Box className="aurora-bg">
                <NavBarLanding />

                {/* OFFSET FOR STICKY NAVBAR */}
                <Box sx={{ pt: "72px" }}>
                    <LandingHome />
                </Box>
            </Box>
        </Fragment>
    )
}

export default Home