import AddFooter from "./footer/addFootter"
import AddNavbar from "./navbar/addNavbar"

const Layout = ({children}) => {
    return(
        <>
            <AddNavbar/>
                <div> {children} </div>
            <AddFooter/>
        
        </>
    )
}

export default Layout