

import { FaArrowRight, FaChevronCircleRight, FaChevronRight, FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"
import LazyImage from "./LazyImage/LazyImage";

export default function MerchCards({ product }) {

    const placeholder = "/images/default_images/default1.jpeg"

    return (
        <article className="merch-card">
            <Link className="clickable-area" to={`/store/${product.product_id}`}>
                <LazyImage 
                    src={product.images[0]}
                    alt={product.images_alt_text[0]}
                />

                <div className="info-group">
                    <div className="top-row">
                        <h3 className="title">{product.name}</h3>
                        <FaChevronRight fontSize={24}/>
                    </div>
                    <p className="price">${product.price}</p>
                </div>

            </Link>
            <button className="cart-button">Add to cart <FaShoppingCart /></button>
        </article>
    )
}



