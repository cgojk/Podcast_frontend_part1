

import { Link } from "react-router-dom"
import { getAllGenres, getAllProducts, getPodcastNames, getProductCategories } from "../../api.js"
import { useState, useEffect, useRef } from "react"
import MerchCards from "../../components/MerchCards.jsx"
import Dropdown from "../../components/Inputs/Dropdown.jsx"
import { FaArrowDown, FaArrowUp, FaCross, FaSearch, FaTimes } from 'react-icons/fa';
import TextField from "../../components/Inputs/TextField.jsx"
import OptionsList from "../../components/Inputs/OptionsList.jsx"
import StylisedDropdown from "../../components/Inputs/StylisedDropdown.jsx"
import { useSearchParams } from "react-router-dom"


export default function Store() {
  const searchRef = useRef(null)

  const [searchParams, setSearchParams] = useSearchParams()

  // seeding products
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // seeding filters
  const [filtersLoading, setfiltersLoading] = useState(true)

  const [categories, setCategories] = useState([])
  const [categoriesError, setCategoriesError] = useState(null)

  const [podcasts, setPodcasts] = useState([])
  const [podcastsError, setPodcastsError] = useState(null)

  // handle filtering updates
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [delayedSearch, setDelayedSearch] = useState(searchParams.get("search") || "")
  const [podcast, setPodcast] = useState(searchParams.get("podcast") || "")
  const [dropdownPodcasts, setDropdownPodcasts] = useState([])
  const [dropdownCategories, setdropdownCategories] = useState([])
  const initialCategories = 
    searchParams.get("categories")?.split(",") || 
    (searchParams.get("category") ? [searchParams.get("category")] : [])
  const [selectedCategories, setSelectedCategories] = useState(searchParams.get("categories")?.split(",") || [])
  const [sort, setSort] = useState(searchParams.get("sort") || "name_ASC") // options: price_ASC, price_DESC, name_ASC, name_DESC

  useEffect(() => {
    async function seedFilters() {
      setfiltersLoading(true)
      const categoryData = await getProductCategories()
      const podcastNameData = await getPodcastNames()
      
      if (categoryData.error) {
        setCategoriesError(categoryData.error)
      } else {
        setCategories(categoryData)
        setdropdownCategories(
          categoryData.map(category => ({
            value: category.name,
            label: category.name
          }))
        )
      }
      
      if (podcastNameData.error) {
        setPodcastsError(podcastNameData.error)
      } else {
        setPodcasts(podcastNameData)
        setDropdownPodcasts(
          podcastNameData.map(podcast => ({
            value: podcast.podcast_id,
            label: podcast.title
          }))
        )
      }
      setfiltersLoading(false)
    }
    seedFilters()
  }, [])

  useEffect(()=> {
    const delay = setTimeout(() => {
      setDelayedSearch(search)
    }, 500)
    return () => clearTimeout(delay)
  }, [search])

  useEffect(() => { 
    async function fetchProducts() {
        setLoading(true)
        setError(null)
        const data = await getAllProducts({search: [delayedSearch], podcast, category: [selectedCategories], sort})
        if (data.error) {
          setError(data.error)
        } else {
          setProducts(data)
        }
        setLoading(false)
    }
    fetchProducts()
  }, [delayedSearch, podcast, selectedCategories, sort])

  useEffect(() => { 
    const params = {}

    if (delayedSearch) {params.search = delayedSearch}
    if (podcast) {params.podcast = podcast}
    if (selectedCategories.length > 0) {params.categories = selectedCategories.join(",")}
    if (sort) {params.sort = sort}

    setSearchParams(params, { replace: true }) 
  }, [delayedSearch, podcast, selectedCategories, sort])

  useEffect(() => {
  setSearch(searchParams.get("search") || "")
  setDelayedSearch(searchParams.get("search") || "")
  setPodcast(searchParams.get("podcast") || "")
  setSelectedCategories(
    searchParams.get("categories")?.split(",") ||
    (searchParams.get("category") ? [searchParams.get("category")] : [])
  )
  setSort(searchParams.get("sort") || "name_ASC")
}, [])


  const handleResetFilters = (e) => {
    setSearch('')
    setDelayedSearch('')
    setPodcast('')
    setSelectedCategories('')
    setSearchParams({})
  }

  const handleResetSearch = (e) => {
    setSearch('')
    setDelayedSearch('')

    if (searchRef.current) {
      searchRef.current.value="";
      searchRef.current.focus()
    }
  }

  const toggleSort = (type) => { 
    if (sort?.startsWith(type)) {
      setSort(sort.endsWith("ASC") ? `${type}_DESC` : `${type}_ASC`)
    } else {
      setSort(`${type}_ASC`)
    }
  }

  return (
    
    <section className="page-container store container">
      <div className="sub-container">
      <div className="store-banner">
        <span>
          <h1 className="team-title">Listen Loud, Wear Proud</h1>
          <h3 className="subtitle">Explore our range of merch from &nbsp;
            <StylisedDropdown
              options={dropdownPodcasts}
              selected={podcast} 
              onChange={setPodcast} 
              placeholder="your favourite podcasts"
              multi = {false}
              />
          </h3>
        </span>

        <TextField 
          ref={searchRef}
          value={search}
          onChange={setSearch}
          placeholder = "Search products"
          leadingIcon={<FaSearch />}
          trailingIcon={<FaTimes />}
          onTrailingClick={handleResetSearch}
          width={"100%"}
        />

        <div className="filters">
          {/*     
          <span className="mobile">
            <Dropdown 
              options={dropdownCategories} 
              selected={selectedCategories} 
              onChange={setSelectedCategories} 
              placeholder="Select categories"
            />
          </span> */}
        </div>
            
      </div>
      {/* { loading && <p>Loading Products</p> } */}


    <section className="results-section push-up">
      <span className="categories-filter">
        <OptionsList 
          options={dropdownCategories} 
          selected={selectedCategories} 
          onChange={setSelectedCategories} 
          className={"categories-list"}
        />
      </span>

        <div className="results-controls">

          <div className="results-context">
            <p>Showing {products.length} products</p>
            <button type="button" onClick={handleResetFilters}>
              Clear filters
              <FaTimes />
            </button>
          </div>

          <div className="sorting-controls">

                <button className="sort-button name" onClick={() => toggleSort("name")}>
                  A-Z
                  {sort.startsWith("name") ? (sort.endsWith("ASC") ? <FaArrowUp /> : <FaArrowDown />) : ""}
                </button>
                
                <button className="sort-button price" onClick={() => toggleSort("price")}>
                  Price
                  {sort.startsWith("price") ? (sort.endsWith("ASC") ? <FaArrowUp /> : <FaArrowDown />) : ""}
                </button>

              {/* <span className="desktop">
                <button onClick={() => toggleSort("name")}>Name</button>
                <button onClick={() => toggleSort("price")}>Price</button>
              </span>
              
              <span className="mobile">
                <Dropdown 
                  options={[
                    {value: "name_ASC", label: "Product name: A - Z"},
                    {value: "name_DESC", label: "Product name: Z - A"},
                    {value: "price_ASC", label: "Price: Low to High"},
                    {value: "price_DESC", label: "Price: High to Low"},
                  ]}
                  selected={sort} 
                  onChange={setSort} 
                  placeholder= "Sort By"
                  multi = {false}
                />
              </span> */}
            </div>
        </div>

        

        <div className="results-grid push-up">
          { !loading && products.length === 0 && <p>No products found.</p> }
          { error && <p>Error Loading Products: {error}</p> }
          {
            loading 
          ? (
            <>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </>
          ) : 
          products.map(product => (
            <MerchCards key={product.product_id} product={product} />
          ))}
        </div>
      </section>
          </div>
    </section>
  )
}
