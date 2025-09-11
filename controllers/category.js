import { findCategory } from "../services/category.js";

export async function GetAllCategory(req,res) {
    

    try {
        const allCat = await findCategory();
        res.json(allCat)    
    } 
    catch (error) {
        
    }

}