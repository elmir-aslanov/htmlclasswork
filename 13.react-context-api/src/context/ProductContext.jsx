ProductContext.Providerimport { createContext } from "react";

export const ProductContext = createContext();

const ProductContext = ({ childiren }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://book-store-api-liard-three.vercel.app/books")
            .then((res => res.json())
                .then(data => setProducts(data));
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {childiren}
        </ProductContext.Provider>
    );
};

export default ProductProvider;    

