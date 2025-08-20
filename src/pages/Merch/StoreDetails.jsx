

// import React from "react"
// import { useParams } from "react-router-dom"

// export default function StoreDetails() {
//   const params = useParams()
//   const [merch, setMerch] = React.useState(null)
//   const [error, setError] = React.useState(null)       

//   React.useEffect(() => {
//     const fetchMerch = async () => {
//       try {
//         const res = await fetch(`/api/merches/${params.id}`)

//         // 2. Check for bad HTTP response
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`)
//         }

//         const data = await res.json()

//         //  3. Set merch state
//         setMerch(data.merches)
//       } catch (error) {
//         console.error("Failed to fetch merch details:", error)

//         //  4. Set error state
//         setError("Failed to load merch details. Please try again.")
//       }
//     }

//     fetchMerch()
//   }, [params.id])

//   return (
//     <section className="merch-detail container">
//       {/* /*  5. Show error message if fetch fails */ }
//       {error && <p className="error">{error}</p>}

//       {/* 6. Show merch if loaded */}
//       {merch && !error ? (
//         <>
        

//           <div className="merch-image">
//             <img src={merch.imageUrl} alt={merch.name} className="merch-image" />
//           </div>
//           <div className="merch-info">
//             <h1>{merch.name}</h1>
//             <p><strong>Genre:</strong> {merch.genre}</p>
//             <p><strong>Price:</strong> ${merch.price}</p>
//             <p><strong>Description:</strong> {merch.description}</p>
//             <p><strong>Duration:</strong> {merch.duration}</p>
//             <a className="btn">Add to Cart</a>
//           </div>
//         </>
//       ) : !error ? (
//         <p>Loading merch details...</p>  /*  7. Loading state */
//       ) : null}
//     </section>
//   )
// }

import React from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import { getSingleProduct } from "../../api"
import { FaCartPlus, FaChevronLeft, FaChevronRight, FaMinus, FaPlus, FaQuestionCircle, FaRegStar, FaSave, FaShare, FaStar, FaTimes } from "react-icons/fa"
import LazyImage from "../../components/LazyImage/LazyImage"

export default function StoreDetails() {

  const [scrollY, setScrollY] = useState(0)

  const params = useParams()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [quantity, setQuantity] = useState(1)
  
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const openModal = (index) => {
    setCurrentImage(index)
    setModalOpen(true)
  } 

  const closeModal = () => {
    setModalOpen(false)
  }

  const previousImage = (e) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => (prev || 0) + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleQuantityChange = (e) => {
    const value = e.target.value

    setQuantity(value === "" ? "" : Math.max1, parseInt(value, 10) || 1)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
  },[])

  useEffect(() => { 
    async function fetchProduct() {
        setLoading(true)
        setError(null)
        const data = await getSingleProduct(params.id)
        if (data.error) {
          setError(data.error)
        } else {
          setProduct(data)
          console.log(product)
        }
        setLoading(false)
    }
    fetchProduct()
  }, [])

  return (
    <section className="page-container product">
        
        <div className="control-bar">
          <div className="constrain">
            
          <button  onClick={() => navigate(-1)} className="button back" >
            <FaChevronLeft fontSize={12}/>
            Back
          </button>

          <div className="options">

          <button  className="button share">
            Share
            <FaShare fontSize={16}/>
          </button>

          <button  className="button favourite">
            Save
            <FaRegStar fontSize={16}/>
          </button>

          <button className="button cart" >
            Add to cart
            <FaCartPlus fontSize={16}/ >
          </button>

          </div>
          </div>
        </div>

        <div className="sub-container">     

        <div className={`image-gallery layout-${product.images?.length || 0}`} 
          style={{
            transform: `scale(${Math.max(0, 1 - scrollY / 800)})`,
            opacity: Math.max(0, 1 - scrollY / 600),
            transformOrigin: "top center",
            transition: "transform 0.3s linear, opacity 0.3s linear"
          }}
        >
          {product.images?.length === 1 &&(
            <div className="single-image" onClick={() => openModal(0)}>
              <LazyImage src={product.images?.[0]} alt={product.images_alt_text?.[0]} />
            </div>
          )}
         
          {product.images?.length === 2  &&(
            <>
              <div onClick={() => openModal(0)}>
                <LazyImage src={product.images?.[0]} alt={product.images_alt_text?.[0]} />
              </div>
              <div onClick={() => openModal(1)}>
                <LazyImage src={product.images?.[1]} alt={product.images_alt_text?.[1]} />
              </div>
            </>
          )}

          {product.images?.length > 2 &&(
            <>
              <div className="main-image push-up" onClick={() => openModal(0)}>
                <LazyImage src={product.images?.[0]} alt={product.images_alt_text?.[0]} />
              </div>
              <div className="other-images push-up">
                {product.images?.slice(1).map((image, index) => ( 
                  <div  onClick={() => openModal(index + 1)}>
                  <LazyImage key={index} src={image} alt={product.images_alt_text?.[index + 1]} /> 
                </div>
                ))}
              </div>
            </>
          )}
        </div>

        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="content" onClick={(e) => e.stopPropagation()}>
              <LazyImage src={product.images[currentImage]} alt={product.images_alt_text[currentImage]} className="modal-image" />
              <div className="modal-controls">
                <button className="button close" onClick={closeModal}><FaTimes/></button>
                <button className="button left" onClick={previousImage}><FaChevronLeft/></button>
                <p>{currentImage + 1} of {product.images.length}</p>
                <button className="button right" onClick={nextImage}><FaChevronRight/></button>
              </div>
            </div>
          </div>
        )}

        <div className="content-container push-up">
          <div className="top-bar">

            <div className="main-info">
              <h1>{product.name}</h1>

              <div className="controls">
                <button className="button"><FaRegStar/></button>
                <button className="button"><FaShare/></button>
                <div className="quantity-selector">
                  <button className="button" onClick={decreaseQuantity}><FaMinus/></button>
                  <input 
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    onBlur={() => {
                      if (quantity === "" || quantity < 1) setQuantity(1);
                    }}
                    />
                  <button className="button" onClick={increaseQuantity}><FaPlus/></button>
                <button className="button cart">Add to cart<FaCartPlus/></button>
                </div>
              </div>
            </div>

            <div className="caption-bar">
              <h4>${product.price}</h4> 
            </div>
          </div>

          <div className="further-info">

              <p>{product.description}</p>

              <div className="category-list">
                <p>categories:</p>
              {product.categories?.map(category => (
                <Link className="category-chip" to={`/store?category=${category}`}>
                  <div key={category}>{category}</div>
                </Link>
              ))}
              </div>



          </div>

          {/* <div className="related-podcasts">

            <h3>Related Podcasts</h3>

             {product.related_podcast?.map(podcast => (
                <Link className="category-chip" to={`/store?category=${podcast}`}>
                  <div key={podcast}>{podcast}</div>
                </Link>
              ))}
          </div> */}


        </div>

      </div>
    </section>
  )
}