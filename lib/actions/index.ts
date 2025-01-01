'use server'

import Product from "../models/product.model";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

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
        await connectToDB();

        const product = await Product.findOne({ _id: productId });

        if (!product) return null;
        
        // Add this return statement - this was missing!
        return product;

    } catch (error) {
        console.error("Error in getProductById:", error);
        return null;
    }
}

export async function getAllProducts() {
    try {
        connectToDB()

        const products = await Product.find()

        return products
    } catch(error) {
        console.log(error)
    }
}

export async function getSimilarProducts(productId: string) {
    try {
        connectToDB()

        const currentProduct = await Product.findById(productId)

        if(!currentProduct) return null

        const similarProducts = await Product.find({
            _id: { $ne: productId }
        }).limit(4)

        return currentProduct
    } catch(error) {
        console.log(error)
    }
}

export async function addUserEmailToProducts(productId: string, userEmail: string) {
    try {
        const product = await Product.findById(productId)

        if(!product) return

        const userExists = product.users.some((user: User) => user.email === userEmail) 

        if (!userExists) {
            product.users.push({ email: userEmail })

            await product.save()

            const emailContent = await generateEmailBody(product, "WELCOME")

            await sendEmail(emailContent, [userEmail])
        }
    } catch (error) {
        console.log(error)
    }
}

