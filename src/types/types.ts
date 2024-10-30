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
    price: number; 
    options?: { title: string; additionalPrice: number }[];
    };
    export type OrderType = {
      arr: any;
      id: string;
      userEmail: string;
      price: number;
      products: CartItemType[];
      title: string;
      status: string;
      createdAt: Date;
      intent_id: String;
      };

      export type CartItemType = { 
        id: string; 
        title: string; 
        img?: string; 
        price: number; 
        optionTitle?: string; 
        quantity: number;
      };