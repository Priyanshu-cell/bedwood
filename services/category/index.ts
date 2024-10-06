export interface SubMenuItem {
    _id: string;  // Use _id instead of href
    name: string; // Use name instead of text
  }
  
  export interface LinkData {
    _id: string;  // Use _id instead of href
    name: string; // Use name instead of text
    logo: string; // This will be set to an empty string as it's not in the API response
    children?: SubMenuItem[];
  }
  
  export interface HeaderLinkProps {
    className?: string;
    setSideBarOpen?: any;
   
    
  }