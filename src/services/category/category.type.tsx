export interface SubMenuItem {
    _id: string   // Use _id instead of href
    name: string; // Use name instead of text
  }
  
  export interface LinkData {
    _id: string ; // Use _id instead of href
    name: string; // Use name instead of text
    logo: string; // This will be set to an empty string as it's not in the API response
    children?: SubMenuItem[];
  }
  
  export interface HeaderLinkProps {
    className?: string;
    setSideBarOpen?: any; 
  }


  export type TCategory = {
    parentId?: string;
    _id?: string;
    name: string;
    image?: string; // Add this line for the image URL
    success: boolean;
    message: string;
    children?: SubMenuItem[];
};



export type TCatgeoryApiResponse = {
    success: boolean;
    data: TCategory[];
    message: string;
    
};