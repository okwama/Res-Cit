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