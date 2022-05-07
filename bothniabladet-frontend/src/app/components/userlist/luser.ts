export interface User {
    id: String; 
    username: String; 
    password: String;
    name: String;  
    invoiceAddress: String; 
    role: String;
}

export const users = [];
    /* 
    {
        id: "62701e30a769f4e3e06152a1", 
        username: "Alexander",
        password: "pwd123",
        role: "Admin",
        invoiceAddress: "Drottningholm Slott",
        name: "Alexander Wirdemo",
    },
    {
        id: "62715a018cf1e186c2ed7d7a",
        username: "Ove",
        password: "paparazzi",
        name: "Ove Sundberg",
        invoiceAddress: "Vitsippevägen 12",
        role: "Regular",
    },
    {
        id: "6271774c8cf1e186c2ed7d82",
        username: "cdjksal",
        password: "djwbvhj",
        name: "bijwelb",
        invoiceAddress: "njlbj",
        role: "Regular",
    },
    {
        id: "6271774c8cf1e186c2eold82",
        username: "Kenta",
        password: "agent123",
        name: "Kent Agent",
        invoiceAddress: "Oxenstiernsgatan 20",
        role: "Regular",
    } */

