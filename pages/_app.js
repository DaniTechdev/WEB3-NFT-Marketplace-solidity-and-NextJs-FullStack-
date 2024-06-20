import "../styles/globals.css";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

//INTERNAL IMPORT

import { NavBar, Footer } from "../components/componentsindex";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <NFTMarketplaceProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </NFTMarketplaceProvider>
    </div>
  );
};

export default MyApp;
