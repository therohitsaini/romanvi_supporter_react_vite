import { Fragment } from 'react'
import NavBarLanding from '../Header_section/NavBarLanding'
import LandingHome from '../Pages/LandingHome'
import Box from '@mui/material/Box'
import LadnigChatWidget from '../Pages/LadnigChatWidget'
import Footer from '../Pages/Footer'

function Home() {
    return (
        <Fragment>
            <Box className="aurora-bg" sx={{background:"black"}}>
                <NavBarLanding />

                {/* OFFSET FOR STICKY NAVBAR */}
                <Box sx={{ pt: "72px" }}>
                    <LandingHome />
                </Box>
                <Footer />
                <LadnigChatWidget />
            </Box>
        </Fragment>
    )
}

export default Home