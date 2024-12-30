'use server'

import Product from "../models/product.model";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;

    try {
        connectToDB()

        const scrapedProduct = await scrapeAmazonProduct(productUrl)

        if(!scrapedProduct) return

        let product = scrapedProduct

        const existingProduct = await Product.findOne({ url: scrapedProduct.url })

        if(existingProduct) {
            const UpdatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            product = {
                ...scrapedProduct,
                priceHistory: UpdatedPriceHistory,
                lowestPrice: getLowestPrice(UpdatedPriceHistory),
                highestPrice: getHighestPrice(UpdatedPriceHistory),
                // @ts-ignore
                averagePrice: getAveragePrice(UpdatedPriceHistory)
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true } 
        )

        revalidatePath(`/products/${newProduct._id}`)

    } catch(error: any) {
        throw new Error(`Failed to create/update: ${error.message}`)
    }
}

export async function getProductById(productId: string) {
    try {
        connectToDB();

        const product = await Product.findOne({ _id: productId })

        if(!product) return null
    } catch(error) {
        console.log(error)
    }
}