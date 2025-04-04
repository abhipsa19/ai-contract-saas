import {api} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useCurrentUser = () => {
    
    const{isLoading, isError, data: user}= useQuery({
        queryKey: ["currentUser"],
        queryFn: async () =>{
            try{
                
                const response = await api.get("/auth/current-user");

                return response.data;

            }catch (error) {
                console.error(error);
                return null;
            }
        }
    });


    return{isLoading, isError, user};


};