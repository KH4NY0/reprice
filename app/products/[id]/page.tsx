import { getProductById, getSimilarProducts } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatNumber } from "@/lib/utils";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard"
import Modal from "@/components/Modal";



type Props = {
    params: { id: string };
};

const ProductDetails = async ( props: Props) => {
    const { id } = await props.params
    const product: Product = await getProductById(id);

    if (!product) redirect('/')

    const similarProducts = await getSimilarProducts(id)

   
    return (
        <div className="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    <Image 
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        className="mx-auto"
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px]  font-semibold">
                                {product.title}
                            </p>

                            <Link
                                href={product.url}
                                target="_blank"
                                className="text-base text-black opacity-50"
                            >
                                <Button>
                                    <ArrowRight />
                                    Visit Product
                                </Button>
                            </Link>
                        </div>
                        
                    </div>
                    
                        <div className="my-7 flex flex-col gap-5">
                            <div className="flex gap-5 flex-wrap">
                                <PriceInfoCard
                                    title="Current Price"
                                    iconSrc="/assets/icons/price-tag.svg"
                                    value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                                    borderColor="#b6dbff"
                                />
                                 <PriceInfoCard
                                    title="Average Price"
                                    iconSrc="/assets/icons/chart.svg"
                                    value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                                    borderColor="#b6dbff"
                                />
                                 <PriceInfoCard
                                    title="Highest Price"
                                    iconSrc="/assets/icons/arrow-up.svg"
                                    value={`${product.currency} ${formatNumber(product.originalPrice)}`}
                                    borderColor="#b6dbff"
                                />
                                 <PriceInfoCard
                                    title="Lowest Price"
                                    iconSrc="/assets/icons/arrow-down.svg"
                                    value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                                    borderColor="#BEFFC5"
                                />
                            </div>
                        </div>
                        <Modal productId={id} />
                </div>
            </div>
            <div className="flex flex-col gap-16">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-2xl font-semibold">
                            Product Description
                        </h3>

                        <div className="flex flex-col gap-4 limited-text">
                            {product?.description?.split('\n')}
                        </div>
                    </div>
                    <Button className="bg-black">
                        <ShoppingBag />
        
                        <Link
                            href={product.url}
                            className="text-base text-white"
                        >
                            Buy Now
                        </Link>
                    </Button>
                </div>

                {similarProducts && similarProducts?.length > 0 && (
                    <div className="py-14 flex flex-col gap-2 w-full">
                        <p className="section-text">
                            Similar Products
                        </p>

                        <div className="flex flex-wrap gap-10 mt-7 w-full">
                            
                            {similarProducts.map((product: Product) => (
                                <ProductCard 
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ProductDetails;
