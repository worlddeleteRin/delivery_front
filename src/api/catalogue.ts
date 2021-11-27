import apiClient from "./api_client";

export class ProductsDataServiceClass {		
	async getAll(): Promise<any> {
		const response: Record<string,any> = await apiClient.get("products/");
		return response.data.products;
	}
}
export class CategoriesDataServiceClass {
	async getAll(): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
			"products/categories"
		).catch((error) => { return error.response } );
		return response
	}
}


export const ProductsDataService = new ProductsDataServiceClass()
export const CategoriesDataService = new CategoriesDataServiceClass()


