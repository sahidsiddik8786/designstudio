import React from "react";
import Header from "./Header";
import Footer from "./Footer";
//import NavigationMenu from "./NavigationMenu";
import { Helmet } from "react-helmet";
import {Toaster} from "react-hot-toast";

const Layout = ({ children,title, description, keywords, author  }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <Header />
           
            <main style={{ minHeight: "77vh" }}>{children}</main>
             <Toaster/>
           

        </div>
    );
};
//default :

Layout.defaultProps = {
    title: "Desgin studio for bulidings",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "",
  };

export default Layout;
