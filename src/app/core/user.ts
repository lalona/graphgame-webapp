export interface Roles { 
    student?: boolean;    
    admin?: boolean;
 }
  
export interface User {
    
    email: string;    
    username: string;
    firstNames: string;
    lastNames: string;
    role: Roles;
}