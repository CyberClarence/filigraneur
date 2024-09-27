"use server";
import CoreProduct from "@/components/CoreProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export default async function Home() {
  return <CoreProduct header={<Header />} footer={<Footer />} />;
}
