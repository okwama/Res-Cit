export type MenuType = {
    id     :   String;
    slug  :    String;
    title   :  String;
    desc   :   String;
    color  :   String;
    img   :    String;
    
  }[];
  export type ProductType = {
    id: string;
    title: string;
    desc?: string; 
    img?: string;
    slug  : String;
    price: number; 
    options?: { title: string; additionalPrice: number }[];
    };
 
   // Define Product type with necessary fields like title, id, etc.
  export interface Product {
    id: string;
    title: string;
    price: number;
  // other fields related to the product can be added here
}

    export interface OrderProduct {
      productId: string;
      quantity: number;
      product: Product; // Nested product data
    }
    
    export type OrderType = {
      id: string;
      userEmail: string;
      price: number;
      products: CartItemType[];
      status: string;
      createdAt: Date;
      tableNo?: number;
      intent_id?: String;
      orderProducts: OrderProduct[]; // Ensure this is included
};

      export type CartItemType = { 
        id: string; 
        title: string; 
        img?: string; 
        price: number; 
        optionTitle?: string; 
        quantity: number;
      };

      export type CartType = {
        products: CartItemType[];
        totalItems: number;
        totalPrice: number;
      };
      
      export type ActionTypes = {
        addToCart:(item:CartItemType)=> void;
        removeFromCart:(item:CartItemType)=> void;
      }