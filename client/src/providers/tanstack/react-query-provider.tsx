"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query-client";

import {ReactNode} from "react";


export function ReactQueryProvider({ children }: 
    { children: React.ReactNode }) {
    return (
    <QueryClientProvider client={queryClient}>{children}
    </QueryClientProvider>);
}


