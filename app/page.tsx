import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import { ArrowRight } from "lucide-react"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {
  const allProducts = await getAllProducts()

  return (
    <>
      <section className="px-6 md:px-20 py-24">
          <div className="flex max-xl:flex-col gap-16">
            <div className="flex flex-col justify-center">
              <p className="small-text">
                Smart Shopping Starts Here:
                <ArrowRight />
              </p>

              <h1 className="head-text">
                Unleash the Power of
                <span className="bg-gradient-to-r from-blue-200 to-blue-900 bg-clip-text text-transparent"> Reprice</span>
              </h1>

              <p className="mt-6">
              Track product prices in real-time with ease. Stay ahead of deals, 
              monitor price changes, and receive instant alerts to save more on 
              your favorite items.
              </p>

              <Searchbar />
            </div>

            <HeroCarousel />
          </div>
        
      </section>

      <section className="trending-section">
        <h2 className="text-4xl">
          Trending
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard 
              key={product._id}
              product={product}/>
          ))}
        </div>
    
      </section>
    </>
  )
}

export default Home