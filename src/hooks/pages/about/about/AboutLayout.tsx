"use client"

import React, { useEffect, useState, Fragment } from 'react'

import { FetchTopAbout, FetchArtAbout, FetchCardAbout, FetchAbout } from "@/hooks/pages/about/about/lib/FetchAbout"

import { TopAboutType, ArtAboutType, CardAboutType, AboutType } from "@/hooks/pages/about/about/types/about"

import AboutSkelaton from './AboutSkelaton'

import ArtAboutLayout from '../art-about/ArtAboutLayout'

import CardAboutLayout from "@/hooks/pages/about/card-about/CardAboutLayout"

import TopAboutLayout from "@/hooks/pages/about/top-about/TopAboutLayout"

import BottomAboutLayout from "@/hooks/pages/about/bottom-about/BottomAboutLayout"

export default function AboutLayout() {
    const [topAbout, setTopAbout] = useState<TopAboutType[]>([]);
    const [artAbout, setArtAbout] = useState<ArtAboutType[]>([]);
    const [cardAbout, setCardAbout] = useState<CardAboutType[]>([]);
    const [about, setAbout] = useState<AboutType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribeTop = FetchTopAbout(setTopAbout);
        const unsubscribeArt = FetchArtAbout(setArtAbout);
        const unsubscribeCard = FetchCardAbout(setCardAbout);
        const unsubscribeAbout = FetchAbout(setAbout);

        // Set loading to false when all data is fetched
        Promise.all([
            new Promise(resolve => setTimeout(resolve, 1000)), // Simulate loading
        ]).then(() => {
            setIsLoading(false);
        });

        return () => {
            unsubscribeTop();
            unsubscribeArt();
            unsubscribeCard();
            unsubscribeAbout();
        };
    }, []);

    if (isLoading) {
        return <AboutSkelaton />;
    }

    return (
        <Fragment>
            <TopAboutLayout topAbout={topAbout} />

            <ArtAboutLayout artAbout={artAbout} />

            <CardAboutLayout cardAbout={cardAbout} />

            <BottomAboutLayout about={about} />
        </Fragment>
    )
}
