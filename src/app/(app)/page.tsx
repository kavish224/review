"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Mail } from 'lucide-react'
import React from 'react'
import messages from "@/messages.json"
import Autoplay from "embla-carousel-autoplay"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Home() {

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardContent className="pt-4 flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
       <div className='flex flex-wrap items-center'>
       <div className='p-4 text-l'>
          New to True Feedback
        </div>
        <Link href={"/signup"}>
          <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Get Started</Button>
        </Link>
       </div>
      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2023 True Feedback. All rights reserved.
      </footer>
    </>
  )
}

export default Home
