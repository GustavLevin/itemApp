import { ProductCategory } from "@/app/data/webShopProducts";

export function lowerCaseCompare(a = "",b = "") {
    return a.toLowerCase().includes(b.toLowerCase())
}

export function getIdFromUrl(url= ""){
    const { pathname } = new URL(url)
    const startIndexOfId = pathname.lastIndexOf("/")+1
    if(startIndexOfId === 0) {
        return ""
    }
    return pathname.substring(startIndexOfId)

}

export function validateProductData(data) {
    let errors = {}
    if(!data.name){
        errors.name = "Name is required";
    }
    if(!data.description || data.description.length < 10) {
        errors.description = "Description has to be 10 chars or longer"
    }
    if(!data.price || !Number(data.price) || data.price < 0) {
        errors.price = "A valid price number greater than 0 is required"
    }
    if(!ProductCategory.isCategory(data.category)) {
        errors.category = `A valid category has to be added [${ProductCategory.cattegories.join(", ")}]`
    }
    const hasErrors = Object.keys(errors).length > 0;
    return [hasErrors, errors]
} 

export function validateBookData(data) {
    let errors = {}
    if(!data.title || typeof data.title !== "string") {
        errors.title = "Title is required"
    }
    if(!data.author || typeof data.author !== "string") {
        errors.author = "Author is required"
    }
    
    const hasErrors = Object.keys(errors).length > 0;
    return [hasErrors, errors]
}

export function validateAuthorData(data) {
    let errors = {}
    if(!data.name || typeof data.name !== "string") {
        errors.name = "Name is required"
    }
    if(!data.yearOfBirth || typeof data.yearOfBirth !== "number") {
        errors.yearOfBirth = "yearOfBirth is required"
    }
    
    const hasErrors = Object.keys(errors).length > 0;
    return [hasErrors, errors]
}

export function object404Respsonse(response, model = "") {
    return response.json({
        message: `${model} not found`
    }, {
        status: 404
    })
}

export async function validateJSONData(req) {
    let body
    try {
        body = await req.json() // Parse incoming data to json
        return [false, body]
    }catch (error) {
        return [true,null]
    }
}