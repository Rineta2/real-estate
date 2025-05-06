"use client"

import React, { useEffect, useState, Fragment } from 'react'

import { FetchBannerContact, FetchCardContact } from "@/hooks/pages/contact/lib/FetchContact"

import { BannerContactType, CardContactType } from "@/hooks/pages/contact/types/contact"

import AboutSkelaton from './ContactSkelaton'

import CardLayout from "@/hooks/pages/contact/card/CardLayout"

import BannerLayout from "@/hooks/pages/contact/banner/BannerLayout"

export default function AboutLayout() {
    const [bannerContact, setBannerContact] = useState<BannerContactType[]>([]);
    const [cardContact, setCardContact] = useState<CardContactType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribeTop = FetchBannerContact(setBannerContact);
        const unsubscribeArt = FetchCardContact(setCardContact);

        // Set loading to false when all data is fetched
        Promise.all([
            new Promise(resolve => setTimeout(resolve, 1000)), // Simulate loading
        ]).then(() => {
            setIsLoading(false);
        });

        return () => {
            unsubscribeTop();
            unsubscribeArt();
        };
    }, []);

    if (isLoading) {
        return <AboutSkelaton />;
    }

    return (
        <Fragment>
            <BannerLayout bannerContact={bannerContact} />

            <CardLayout cardContact={cardContact} />
        </Fragment>
    )
}
