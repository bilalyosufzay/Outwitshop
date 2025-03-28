export async function searchSponsoredProducts(query) {
    try {
      const response = await fetch(`https://yourwebsite.com/api/products?search=${query}`);
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
  
  export async function getAllProducts() {
    try {
      const response = await fetch(`https://yourwebsite.com/api/products`);
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
  
  export async function getProductById(id) {
    try {
      const response = await fetch(`https://yourwebsite.com/api/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  